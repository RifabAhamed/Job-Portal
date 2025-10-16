import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    type: {
      type: String,
      enum: ["full-time", "part-time"],
      default: "full-time",
    },
    jobField: { type: String }, // new
    keyResponsibilities: [{ type: String }], // new
    professionalSkills: [{ type: String }], // new
    companyIcon: { type: String },
    workMode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "onsite",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // employer who posted the job
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
