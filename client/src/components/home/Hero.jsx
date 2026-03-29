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
          <p className="italic text-gray-700 text-[1.05rem] mt-5  max-md:text-[0.9rem] leading-relaxed">
  Unlock your career potential with opportunities tailored to your skills. 
  Explore, apply, and achieve your goals—all in just a few clicks.
</p>
        </div>
        <div className="w-[500px] relative bg-cyan-100 max-lg:w-[350px] max-md:hidden">
          <div
            className="absolute left-0 bottom-0 ml-10 max-lg:ml-5 
                      w-[400px] h-[400px] max-lg:w-[300px] max-lg:h-[350px]
                      rounded-[48%_52%_62%_38%/62%_45%_55%_38%]
                      bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600
                      shadow-[0_20px_60px_rgba(79,70,229,0.5)]
                      flex items-center justify-center"
          >
            <img src={image} alt="" className="w-full h-full" />
          </div>
        </div>

        {/* search form */}
        <div
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-10
                    w-[52%] max-md:w-full max-md:max-w-[450px]
                    h-[65px] rounded-2xl
                    bg-white/20 backdrop-blur-lg
                    border border-white/30
                    shadow-lg overflow-hidden"
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 px-4 h-full w-full"
          >
            <select
              ref={jobTitle}
              className="w-full max-w-[180px] bg-transparent px-3 py-2 outline-none text-gray-700 cursor-pointer"
            >
              <option value="">Select job topic...</option>
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              ref={jobLocation}
              className="w-full max-w-[180px] bg-transparent px-3 py-2 outline-none text-gray-700 cursor-pointer"
            >
              <option value="">Select location...</option>
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-400 to-pink-500
      hover:from-orange-500 hover:to-pink-600
      text-white px-6 py-2 rounded-xl font-semibold
      transition-all duration-300 hover:scale-105 active:scale-95 shadow-md ml-auto cursor-pointer"
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
