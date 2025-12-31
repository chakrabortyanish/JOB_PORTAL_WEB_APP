import React, { useRef } from "react";
import Navbar from "./Navbar";
import image from "../../assets/hero-logo.png";
import "./style.css";

import { jobsData } from "../../assets/assets/assets.js";
import { JobCategories } from "../../assets/assets/assets.js";
import { JobLocations } from "../../assets/assets/assets.js";

import { JobContext } from "../../context/JobContext";

const Hero = () => {
  const { setJobs, setSearchJob, setIsSearched } = React.useContext(JobContext);

  const jobTitle = useRef(null);
  const jobLocation = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const titleValue = jobTitle.current.value;
    const locationValue = jobLocation.current.value;

    if ((titleValue && locationValue) === "") {
      setJobs;
    }

    setSearchJob({
      role: titleValue,
      location: locationValue,
    });

    setJobs(() => {
      return jobsData.filter((job) => {
        const matchesRole =
          jobTitle.current.value === "" || job.title === jobTitle.current.value;

        const matchesLocation =
          jobLocation.current.value === "" ||
          job.location === jobLocation.current.value;

        return matchesRole && matchesLocation; // true or false
      });
    });

    setIsSearched(true);

    // console.log("Updated searchJob:", searchJob.role);
  };

  // const [current, setCurrent] = useState(0);

  return (
    <div className="w-full">
      <Navbar />
      <div className="relative flex h-[450px] gap-4 justify-between">
        <div className="w-3/6 pl-5 mt-5 max-md:w-full max-md:text-center">
          <h1
            id="hero-title"
            className="text-[4rem] leading-20 max-lg:text-[3rem] max-lg:leading-15 max-md:text-[2.2rem]"
          >
            Find a Job With Your Interests and Abilities
          </h1>
          <p className="font-style italic  text-green-700 text-[1rem] mt-5 max-md:text-[0.8rem] hero-description">
            Landing your dream job has never been easier. Explore thousands of
            opportunities and apply in just a few clicks!
          </p>
        </div>
        <div className="w-[500px] relative bg-cyan-100 max-lg:w-[350px] max-md:hidden">
          <div className="absolute left-0 bottom-0 max-lg:w-[300px] max-lg:h-[350px] w-[400px] h-[400px] rounded-[48%_52%_62%_38%/62%_45%_55%_38%] bg-blue-600 ml-10 max-lg:ml-5">
            <img src={image} alt="" className="w-full h-full" />
          </div>
        </div>
        <div
          className="pseudo-ele absolute z-50 left-1/2 -translate-x-1/2 bottom-10 border-2 border-red-500 opacity-100  w-[60%] h-[60px] rounded-xl
          max-md:w-full max-md:max-w-[450px] max-md:bottom-20 overflow-hidden
        "
        >
          {/* bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 */}
          <form
            onSubmit={handleSearch}
            className="font-style relative flex justify-between place-items-center gap-2 px-4 h-[100%] w-full  z-100"
          >
            <select
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              ref={jobTitle}
              className="w-full h-full max-w-[180px]  px-3 py-2 outline-0  cursor-pointer"
            >
              <option
                value=""
                style={{ fontWeight: "600", color: "#555", padding: "8px" }}
              >
                Select job topic...
              </option>
              {JobCategories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                  style={{
                    padding: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {category}
                </option>
              ))}
            </select>
            <select
              // value={location}
              // onChange={(e) => setLocation(e.target.value)}
              ref={jobLocation}
              className="w-full h-full max-w-[180px]  px-3 py-2 outline-0 cursor-pointer"
            >
              <option
                value=""
                style={{ fontWeight: "600", color: "#555", padding: "8px" }}
              >
                Select location...
              </option>
              {JobLocations.map((location, index) => (
                <option
                  key={index}
                  value={location}
                  style={{
                    padding: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {location}
                </option>
              ))}
              {/* Add more options as needed */}
            </select>
            <button
              type="submit"
              className="bg-orange-300 hover:bg-orange-500 px-6 py-2 rounded-xl text-black font-semibold cursor-pointer
    transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
