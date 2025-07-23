import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";

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
    // Add logic to send reset link or OTP
    return { status: 200, message: "Reset link sent (mock response)" };
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
};

export default UserService;
