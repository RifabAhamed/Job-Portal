import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import { sendEmail } from "../utils/sendEmail.js";

const UserService = {
  async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return { status: 401, message: "Invalid email or password" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { status: 401, message: "Invalid email or password" };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
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
};

export default UserService;
