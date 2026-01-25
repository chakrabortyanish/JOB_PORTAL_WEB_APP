import React, { useEffect } from "react";
import { createContext, useState } from "react";
// import { jobsData } from "../assets/assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const JobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const [searchJob, setSearchJob] = useState({
    role: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(true);

  const [originalJobs, setOriginalJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [showRecruterLogin, setShowRecruterLogin] = useState(false);

  // recruiter profile manage
  const [editMode, setEditMode] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  /* useEffect(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`)
    .then((res) => res.json())
    .then((data) => setJobs(data))
    .catch(console.error);
}, [searchJob]); */

const fetchJobs = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`);
    const data = await res.json();

    setOriginalJobs(data); // source of truth
    setJobs(data);         // display list
  };

  // console.log("Jobs in Context:", jobs);
  // console.log("search job:", searchJob);

  const value = {
    searchJob,
    setSearchJob,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    fetchJobs,
    originalJobs,
    showRecruterLogin,
    setShowRecruterLogin,
    editMode,
    setEditMode,
    openProfile,
    setOpenProfile,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
