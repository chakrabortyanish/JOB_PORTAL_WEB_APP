import React from "react";

import { Link } from "react-router-dom";

import {
  BriefcaseIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    title: "Total Jobs",
    value: 12,
    icon: BriefcaseIcon,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Applications",
    value: 248,
    icon: UsersIcon,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Shortlisted",
    value: 36,
    icon: CheckCircleIcon,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Rejected",
    value: 54,
    icon: XCircleIcon,
    bg: "bg-red-100",
    color: "text-red-600",
  },
];

const RecruiterDashboard = () => {
  return (
    <div className="p-7 bg-gray-50 min-h-screen rounded">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here’s what’s happening with your jobs today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg}`}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>

            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold text-gray-800">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Applications
          </h3>

          <div className="space-y-4">
            {["Frontend Developer", "Backend Engineer", "UI Designer"].map(
              (job, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-700">{job}</p>
                    <p className="text-sm text-gray-500">5 new applications</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">
                    View
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-3">
            <Link to="/dashboard/add-job">
              <button className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
                ➕ Post New Job
              </button>
            </Link>
            <Link to="/dashboard/manage-jobs">
              <button className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                📄 Manage Jobs
              </button>
            </Link>
            <Link to="/dashboard/view-application">
              <button className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                👥 View Applications
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
