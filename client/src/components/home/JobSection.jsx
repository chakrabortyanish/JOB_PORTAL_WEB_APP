import React, { useState, useEffect } from "react";

import { BiSolidDownArrow } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaFilter } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";

import { JobContext } from "../../context/JobContext";
import Card from "./Card.jsx";

// import { jobsData } from "../../assets/assets/assets.js";
import { JobCategories } from "../../assets/assets/assets.js";
import { JobLocations } from "../../assets/assets/assets.js";

const JobSection = () => {
  const [displayFilter, setDisplayFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // loading state 
  const [loading, setLoading] = useState(true);

  const {
    searchJob,
    setSearchJob,
    isSearched,
    jobs,
    setJobs,
    originalJobs,
    fetchJobs,
  } = React.useContext(JobContext);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchJobs();
      setLoading(false);
    };

    loadData(); // 🔥 fetch from DB
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;

    if (type === "category") {
      setSelectedCategories(
        (prev) =>
          e.target.checked
            ? [...prev, value] // add value
            : prev.filter((item) => item !== value), // remove value
      );
    }

    if (type === "location") {
      setSelectedLocations((prev) =>
        e.target.checked
          ? [...prev, value]
          : prev.filter((item) => item !== value),
      );
    }
  };

  useEffect(() => {
    let filteredJobs = originalJobs;

    // filter by category
    if (selectedCategories.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedCategories.includes(job.title),
      );
    }

    // filter by location
    if (selectedLocations.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedLocations.includes(job.location),
      );
    }

    // filter by search
    if (searchJob.role) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchJob.role.toLowerCase()),
      );
    }

    if (searchJob.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(searchJob.location.toLowerCase()),
      );
    }

    setJobs(filteredJobs);
    setCurrentPage(1); // reset pagination
  }, [selectedCategories, selectedLocations, searchJob, originalJobs]);
  // console.log("role ", searchJob.role);

  return (
    <div className="w-full h-auto p-5">
      <div className="flex justify-between max-md:flex-col gap-5">
        <div className="w-[280px] font-['Roboto']">
          {" "}
          {/* left content */}
          <button
            onClick={() => {
              setDisplayFilter((pre) => !pre);
            }}
            className="flex items-center text-[1rem] font-semibold px-3 py-0.5 border-1 rounded mb-5 gap-1.5 cursor-pointer"
          >
            <span className="relative">
              <FaFilter className="relative text-gray-500" />
              {(selectedCategories.length > 0 ||
                selectedLocations.length > 0 ||
                searchJob.role ||
                searchJob.location) && (
                <span className="searched-flag opacity-80">✓</span>
              )}
            </span>
            Filter <BiSolidDownArrow size={12} />
          </button>
          {displayFilter ? (
            <div>
              <div className="my-2.5">
                {isSearched ? (
                  <div className="">
                    <h2 className="text-blue-700 font-bold mb-2">
                      {searchJob.role || searchJob.location
                        ? "Current Searched"
                        : "No Searched"}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {searchJob.role && (
                        <button className="flex place-items-center gap-1 p-1 bg-green-400 rounded-[6px]">
                          {searchJob.role}
                          <RxCross2
                            className=" text-red-600 cursor-pointer"
                            onClick={() =>
                              setSearchJob((pre) => ({ ...pre, role: "" }))
                            }
                          />
                        </button>
                      )}
                      {searchJob.location && (
                        <button className="flex place-items-center gap-1 p-1 bg-pink-200 rounded-[6px]">
                          {searchJob.location}
                          <RxCross2
                            className=" text-red-600 cursor-pointer"
                            onClick={() =>
                              setSearchJob((pre) => ({ ...pre, location: "" }))
                            }
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <h2 className="text-blue-700 font-bold mb-3">No Searched</h2>
                )}
              </div>
              <ul className="flex flex-col font-['Roboto'] text-black text-[16px] gap-2 my-4">
                {/* job topics */}
                <h2 className="text-blue-700 font-bold mb-1">Job Categories</h2>
                {JobCategories.map((category, index) => (
                  <li className="" key={index}>
                    <input
                      onChange={(e) => handleCheckboxChange(e, "category")}
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      value={category}
                      id={category}
                    />
                    <label htmlFor={category} className="cursor-pointer">
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col font-['Roboto'] text-black text-[16px] gap-2">
                {/* job locations */}
                <h2 className="text-blue-700 font-bold mb-1">Job Locations</h2>
                {JobLocations.map((location, index) => (
                  <li className="" key={index}>
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      onChange={(e) => handleCheckboxChange(e, "location")}
                      value={location}
                      id={location}
                    />
                    <label htmlFor={location} className="cursor-pointer">
                      {location}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        {loading ? (
          <div className="flex flex-col items-center mt-[100px] gap-4 w-full">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading Jobs...</p>
          </div>
        ) : (
          <section className="w-full h-auto">
            <h2
              id="joblist"
              className="text-3xl text-center font-semibold text-blue-700"
            >
              Latest jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-[20px]">
              {/* job cards */}
              {jobs
                .slice((currentPage - 1) * 6, currentPage * 6)
                .map((job, index) => (
                  <div key={index}>
                    <Card job={job} />
                  </div>
                ))}
            </div>

            {/* job pagination  */}
            {jobs.length > 0 && (
              <div className="mx-auto flex items-center gap-2 w-fit text-[1.1rem] my-5">
                <a
                  href="#joblist"
                  onClick={() =>
                    setCurrentPage((pre) => (pre > 1 ? pre - 1 : pre))
                  }
                >
                  <MdKeyboardDoubleArrowLeft />
                </a>
                {Array.from({ length: Math.ceil(jobs.length / 6) }).map(
                  (_, index) => (
                    <a href="#joblist">
                      <button
                        onClick={() => setCurrentPage(index + 1)}
                        className={`${
                          currentPage === index + 1 ? "bg-green-400" : ""
                        } font-['Roboto'] px-2 py-0.1 rounded border border-green-400 hover:cursor-pointer`}
                      >
                        {index + 1}
                      </button>
                    </a>
                  ),
                )}
                <a
                  href="#joblist"
                  onClick={() =>
                    setCurrentPage((pre) =>
                      pre < Math.ceil(jobs.length / 6) ? pre + 1 : pre,
                    )
                  }
                >
                  <MdKeyboardDoubleArrowRight />
                </a>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default JobSection;
