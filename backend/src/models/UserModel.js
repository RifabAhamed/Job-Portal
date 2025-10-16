import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employer", "jobseeker", "admin"],
      default: "jobseeker",
    },
    resume: {
      url: {
        type: String,
        default: null, 
      },
      public_id: {
        type: String,
        default: null, // The ID used by the storage service to identify the file
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
