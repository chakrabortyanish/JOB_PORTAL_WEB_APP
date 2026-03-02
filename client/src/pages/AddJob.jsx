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
  const [level, setLevel] = React.useState("Full-time");
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
        }else {
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
    <div>
      <form onSubmit={submitForm} className="flex flex-col gap-6 max-w-[500px]">
        {/* Job Title: */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="font-[500] text-[1rem]">
            Job Title:
          </label>
          <select
            name=""
            id=""
            className="border-1 border-gray-600 px-2 py-1.5"
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
        {/* Job Description: */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-[500] text-[1rem]">
            Job Description:
          </label>
          {/* <div ref={editorRef} className="h-[900px]"></div> */}
          <textarea
            placeholder="Write job Description here"
            name=""
            id=""
            className="w-[500px] h-[200px] border-1 border-gray-600 px-2 py-1.5"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* skills section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="font-[500] text-[1rem]">
            Skills:
          </label>
          <textarea
            className="w-[500px] h-[100px] border-1 border-gray-600 px-2 py-1.5"
            type="text"
            name="skills"
            placeholder="Enter skills using comma ( React, Node.js, Communication Skill )"
            onChange={(e) => setSkills(e.target.value)}
            value={skills}
            required
          ></textarea>
        </div>

        {/* other details about job post */}
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="font-[500] text-[1rem]">
              Location:
            </label>
            <select
              name=""
              id=""
              className="border-1 border-gray-600 px-2 py-1.5"
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
          <div className="flex flex-col gap-2">
            <label htmlFor="salary" className="font-[500] text-[1rem]">
              Level:
            </label>
            <select
              name=""
              id=""
              className="border-1 border-gray-600 px-2 py-1.5"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              required
            >
              <option value="" disabled>Select level</option>
              {
                ["fresher", "senior"].map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))
              }
            </select>
          </div>
          {/* salary con */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Salary" className="font-[500] text-[1rem]">
              Salary:
            </label>
            <input
              type="text"
              placeholder="Add salary"
              className="border-1 border-gray-600 pl-3 py-1.5"
              onChange={(e) => setSalary(e.target.value)}
              value={salary}
              required
            />
          </div>
        </div>
        {/* add job button */}
        <button
          type="submit"
          className="w-[100px] font-[500] py-2 bg-green-400 cursor-pointer hover:bg-green-300"
        >
          Add Job
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddJob;
