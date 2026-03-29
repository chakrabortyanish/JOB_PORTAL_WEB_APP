import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, CheckCircle, XCircle, Loader2 } from "lucide-react";

import Loader from "../utils/loading";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/recruiter/dashboard`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading();
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
    <div className="min-w-[500px] flex flex-col items-center justify-center gap-2 mx-auto">
      <Loader />
      <p className="text-gray-500">Loading Dashboard</p>
    </div>
    );
  }

  const stats = [
    {
      title: "Total Jobs",
      value: dashboard.totalJobs,
      icon: Briefcase,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Applications",
      value: dashboard.totalApplications,
      icon: Users,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Selected",
      value: dashboard.selected,
      icon: CheckCircle,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Rejected",
      value: dashboard.rejected,
      icon: XCircle,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="p-5 sm:p-7 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here’s what’s happening with your jobs today
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.bg}`}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>

            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Applications
          </h3>

          {dashboard.recentApplications.length === 0 ? (
            <p className="text-gray-500 text-sm">No applications yet.</p>
          ) : (
            <div className="space-y-4">
              {dashboard.recentApplications.map((app) => (
                <div
                  key={app._id}
                  className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-700">
                      {app.jobId?.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {app.status}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/applications/${app.jobId?._id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-3">
            <Link to="/dashboard/add-job">
              <button className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                ➕ Post New Job
              </button>
            </Link>

            <Link to="/dashboard/manage-jobs">
              <button className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                📄 Manage Jobs
              </button>
            </Link>

            <Link to="/dashboard/view-application">
              <button className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                👥 View Applications
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
