import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    companyLogo: {
      type: String,
      default: "https://images.ctfassets.net/7xz1x21beds9/4cTq1jt8uh8jnBgvWbpKOV/663b48744791bd4e5ca178ae503d4916/Tata_Consultancy_Services_Logo.svg.png?w=1029&h=1029&q=90&fm=png"
    },

    location: String,

    salary: String,

    experienceLevel: {
      type: String,
      enum: ["fresher", "senior"],
      required: true,
    },

    skills: {
      type: [String],
      default: []
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruter",
      required: true
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Job =  mongoose.model("Job", jobSchema);

export { Job };