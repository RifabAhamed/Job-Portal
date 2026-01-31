import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: function () {
        return !this.isInvited;
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.isInvited;
      },
    },
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
    inviteToken: String,
    inviteExpires: Date,
    isInvited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
