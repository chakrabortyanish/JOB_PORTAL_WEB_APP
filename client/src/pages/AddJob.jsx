import React, { useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { JobCategories } from "../assets/assets/assets.js";
import { JobLocations } from "../assets/assets/assets.js";

const AddJob = () => {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [level, setLevel] = React.useState("Full-time");
  const [salary, setSalary] = React.useState("");

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
      <form action="" className="flex flex-col gap-6 max-w-[500px]">
        {/* Job Title: */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-[500] text-[1rem]">
            Job Title:
          </label>
          <input
            type="text"
            placeholder="Write job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-1 border-gray-600 pl-3 py-1.5"
          />
        </div>
        {/* Job Description: */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-[500] text-[1rem]">
            Job Description:
          </label>
          <div ref={editorRef} className="h-[900px]"></div>
        </div>
        {/* other details about job post */}
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="font-[500] text-[1rem]">
              Categorie:
            </label>
            <select
              name=""
              id=""
              className="border-1 border-gray-600 px-2 py-1.5"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {JobCategories.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
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
            >
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
            >
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>
        </div>
        {/* salary con */}
        <div className="">
          <label htmlFor="Salary" className="font-[500] text-[1rem]">
            Salary:{" "}
          </label>
          <input
            type="text"
            placeholder="Add salary"
            className="border-1 border-gray-600 pl-3 py-1.5"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
        </div>
        {/* add job button */}
        <button
          type="submit"
          className="w-[100px] font-[500] py-2 bg-green-400 cursor-pointer hover:bg-green-300"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
