import React, { useContext, useState } from "react";
import logo from "../assets/job-logo-removebg-preview.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import RecruiterProfileModal from "./RecruiterProfileModal";

import addicon from "../assets/assets/add_icon.svg";
import manage from "../assets/assets/home_icon.svg";
import viewApplication from "../assets/assets/person_tick_icon.svg";
import Footer from "../components/home/Footer";

import { UserIcon } from "@heroicons/react/24/outline";

import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { JobContext } from "../context/JobContext";
import { showSuccess } from "../utils/toast";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const recruiterName = localStorage.getItem("recruiterName") || null;
  const recruiterEmail = localStorage.getItem("recruiterEmail") || null;
  const CompanyImage = localStorage.getItem("CompanyImage") || null;

  const recruiterData = {
    name: recruiterName,
    email: recruiterEmail,
    image: CompanyImage,
  };

  const logoutAccount = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    localStorage.removeItem("recruiterId");
    localStorage.removeItem("CompanyImage");
    navigate("/");
    window.location.reload();
  };

  const [handleManage, setHandleManage] = useState(false);

  // use edit context for profile
  const { setEditMode, openProfile, setOpenProfile } = useContext(JobContext);

  function manageRecruiterProfile(){
    setEditMode(true);
    setOpenProfile(true);
  }

  function deleteRecruiterAccount(){
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recruiter/deleteprofile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.success){
        showSuccess("Account deleted successfully");
        localStorage.removeItem("recruiterName");
        localStorage.removeItem("recruiterEmail");
        localStorage.removeItem("CompanyImage");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        alert("Failed to delete account: " + data.message);
      }
    })
  }

  return (
    <>
      <div className=" bg-cyan-100 h-auto pb-[60px]">
        <div className="w-full shadow-md mb-10">
          <div className="max-w-[1250px] mx-auto flex justify-between items-center py-[16px] ">
            <div
              className="flex items-center max-md:flex-col cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="Careeronix" className="w-15 h-10" />
              <h2 className="title">Careeronix</h2>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="text-[16px] font-[500]">
                Wellcome, <span className="text-blue-800">{recruiterName}</span>
              </div>
              <div className="relative group">
                <div className="flex items-center gap-[2px] cursor-pointer">
                  <img
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/uploads/images/${CompanyImage}`}
                    alt="profile icon"
                    className=" w-[40px] h-[40px] p-[2px] rounded-[50%] object-contain shadow-md  cursor-pointer"
                  />
                  <span>
                    <MdArrowDropDown size={20} />
                  </span>
                </div>
                {/* recruiter manage profile dropdown */}
                <div className="hidden group-hover:block absolute button-0 pt-5 right-0 w-[250px] text-center font-[500] text-[14px]">
                  <div className="flex flex-col bg-gray-50 rounded-xl  cursor-pointer shadow-lg">
                    <button
                      onClick={() => {setOpenProfile(true); setEditMode(false)}}
                      className="py-3 px-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-t-xl"
                    >
                      My Profile
                    </button>
                    {/* manage profile */}
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          setHandleManage((pre) => !pre);
                        }}
                        className="flex justify-center gap-1.5 py-3 hover:bg-gray-200 cursor-pointer"
                      >
                        Manage Account
                        <span>
                          {handleManage ? (
                            <MdArrowDropUp size={23} />
                          ) : (
                            <MdArrowDropDown size={23} />
                          )}
                        </span>
                      </button>
                      {handleManage && (
                        <div className="flex flex-col">
                          <button
                            onClick={manageRecruiterProfile}
                            className="py-2 hover:bg-gray-200 cursor-pointer"
                          >
                            Edit Account
                          </button>
                          <button
                          onClick={deleteRecruiterAccount}
                           className="py-2 hover:bg-gray-200 text-red-600 cursor-pointer">
                            Delete Account
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={logoutAccount}
                      className="py-3 px-2 hover:bg-gray-200 cursor-pointer rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto flex max-md:flex-col gap-10">
          {/* left */}
          <section className="flex flex-col gap-2 w-[230px] text-gray-700 font-[500] h-full">
            <NavLink
              to={"/dashboard"}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 w-full py-[8px] px-[20px] hover:bg-gray-200 ${
                  isActive &&
                  "bg-pink-100 border-r-4 border-pink-500 text-gray-800"
                }`
              }
            >
              <UserIcon class="h-6 w-6 font-extrabold text-black" />
              Dashboard
            </NavLink>
            <NavLink
              to={"/dashboard/add-job"}
              className={({ isActive }) =>
                `flex items-center gap-2 w-full py-[8px] px-[20px] hover:bg-gray-200 ${
                  isActive &&
                  "bg-pink-100 border-r-4 border-pink-500 text-gray-800"
                }`
              }
            >
              <img src={addicon} alt="addicon" className="w-[18px]" />
              Add Job
            </NavLink>
            <NavLink
              to={"/dashboard/manage-jobs"}
              className={({ isActive }) =>
                `flex items-center gap-2 w-full py-[8px] px-[20px] hover:bg-gray-200 ${
                  isActive &&
                  "bg-pink-100 border-r-4 border-pink-500 text-gray-800"
                }`
              }
            >
              <img src={manage} alt="manage" className="w-[18px]" />
              Manage Jobs
            </NavLink>
            <NavLink
              to={"/dashboard/view-application"}
              className={({ isActive }) =>
                `flex items-center gap-2 w-full py-[8px] px-[20px] hover:bg-gray-200 ${
                  isActive &&
                  "bg-pink-100 border-r-4 border-pink-500 text-gray-800"
                }`
              }
            >
              <img
                src={viewApplication}
                alt="viewApplication"
                className="w-[18px]"
              />
              View Applications
            </NavLink>
          </section>

          {/* right */}
          <section className="pl-7 pb-4">
            <Outlet />
          </section>
        </div>
      </div>
      <Footer />
      {openProfile ? <RecruiterProfileModal recruiter={recruiterData} /> : null}

      <ToastContainer/>
    </>
  );
};

export default Dashboard;
