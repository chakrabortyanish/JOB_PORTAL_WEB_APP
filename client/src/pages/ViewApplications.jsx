import React, { useMemo, useState } from "react";
import cv from "../assets/Anish Chakraborty_CV.pdf"
import { useEffect } from "react";

export default function ViewApplications() {

   const [applications, setApplications] = useState([]);
  // sample data - replace with API data
 /*  const initialData = [
    {
      id: 1,
      userName: "Anish Chakraborty",
      jobTitle: "Frontend Developer",
      location: "Kolkata, India",
      resumeUrl: "https://example.com/resume-anish.pdf",
      appliedAt: "2025-12-01",
    },
    {
      id: 2,
      userName: "Riya Sen",
      jobTitle: "Backend Engineer",
      location: "Bengaluru, India",
      resumeUrl: "https://example.com/resume-riya.pdf",
      appliedAt: "2025-11-28",
    },
    {
      id: 3,
      userName: "Rahul Das",
      jobTitle: "Full Stack Developer",
      location: "Mumbai, India",
      resumeUrl: "https://example.com/resume-rahul.pdf",
      appliedAt: "2025-11-25",
    },
  ];
 */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/received`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("R_Token")}`, // send token in header for authentication
      },
      credentials: "include" // send cookies for authentication
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Received applications data:", data.applications);
        setApplications(data?.applications || []); // assuming API returns { applications: [...] }
      })
      .catch((err) => {
        console.error("Error fetching received applications:", err);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [selected, setSelected] = useState(null); // for modal

  const filtered = useMemo(() => {
    if (!query) return applications;
    const q = query.toLowerCase();
    return applications.filter(
      (a) =>
        a.candidate?.name.toLowerCase().includes(q) ||
        a.jobId?.title.toLowerCase().includes(q) ||
        a.jobId?.location.toLowerCase().includes(q)
    );
  }, [applications, query]);

  // console.log("filtered applications: ", filtered);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleDelete(id) {
    if (!confirm("Delete this application?")) return;
    setApplications((prev) => prev.filter((p) => p.id !== id));
  }

  function handleDownload(url, name) {
    // simple download helper - opens in new tab
    const a = document.createElement("a");
    a.href = url;
    a.download = name || "resume.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // console.log("Filtered applications: ", applications);

 const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 min-w-full">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading Applications...</p>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Applications</h2>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search by name, job or location"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={() => { setQuery(""); setPage(1); }}
            className="text-sm text-gray-600 hover:underline"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-3 text-sm font-medium text-gray-700">User name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Job title</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Location</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Resume</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-400">
                  No applications found
                </td>
              </tr>
            ) : (
              paged.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                        {/* {app.userName.split(" ").map(n => n[0]).slice(0,2).join("") || "NA"} */}
                        <img src={app.candidate?.image} alt={app.candidate?.name || "Candidate"} className="h-10 w-10 rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{app.candidate?.name}</div>
                        <div className="text-sm text-gray-500">Applied: {new Date(app.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">{app.jobId.title}</div>
                    {/* <div className="text-sm text-gray-500">ID: {app.id}</div> */}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{app.jobId.location}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(app)}
                        className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDownload(app.resumeUrl, `${app.userName}-resume.pdf`)}
                        className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50"
                      >
                        Download
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Message ${app.userName} - integrate chat/email here`)}
                        className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                      >
                        Message
                      </button>

                      <button
                        onClick={() => handleDelete(app.id)}
                        className="px-3 py-1 rounded-md bg-red-50 text-red-600 text-sm border border-red-100 hover:bg-red-100"
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

        {/* Pagination */}
        <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {Math.min((page-1)*pageSize + 1, filtered.length)} - {Math.min(page*pageSize, filtered.length)} of {filtered.length}</div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p-1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md border ${page===1? 'text-gray-400 border-gray-100':'text-gray-700 border-gray-200'} `}
            >
              Prev
            </button>

            <div className="text-sm text-gray-700">Page {page} / {totalPages}</div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p+1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md border ${page===totalPages? 'text-gray-400 border-gray-100':'text-gray-700 border-gray-200'} `}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Resume modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl mx-4 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-lg font-medium">Resume — {selected.userName}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={selected.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-1 border rounded-md"
                >
                  Open in new tab
                </a>
                <button onClick={() => setSelected(null)} className="px-3 py-1 rounded-md bg-gray-100">Close</button>
              </div>
            </div>

            <div className="p-4 h-[70vh] overflow-auto">
              {/* show resume preview - if it's a pdf the browser will render it, otherwise link will open */}
              <iframe src={cv} title="resume-preview" className="w-full h-full border"></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

