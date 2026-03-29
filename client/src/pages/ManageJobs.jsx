import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader_2 from "../utils/loading_2.jsx";
// ManageJobs.jsx
// Tailwind-ready React component to manage jobs listing in an admin/dashboard.
// Drop into your React project and import <ManageJobs />. Replace sampleData with API calls as needed.

export default function ManageJobs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/my`, {
      credentials: "include", // include cookies for auth
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          setJobs(data.jobs);
        }
        // console.log("My jobs from API: ", data);
        // setJobs(data); // Uncomment when API is ready
      })
      .catch((err) => {
        console.error("Error fetching jobs: ", err);
      });
  }, []);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selectedJob, setSelectedJob] = useState(null);

  const filtered = useMemo(() => {
    if (!query) return jobs;
    const q = query.toLowerCase();
    return jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        String(j.id).includes(q),
    );
  }, [jobs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleDelete(id) {
    if (!confirm("Delete this job?")) return;
    setJobs((p) => p.filter((j) => j.id !== id));
  }

  function handleEdit(job) {
    // replace with navigation to edit page or inline edit modal
    alert(`Edit job: ${job.title}`);
  }

  function handleViewApplicants(job) {
    // open modal to view applicants - using selectedJob state
    setSelectedJob(job);
  }

// job loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 min-w-[500px] w-full">
        <Loader_2 />  
        <p className="text-gray-500 text-sm">Job loading...</p>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Jobs</h2>

        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search by title, location or id"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 cursor-pointer"
          >
            New Job
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="max-w-full table-auto">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Job title
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Location
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Applicants
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-20 text-center text-gray-400"
                >
                  No jobs found
                </td>
              </tr>
            ) : (
              paged.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center font-semibold">
                        <img src={job.companyLogo} alt="company-logo" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {job.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {job.location}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">
                        {job.applicants}
                      </div>
                      <button
                        onClick={() => handleViewApplicants(job)}
                        className="text-xs px-2 py-1 border rounded-md text-indigo-600"
                      >
                        View
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="px-2 py-1 text-sm border rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-2 py-1 text-sm border rounded-md text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} -{" "}
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md border ${
                page === 1
                  ? "text-gray-400 border-gray-100"
                  : "text-gray-700 border-gray-200"
              } `}
            >
              Prev
            </button>

            <div className="text-sm text-gray-700">
              Page {page} / {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md border ${
                page === totalPages
                  ? "text-gray-400 border-gray-100"
                  : "text-gray-700 border-gray-200"
              } `}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Applicants modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-lg font-medium">
                Applicants for {selectedJob.title}
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="px-3 py-1 rounded-md bg-gray-100"
              >
                Close
              </button>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600">
                Total applicants: {selectedJob.applicants}
              </p>
              <div className="mt-3 text-sm text-gray-500">
                (In a real app you would fetch and show the applicants list here
                — name, email, resume link, and actions.)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
