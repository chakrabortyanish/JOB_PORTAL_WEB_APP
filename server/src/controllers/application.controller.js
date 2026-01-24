import {Application} from "../models/application.js";
import {Job} from "../models/job.js";

/* Candidate applies to job */
export const applyJob = async (req, res) => {
  const { jobId } = req.body;

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
    recruiterId: job.recruiterId
  });

  res.status(201).json(application);
};

/* Candidate applied jobs */
export const getMyApplications = async (req, res) => {
  const apps = await Application.find({
    candidateId: req.user.id
  }).populate("jobId");

  // console.log("Applied jobs: ",apps);
  res.json(apps);
};

/* Recruiter received applications */
export const getReceivedApplications = async (req, res) => {
  const apps = await Application.find({
    recruiterId: req.user.id
  }).populate("jobId");

  res.json(apps);
};

/* Recruiter update status */
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(app);
};
