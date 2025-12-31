import React, { useEffect, useRef } from "react";
import "./style.css"; // Assuming you have a styles.css file for custom styles

import { IoLocationSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

const ApplyJob = ({ job, onClose }) => {
  const ApplyJob = useRef(null);

  const handleClickOutside = (e) => {
    if (!ApplyJob.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.querySelector("#overflow").style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={handleClickOutside}
      id="overflow"
      className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-1000"
    >
      <div 
        className="relative w-full py-10"
      >
        <div ref={ApplyJob} className="bg-white w-full mx-auto h-auto max-w-[700px]  p-[30px] py-[50px] rounded-2xl top-3">
            <div className="flex justify-between place-items-center">
              <div className="flex flex-col gap-2">
                <img src={job.companyImg} alt="" className="w-[80px] " />
                <div className="">
                  <h2 className="text-blue-700 text-2xl font-bold mt-4 mb-2 leading-tight">
                    {job.title}
                  </h2>
                  <div className="flex place-items-center gap-5 text-[14px]">
                    <div className="flex place-items-center gap-0.5">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="black"
                        >
                          <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                        </svg>
                      </span>
                      <span>{job.companyId.name}</span>
                    </div>
                    <div className="flex place-items-center gap-0.5">
                      <IoLocationSharp />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex place-items-center gap-0.5">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="black"
                        >
                          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                        </svg>
                      </span>
                      <span>{job.level}</span>
                    </div>
                    <div className="flex place-items-center gap-0.5">
                      <FaRupeeSign />
                      <span>{job.salary}/M</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Apply button */}
              <div className="flex flex-col place-items-end gap-1">
                <button className="px-5 py-2.5 cursor-pointer font-semibold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all">
                  Apply Now
                </button>
                <p className="text-[13px] font-[600] text-gray-700">
                  Posted a year ago
                </p>
              </div>
            </div>
            {/* job description */}
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></div>
            <div className="w-full flex justify-center mt-6">
              <button className="px-5 py-2.5 cursor-pointer font-semibold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all">
                Apply Now
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
