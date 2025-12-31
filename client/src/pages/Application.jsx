import React, { useState } from "react";
import { Footer, Navbar } from "../components";

import { MdCloudUpload } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { jobsApplied } from "../assets/assets/assets";

const Application = () => {
  const [isEdit, setIsEdit] = React.useState(false);

  const [cvImg, setcvImg] = useState(null);
  // console.log(cvImg.name)

  return (
    <div className="w-full bg-cyan-100">
      <div className="w-full shadow-md">
          <div className="max-w-[1200px] mx-auto">
            <Navbar />
          </div>
        </div>
      <div className="max-w-[1200px] mx-auto pb-[50px]">
        <div className="w-full font-['Roboto'] p-5">
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-black mb-3">
              Your Resume
            </h2>

            {isEdit ? (
              // ====================== EDIT MODE ======================
              <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Upload Button */}
                <label
                  htmlFor="uploadCV"
                  className="flex items-center gap-2 border-1 bg-green-600/20 border-green-400 
                  rounded-xl px-4 py-2 cursor-pointer hover:bg-green-600/30 
                  transition-all text-gray-800 font-[400]"
                >
                  {
                    cvImg? <span>{cvImg.name}</span>: <span>Select CV</span>
                  }
                  <input id="uploadCV" type="file" hidden onChange={(e)=> setcvImg(e.target.files[0])}/>
                  <MdCloudUpload size={25} className="text-blue-700" />
                </label>

                {/* Save Button */}
                <button
                  onClick={() => cvImg? setIsEdit(false): alert("Please select a CV to upload")}
                  className="bg-blue-700 hover:bg-blue-800 transition-all text-white 
                   px-6 py-2 rounded-xl shadow-md font-medium"
                >
                  Save CV
                </button>
              </div>
            ) : (
              // ====================== VIEW MODE ======================
              <div className="flex items-center gap-4 text-[15px]">
                {/* Resume Link */}
                <a
                  href=""
                  className="font-medium bg-blue-200 hover:bg-blue-300 transition-all 
                   text-blue-800 px-5 py-1.5 rounded-2xl shadow-sm"
                >
                  Resume
                </a>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex items-center gap-2 border border-gray-600 px-5 py-1.5 
                   rounded-2xl cursor-pointer hover:bg-gray-100 transition-all"
                >
                  Edit
                  <CiEdit size={22} className="text-green-600" />
                </button>
              </div>
            )}
          </div>

          <div className="w-full bg-white p-6 rounded-2xl shadow-lg mt-7">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Jobs Applied
            </h2>

            {/* TABLE FOR DESKTOP - HIDDEN ON SMALL DEVICES */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Job Title</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {jobsApplied.map((job, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-100 transition-all"
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={job.logo}
                          alt=""
                          className="w-10 h-10 object-contain "
                        />
                        <span className="font-medium text-gray-800">
                          {job.company}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-gray-700">{job.title}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {job.location}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{job.date}</td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium 
                ${
                  job.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : job.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS - VISIBLE ONLY ON SMALL SCREENS */}
            <div className="md:hidden space-y-4">
              {jobsApplied.map((job, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 shadow-sm bg-gray-50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={job.logo}
                      alt=""
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.company}
                      </h3>
                      <p className="text-sm text-gray-600">{job.title}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {job.location}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {job.date}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium 
              ${
                job.status === "Selected"
                  ? "bg-green-100 text-green-700"
                  : job.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
                      >
                        {job.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Application;
