import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // jobseeker
      required: true,
    },
    resume: {
      type: String, // File path or URL
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "hired", "rejected"],
      default: "applied",
    },
    notes: {
      type: String, // For employer’s comments
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
