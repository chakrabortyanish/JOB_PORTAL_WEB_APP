import React, { useState, useEffect } from "react";
import logo from "../../assets/job-logo-removebg-preview.png";
import { JobContext } from "../../context/JobContext";
import { Notification } from "./Notification.jsx";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { IoNotificationsOutline } from "react-icons/io5";

import { useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const { setShowRecruterLogin } = React.useContext(JobContext);

  const navigate = useNavigate();

  const { openSignIn } = useClerk();
  const { user } = useUser();

  // console.log("Navbar user:", user.id);

  const handleNavigate = () => {
    navigate("/application");
  };

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  // console.log(notifications);
  const { getToken } = useAuth();
  const handleNotification = async () => {
    const token = await getToken();
    // console.log(token);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      // console.log("data: ", data);
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    handleNotification();
  }, []);

  return (
    <div>
      <div className="w-full flex justify-between items-center p-5">
        <div
          className="flex items-center max-md:flex-col cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Careeronix" className="w-15 h-10" />
          <h2 className="title">Careeronix</h2>
        </div>
        <div className="flex font-[1rem] font-['Roboto']">
          {user ? (
            <div className="flex items-center gap-3">
              {/* AI Resume Analyzer */}
              <a
                href="https://ai-resume-analyzer-steel-beta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <button className="cursor-pointer relative overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-medium text-[15px] shadow-lg hover:scale-105 transition-all duration-300 before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                  ✨ AI Resume Analyzer
                </button>
              </a>

              <button
                className="cursor-pointer hover:text-gray-400"
                onClick={handleNavigate}
              >
                Apply Jobs
              </button>

              {/* Notification Bell */}
              <button
                className="relative cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <IoNotificationsOutline fontSize={22} />
                {/* Unread Count */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full py-[1px] px-1.5">
                  {notifications.length}
                </span>
              </button>

              <span className="text-gray-500">|</span>
              <p className="flex gap-1.5">
                Hi,
                <span class="bg-gradient-to-r from-pink-500 to-blue-700 bg-clip-text text-transparent font-semibold">
                  {user.firstName}
                </span>
              </p>
              <UserButton />
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowRecruterLogin(true)}
                className="w-[120px] text-center cursor-pointer transition-all duration-200 ease-in-out hover:tracking-wider"
              >
                Recruter Login
              </button>
              <button
                onClick={openSignIn}
                className="cursor-pointer bg-blue-700 text-white px-4 py-1 ml-2 rounded-2xl login"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {open && (
        <Notification notifications={notifications} open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Navbar;
