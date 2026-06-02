import {Application} from "../models/application.js";
import {Job} from "../models/job.js";

/* Candidate applies to job */
export const applyJob = async (req, res) => {
  const { jobId, resumeUrl } = req.body;

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const alreadyApplied = await Application.findOne({
    jobId,
    candidateId: req.user.id
  });

  if (alreadyApplied)
    return res.status(400).json({ message: "Already applied" });

  const application = await Application.create({
    jobId,
    candidateId: req.user.id,
    recruiterId: job.recruiterId,
    resumeUrl: resumeUrl
  });

  res.status(201).json(application);
};

/* Candidate applied jobs */
export const getMyApplications = async (req, res) => {
  const apps = await Application.find({
    candidateId: req.user.id
  }).populate("jobId");

  // console.log("Applied jobs: ",apps);
  res.status(200).json(apps);
};

/* Recruiter received applications */
import { clerkClient } from  "@clerk/express";

export const getReceivedApplications = async (req, res) => {
  try {
    const allApplications = await Application.find({
      recruiterId: req.userId,
    }).populate("jobId");

    // Extract unique candidateIds
    const candidateIds = [
      ...new Set(allApplications.map(app => app.candidateId))
    ];

    // Fetch users from Clerk in one request
    const usersResponse = await clerkClient.users.getUserList({
      userId: candidateIds,
    });

    const users = usersResponse.data;

    // Map users by ID for fast lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = {
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.emailAddresses[0]?.emailAddress,
        image: user.imageUrl,
      };
    });

    // Attach candidate info to applications
    const applicationsWithUsers = allApplications.map(app => ({
      ...app._doc,
      candidate: userMap[app.candidateId] || null,
    }));

    res.status(200).json({
      applications: applicationsWithUsers,
      message: "Applications retrieved successfully",
      success: true,
    });

  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* Recruiter update status */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;   // 👈 this is the application id
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      application,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
