import {Job} from '../models/job.js';
import {Application} from '../models/application.js';

export const getDashboardData = async (req, res) => {
  try {
    const recruiterId = req.userId; // from auth middleware

    // Total Jobs
    const totalJobs = await Job.countDocuments({ recruiterId });

    // Total Applications
    const totalApplications = await Application.countDocuments({ recruiterId });

    // console.log("Total Applications:", totalApplications, totalJobs);

    // Shortlisted
    const selected = await Application.countDocuments({
      recruiterId,
      status: "selected"
    });

    // Rejected
    const rejected = await Application.countDocuments({
      recruiterId,
      status: "rejected"
    });

    // Recent Applications (last 5)
    const recentApplications = await Application.find({ recruiterId })
      .populate("jobId")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalJobs,
      totalApplications,
      selected,
      rejected,
      recentApplications
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};