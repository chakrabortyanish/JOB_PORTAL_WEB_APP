import React, {useState} from "react";
import ApplyJob from "./ApplyJob";

const Card = ({ job }) => {
  const [selectedJob, setSelectedJob] = useState();

  return (
    <>
      <div className="h-[320px] relative bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* <img src={""} alt="" className="w-[40px] mb-1" /> */}
        <div className="w-full flex justify-between">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <img src={job.companyImg} alt={job.companyImg} className="w-[30px] h-[15px]"/>
        </div>
        <div className="flex items-center gap-3 mb-4 mt-2 text-[0.9rem]">
          <button className="text-green-800 rounded flex items-center gap-2 py-0.5 px-2 border-1">
            {job.location}
          </button>
          <button className="text-red-400 rounded  py-0.5 px-2 border-1">
            {job.level}
          </button>
        </div>
        <p className="text-[0.8rem]">
          {job.description.slice(0, 200).replace("<p>", "")}...
        </p>
        <div className="flex gap-2 mt-3 absolute bottom-[20px]">
          <button className=" bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
           onClick={()=> setSelectedJob(job)}>
            Apply Now
          </button>
          <button 
          onClick={()=> setSelectedJob(job)}
          className=" text-black px-4 py-1 border-1 rounded hover:bg-blue-600 hover:text-white hover:border-transparent cursor-pointer transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Applying job page */}
      {
        selectedJob && <ApplyJob job={selectedJob} onClose={() => setSelectedJob(null)} />
      }
    </>
  );
};

export default Card;
