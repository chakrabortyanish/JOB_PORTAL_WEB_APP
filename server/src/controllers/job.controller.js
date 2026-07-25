import { Job } from "../models/job.js";
import UserCV from "../models/userCV.model.js";
import { Notification } from "../models/notification.model.js";

/* Recruiter creates job */
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiterId: req.userId,
    });

    const users = await UserCV.find({}, "clerkId");

    // Create notification documents
    const notifications = users.map((user) => ({
      receiverId: user.clerkId,
      title: "New Job",
      message: `${job.title} position is now open.`,
      type: "NEW_JOB",
    }));

    // Save all notifications in one query
    await Notification.insertMany(notifications);

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
  const jobs = await Job.find({ recruiterId: req.userId });
  res.json({ jobs, success: true });
};

/* Public job list */
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  res.json(jobs);
};
