import { Job } from "../models/job.js";

/* Recruiter creates job */
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiterId: req.userId,
    });

    res
      .status(201)
      .json({ message: "Job created successfully", job, success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Job creation failed", error: error.message });
  }
};

/* Recruiter jobs */
export const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.user.id });
  res.json(jobs);
};

/* Public job list */
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
};
