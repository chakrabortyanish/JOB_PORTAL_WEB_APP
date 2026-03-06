import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    candidateId: {
      type: String,
      required: true
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true
    },

    status: {
      type: String,
      enum: ["applied", "selected", "rejected"],
      default: "applied"
    }
  },
  { timestamps: true }
);

export const Application =  mongoose.model("Application", applicationSchema);
