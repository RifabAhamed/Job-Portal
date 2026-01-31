import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const createDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com"; // predefined email
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10); // default password

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Default admin created successfully.");
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
};
