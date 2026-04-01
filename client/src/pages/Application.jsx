import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";

import { MdCloudUpload } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

// import { jobsApplied } from "../assets/assets/assets";

import { useAuth } from "@clerk/clerk-react";
import { showError, showSuccess } from "../utils/toast";
import { ToastContainer } from "react-toastify";

const Application = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [jobApplications, setJobApplications] = React.useState([]);

  const [cvImg, setcvImg] = useState(null);
  const [viewCV, setviewCV] = useState("");

  const { getToken } = useAuth();

  useEffect(() => {
    appliedJobs();
    handleViewCv();
  }, []);

  async function appliedJobs() {
    const token = await getToken();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Jobs applied data:", data);
        setJobApplications(data);
      })
      .catch((err) => {
        console.error("Error fetching applied jobs:", err);
      });
  }

  const handleCVUpload = async () => {
    if (!cvImg) {
      alert("Please select a CV to upload");
      return;
    }
    const formData = new FormData();
    formData.append("cv", cvImg);

    const token = await getToken();
    // console.log(token);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cv/upload-cv`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("CV uploaded successfully:", data);
        if (data.success) {
          showSuccess("CV uploaded successfully!");
          handleViewCv();
          setIsEdit(false);
        }
      })
      .catch((err) => {
        console.error("Error uploading CV:", err);
      });
  };
  // console.log(cvImg.name)

  // console.log("View CV URL:", viewCV);
  const handleViewCv = async () => {
    const token = await getToken();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cv/my-cv`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("My CV data:", data);
        console.log("CV URL:", data.cvUrl);
        if (data && data.cvUrl) {
          setviewCV(data.cvUrl);
        } else {
          setIsEdit(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching my CV:", err);
      });
  };

  const handleEdit = () => {
    setIsEdit(true);
    // setcvImg(viewCV.split("-").slice(1).join("-"));
  };

  const handleEditCV = async () => {
    if (!cvImg) {
      showError("Please select a CV to update");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvImg);
    const token = await getToken();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cv/update-cv`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("CV updated successfully:", data);
        if (data.success) {
          showSuccess("CV updated successfully!");
          handleViewCv();
          setIsEdit(false);
        }
      })
      .catch((err) => {
        console.error("Error updating CV:", err);
      });
  };

  return (
    <div className="w-full bg-cyan-100">
      <div className="w-full shadow-md">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto pb-[50px]">
        <div className="w-full font-['Roboto'] p-5">
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-5 tracking-wide">
              Your Resume
            </h2>

            {isEdit ? (
              // ====================== SAVE MODE ======================
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Upload Button */}
                <label
                  htmlFor="uploadCV"
                  className="flex items-center justify-between gap-3 border border-green-400 
        bg-green-50 hover:bg-green-100 text-gray-800 
        px-5 py-3 rounded-xl cursor-pointer transition-all duration-300 
        shadow-sm hover:shadow-md w-full sm:w-auto group"
                >
                  <span className="truncate max-w-[180px] font-medium">
                    {cvImg ? cvImg.name : "Select your CV"}
                  </span>

                  <MdCloudUpload
                    size={26}
                    className="text-blue-600 group-hover:scale-110 transition-transform"
                  />

                  <input
                    id="uploadCV"
                    type="file"
                    // value={cvImg ? cvImg.name? cvImg.name: cvImg : ""}
                    hidden
                    onChange={(e) => setcvImg(e.target.files[0])}
                  />
                </label>

                {/* Save Button */}
                {
                  !viewCV && (
                    <button
                  onClick={handleCVUpload}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800 
        text-white px-6 py-3 rounded-xl shadow-md 
        font-medium transition-all duration-300 
        hover:shadow-lg active:scale-95"
                >
                  Save CV
                </button>
                  )
                }

                {/* Edit CV */}
                {viewCV && (
                  <button
                    onClick={handleEditCV}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800 
        text-white px-6 py-3 rounded-xl shadow-md 
        font-medium transition-all duration-300 
        hover:shadow-lg active:scale-95"
                  >
                    Edit CV
                  </button>
                )}
              </div>
            ) : (
              // ====================== EDIT MODE ======================
              <div className="flex items-center gap-4">
                {/* Resume Link */}
                {/* ====================== VIEW MODE ====================== */}
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}/${viewCV}`}
                  target="_blank"
                  className="bg-blue-100 text-blue-700 px-5 py-2 rounded-xl 
        font-medium shadow-sm hover:bg-blue-200 
        transition-all duration-300 hover:shadow-md"
                >
                  View Resume
                </a>

                {/* Edit Button */}
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 border border-gray-300 
        px-5 py-2 rounded-xl hover:bg-gray-100 
        transition-all duration-300 hover:shadow-sm active:scale-95"
                >
                  <CiEdit size={20} className="text-green-600" />
                  <span className="font-medium">Edit</span>
                </button>
              </div>
            )}
          </div>

          <div className="w-full bg-white p-6 rounded-2xl shadow-lg mt-7">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Jobs Applied
            </h2>

            {jobApplications.length === 0 ? (
              <h2 className="py-[50px] text-center text-xl font-bold mb-4 text-gray-600">
                No Job Applied
              </h2>
            ) : (
              <>
                {/* TABLE FOR DESKTOP - HIDDEN ON SMALL DEVICES */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
                    <thead>
                      <tr className="bg-blue-600 text-white text-left">
                        <th className="py-3 px-4">Company</th>
                        <th className="py-3 px-4">Job Title</th>
                        <th className="py-3 px-4">Resume</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {jobApplications.map((application, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-100 transition-all"
                        >
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={application.jobId?.companyLogo}
                              alt=""
                              className="w-10 h-10 object-contain "
                            />
                            <span className="font-medium text-gray-800">
                              {""}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-gray-700">
                            {application.jobId?.title}
                          </td>
                          <td className="py-3 px-4">
                            <a
                              href={`${import.meta.env.VITE_BACKEND_URL}/${application.resumeUrl}`}
                              target="_blank"
                              className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer inline-block"
                            >
                              View CV
                            </a>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {application.jobId?.location}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {new Date(
                              application.createdAt,
                            ).toLocaleDateString()}
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium 
                ${
                  application.status === "selected"
                    ? "bg-green-100 text-green-700"
                    : application.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
                            >
                              {application.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARDS - VISIBLE ONLY ON SMALL SCREENS */}
                <div className="md:hidden space-y-4">
                  {jobApplications.map((application, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4 shadow-sm bg-gray-50"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={application.jobId?.companyLogo}
                          alt=""
                          className="w-12 h-12 object-contain"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.jobId?.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Location:</span>{" "}
                          {application.jobId?.location}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium 
              ${
                application.status === "Selected"
                  ? "bg-green-100 text-green-700"
                  : application.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
                          >
                            {application.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Application;
