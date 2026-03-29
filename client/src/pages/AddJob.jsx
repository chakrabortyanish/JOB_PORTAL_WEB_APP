import React, { useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { JobCategories } from "../assets/assets/assets.js";
import { JobLocations } from "../assets/assets/assets.js";

import { ToastContainer } from "react-toastify";
import { showError, showSuccess, showWarning } from "../utils/toast";

const AddJob = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [salary, setSalary] = React.useState("");

  const allSkills = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => Boolean(skill));

  const submitForm = (e) => {
    e.preventDefault();
    /* console.log(typeof salary);
    console.log({ title, description, allSkills, location, level, salary }); */
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        skills: allSkills,
        location,
        experienceLevel: level,
        salary,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Job added successfully:", data);
        if (data.success) {
          showSuccess("Job added successfully");
        } else {
          showError(data.message || "Failed to add job");
        }
      })
      .catch((error) => {
        console.error("Error adding job:", error);
      });
  };
  const editorRef = React.useRef(null);
  const quillRef = React.useRef(null);

  useEffect(() => {
    // only initialize once
    if (!editorRef.current) return;

    // avoid re-initializing
    if (quillRef.current) return;

    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    };

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write job description...",
      modules,
    });

    // keep instance
    quillRef.current = quill;

    // optional: update local state on text change (HTML)
    const handleChange = () => {
      setDescription(quill.root.innerHTML);
    };
    quill.on("text-change", handleChange);

    // cleanup on unmount
    return () => {
      quill.off("text-change", handleChange);
      quillRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-6">
      <form
        onSubmit={submitForm}
        className="flex flex-col gap-5 w-full max-w-[550px] bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Job Title */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Job Title:</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none 
        focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          >
            <option value="" disabled>
              Select job title
            </option>
            {JobCategories.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Job Description */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Job Description:</label>
          <textarea
            placeholder="Write job Description here"
            className="h-[140px] border border-gray-300 rounded-lg px-3 py-2 outline-none 
        focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Skills:</label>
          <textarea
            className="h-[100px] border border-gray-300 rounded-lg px-3 py-2 outline-none 
        focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition"
            placeholder="Enter skills (React, Node.js, Communication)"
            onChange={(e) => setSkills(e.target.value)}
            value={skills}
            required
          />
        </div>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Location:</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none 
          focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            >
              <option value="" disabled>
                Select location
              </option>
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Level:</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none 
          focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              required
            >
              <option value="" disabled>
                Select level
              </option>
              {["fresher", "senior"].map((lvl, index) => (
                <option key={index} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Salary:</label>
            <input
              type="text"
              placeholder="Add salary"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none 
          focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition"
              onChange={(e) => setSalary(e.target.value)}
              value={salary}
              required
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white py-2 rounded-lg font-semibold 
      hover:bg-indigo-600 active:scale-95 transition duration-200 shadow-md cursor-pointer"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
