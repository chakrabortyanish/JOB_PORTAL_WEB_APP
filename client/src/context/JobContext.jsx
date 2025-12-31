import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { jobsData } from "../assets/assets/assets";

export const JobContext = createContext();

export const JobContextProvider = ({ children }) => {

  const [searchJob, setSearchJob] = useState({
    role : "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(true)

  const [jobs, setJobs] = useState([])

  const [showRecruterLogin, setShowRecruterLogin] = useState(false);

  useEffect(() => {
     setJobs(jobsData)
  },[])

  // console.log("Jobs in Context:", jobs);
  // console.log("search job:", searchJob);

  const value = {
    searchJob, setSearchJob,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruterLogin, setShowRecruterLogin
  }
  
    return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
    )    
}