import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import { sendEmail } from "../utils/sendEmail.js";
import { cloudinary } from "../configs/cloudinaryConfig.js";
import crypto from "crypto";

const UserService = {
  async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return { status: 401, message: "Invalid email or password" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { status: 401, message: "Invalid email or password" };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      status: 200,
      message: "Login successful",
      data: { user, token },
    };
  },

  async logout(user) {
    // Handle token invalidation if needed
    return { status: 200, message: "Logged out successfully" };
  },

  async inviteEmployer(adminUser, { email, role }) {
    const admin = await UserRepository.findById(adminUser.id);
    if (!admin || admin.role !== "admin")
      return { status: 403, message: "Only admins can invite users" };

    if (!email) {
      return { status: 400, message: "Email is required" };
    }

    const existing = await UserRepository.findByEmail(email);

    if (existing && !existing.isInvited) {
      return { status: 409, message: "User already exists" };
    }

    // Generate token valid for 24 hours
    const token = crypto.randomBytes(32).toString("hex");

    const user =
      existing ||
      (await UserRepository.create({
        email: email,
        role: role,
        isInvited: true,
      }));

    user.email = email;
    user.inviteToken = token;
    user.inviteExpires = Date.now() + 24 * 60 * 60 * 1000;
    user.isInvited = true;

    await user.save();

    const inviteLink = `${process.env.BASE_URL}/accept-invite?token=${token}`;

    await sendEmail({
      to: email,
      subject: "You're invited!",
      html: `
      <p>You have been invited to join our application.</p>
      <p>Click the link below to create your password:</p>
      <a href="${inviteLink}">Accept Invitation</a>
    `,
    });

    return {
      status: 200,
      message: "Invitation sent successfully",
    };
  },

  async acceptInvite({ token, password }) {
    const user = await UserRepository.findByInviteToken(token);

    if (!user || user.inviteExpires < Date.now()) {
      return { status: 400, message: "Invalid or expired token" };
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.isInvited = false;
    user.inviteToken = null;
    user.inviteExpires = null;
    await user.save();

    return {
      status: 200,
      message: "Invitation accepted. You can now log in.",
    };
  },

  async resetPassword({ email }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return { status: 404, message: "User not found" };

    // Generate a short-lived token (e.g., 15 minutes)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // Send email
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `
      <p>Hello ${user.name},</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
    });

    return {
      status: 200,
      message: "Reset link sent (mock)",
      data: { resetToken }, // in real app, don't expose this in response
    };
  },

  async submitNewPassword({ token, newPassword }) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserRepository.findById(decoded.id);
      if (!user) return { status: 404, message: "Invalid or expired token" };

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      await user.save();

      return { status: 200, message: "Password has been reset" };
    } catch (err) {
      return { status: 400, message: "Invalid or expired token" };
    }
  },

  async updatePassword(user, { currentPassword, newPassword }) {
    const foundUser = await UserRepository.findById(user.id);
    if (!foundUser) return { status: 404, message: "User not found" };

    const isMatch = await bcrypt.compare(currentPassword, foundUser.password);
    if (!isMatch) return { status: 401, message: "Current password is wrong" };

    const hashed = await bcrypt.hash(newPassword, 10);
    foundUser.password = hashed;
    await foundUser.save();

    return { status: 200, message: "Password updated successfully" };
  },

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) return { status: 404, message: "User not found" };
    return { status: 200, data: user };
  },

  async getAllUsersPaginated({ page = 1, limit = 10 }) {
    const users = await UserRepository.getPaginatedUsers(page, limit);
    return { status: 200, data: users };
  },

  async registerUser(userData) {
    const existing = await UserRepository.findByEmail(userData.email);
    if (existing) return { status: 409, message: "Email already exists" };

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return { status: 201, message: "User registered", data: user };
  },

  async updateUserRole(id, role) {
    const updatedUser = await UserRepository.updateUserRole(id, role);
    if (!updatedUser) return { status: 404, message: "User not found" };

    return {
      status: 200,
      message: "User role updated",
      data: updatedUser,
    };
  },

  async uploadResume(userId, file) {
    if (!file) {
      return { status: 400, message: "No file uploaded." };
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found." };
    }

    user.resume = {
      url: file.path,
      public_id: file.filename,
    };
    await user.save();

    // 4. Return a success response with the updated data
    return {
      status: 200,
      message: "Resume uploaded successfully!",
      data: user.resume,
    };
  },

  async viewResume(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) return { status: 404, message: "User not found" };
    if (!user.resume?.public_id)
      return { status: 404, message: "No resume uploaded" };

    try {
      const signedUrl = cloudinary.utils.private_download_url(
        user.resume.public_id,
        null, // ✅ IMPORTANT: format must be null
        {
          resource_type: "raw",
          type: "authenticated",
          attachment: false,
          expires_at: Math.floor(Date.now() / 1000) + 300, // 5 min
        }
      );

      return {
        status: 200,
        data: {
          url: signedUrl,
          public_id: user.resume.public_id,
        },
      };
    } catch (err) {
      console.error("Error generating signed resume URL:", err);
      return { status: 500, message: "Failed to generate signed resume URL" };
    }
  },

  async deleteResume(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) return { status: 404, message: "User not found" };

    if (!user.resume?.public_id) {
      return { status: 404, message: "No resume to delete" };
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(user.resume.public_id, {
      resource_type: "raw",
    });

    // Remove from DB
    user.resume = undefined;
    await user.save();

    return {
      status: 200,
      message: "Resume deleted successfully",
    };
  },

  async updateResume(userId, file) {
    if (!file) {
      return { status: 400, message: "No new resume uploaded" };
    }

    const user = await UserRepository.findById(userId);
    if (!user) return { status: 404, message: "User not found" };

    // If old resume exists → delete it
    if (user.resume?.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id, {
        resource_type: "raw",
      });
    }

    // Add new resume
    user.resume = {
      url: file.path,
      public_id: file.filename,
    };
    await user.save();

    return {
      status: 200,
      message: "Resume updated successfully",
      data: user.resume,
    };
  },

  //superbase
  // async uploadResume(userId, resumePath) {
  //     if (!resumePath) {
  //       return { status: 400, message: "No resume path provided." };
  //     }

  //     const user = await UserRepository.findById(userId);
  //     if (!user) {
  //       return { status: 404, message: "User not found." };
  //     }

  //     // Save the plain string (e.g., "user_123/17444_resume.pdf")
  //     user.resume = resumePath;
  //     await user.save();

  //     return {
  //       status: 200,
  //       message: "Resume saved successfully!",
  //       data: user.resume,
  //     };
  //   },

  //   // 2. View: Just returns the user data
  //   // The Frontend generates the Signed URL using the path stored in user.resume
  //   async viewResume(userId) {
  //     const user = await UserRepository.findById(userId);
  //     if (!user) return { status: 404, message: "User not found" };

  //     if (!user.resume) {
  //       return { status: 404, message: "No resume uploaded" };
  //     }

  //     // Return the path so the frontend can generate the link
  //     return {
  //       status: 200,
  //       data: { resumePath: user.resume },
  //     };
  //   },

  //   // 3. Update: Same as upload, receives path string
  //   async updateResume(userId, resumePath) {
  //     if (!resumePath) {
  //       return { status: 400, message: "No new resume path provided" };
  //     }

  //     const user = await UserRepository.findById(userId);
  //     if (!user) return { status: 404, message: "User not found" };

  //     // Update the path
  //     user.resume = resumePath;
  //     await user.save();

  //     return {
  //       status: 200,
  //       message: "Resume updated successfully",
  //       data: user.resume,
  //     };
  //   },

  //   // 4. Delete: Removes the reference from the Database
  //   async deleteResume(userId) {
  //     const user = await UserRepository.findById(userId);
  //     if (!user) return { status: 404, message: "User not found" };

  //     if (!user.resume) {
  //       return { status: 404, message: "No resume to delete" };
  //     }

  //     // Note: This only removes the link from the database.
  //     // The actual file in Supabase Storage is not deleted by the backend
  //     // because we haven't set up the Supabase Admin SDK here.
  //     // Ideally, the frontend should delete the file from Storage first, then call this.

  //     user.resume = null; // or undefined
  //     await user.save();

  //     return {
  //       status: 200,
  //       message: "Resume deleted successfully",
  //     };
  //   },
};

export default UserService;
