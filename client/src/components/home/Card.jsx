import React, {useState, useEffect} from "react";
import ApplyJob from "./ApplyJob";

import { useAuth } from "@clerk/clerk-react";

const Card = ({ job }) => {
  const [selectedJob, setSelectedJob] = useState();
  const [appliedjobs, setAppliedjobs] = useState([]);

   const { getToken } = useAuth();

  async function appliedJobs() {
      const token = await getToken();
      if (!token) return;
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
          setAppliedjobs(data);
        })
        .catch((err) => {
          console.error("Error fetching applied jobs:", err);
        });
    }
  
    useEffect(() => {
      appliedJobs();
    }, []);

  return (
    <>
      <div className="h-[320px] relative bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-full flex justify-between">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <img src={job.companyLogo} alt="company-logo" className="w-[30px] h-[15px]"/>
        </div>
        <div className="flex items-center gap-3 mb-4 mt-2 text-[0.9rem]">
          <button className="text-green-800 rounded flex items-center gap-2 py-0.5 px-2 border-1">
            {job.location}
          </button>
          <button className="text-red-400 rounded  py-0.5 px-2 border-1">
            {job.experienceLevel}
          </button>
        </div>
        <p className="text-[0.8rem]">
          {job.description.slice(0, 200)}...
        </p>
        <div className="flex gap-2 mt-3 absolute bottom-[20px]">
          {
            appliedjobs.some(appliedJob => appliedJob.jobId._id === job._id) ? (
              <button 
              disabled
              className=" bg-gray-400 text-white px-4 py-1 border-1 rounded cursor-not-allowed">
                Applied
              </button>
            ) : (
              <button 
              onClick={()=> setSelectedJob(job)}
              className=" bg-blue-700 text-white px-4 py-1 border-1 rounded hover:bg-blue-600 cursor-pointer transition-colors duration-300">
                Apply Now
              </button>
            )
          }
          <button 
          onClick={()=> setSelectedJob(job)}
          className=" text-black px-4 py-1 border-1 rounded hover:bg-blue-600 hover:text-white hover:border-transparent cursor-pointer transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Applying job page */}
      {
        selectedJob && <ApplyJob appliedjobs={appliedjobs} job={selectedJob} onClose={() => setSelectedJob(null)} />
      }
    </>
  );
};

export default Card;
