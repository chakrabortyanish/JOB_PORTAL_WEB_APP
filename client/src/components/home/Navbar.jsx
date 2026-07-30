import React, { useState, useEffect } from "react";
import logo from "../../assets/job-logo-removebg-preview.png";
import { JobContext } from "../../context/JobContext";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { IoNotificationsOutline } from "react-icons/io5";
import { GiCrossedBones } from "react-icons/gi";

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
      if(data.success){
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
        <div
  className={`fixed top-0 right-0 h-screen w-[360px] bg-white shadow-xl z-50 border-l border-gray-100 transition-transform duration-300 ease-in-out ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
    <div className="flex items-center gap-2.5">
      <h2 className="text-base font-bold text-gray-900 tracking-tight">
        Notifications
      </h2>
      {notifications.some((n) => !n.isRead) && (
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
      )}
    </div>

    <button
      onClick={() => setOpen(false)}
      className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
      aria-label="Close notifications"
    >
      <GiCrossedBones fontSize={16} />
    </button>
  </div>

  {/* Notification List */}
  <div className="h-[calc(100vh-65px)] overflow-y-auto divide-y divide-gray-100">
    {notifications.length === 0 ? (
      <div className="flex flex-col justify-center items-center h-full text-gray-400 px-6 text-center">
        <p className="text-sm font-medium">No notifications yet</p>
      </div>
    ) : (
      notifications.map((item) => (
        <div
          key={item._id}
          className={`group relative p-4 transition-colors duration-150 hover:bg-gray-50/80 cursor-pointer ${
            !item.isRead ? "bg-blue-50/40" : "bg-white"
          }`}
        >
          {/* Subtle unread indicator bar on the left */}
          {!item.isRead && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
          )}

          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-sm tracking-tight ${
                !item.isRead
                  ? "font-semibold text-gray-900"
                  : "font-medium text-gray-700"
              }`}
            >
              {item.title}
            </h3>
          </div>

          <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
            {item.message}
          </p>

          <p className="text-[11px] font-medium text-gray-400 mt-2">
            {new Date(item.createdAt).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
        </div>
      ))
    )}
  </div>
</div>
      )}
    </div>
  );
};

export default Navbar;
