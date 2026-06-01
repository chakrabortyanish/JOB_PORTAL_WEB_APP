import React, { useState, useEffect } from "react";
import { JobContext } from "../context/JobContext";

import { RiLoginCircleLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";

import uploadImg from "../assets/assets/upload_area.svg";

import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { showError, showSuccess, showWarning } from "../utils/toast";

const RecruterLogin = () => {
  const navigator = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const { setShowRecruterLogin } = React.useContext(JobContext);

  const [mode, setMode] = useState("login"); // login or signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("image_file:", image);
    if (!image && mode === "signup") {
      alert("Please upload a company logo.");
      return;
    }

    if (mode === "login") {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/recruiter/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyEmail: email,
            password: password,
          }),
        }
      );

      const result = await response.json();
      const { message, success } = result;
      // console.log("message: ", message, success);
      if (success) {
        showSuccess(message);
        localStorage.setItem("recruiterName", result.recruiter.companyName);
        localStorage.setItem("recruiterEmail", result.recruiter.email);
        localStorage.setItem("CompanyImage", result.recruiter.companyImage);
        setTimeout(() => {
          navigator("/dashboard");
        }, 2000);
      } else {
        showWarning(message);
      }
    } else {
      const formData = new FormData();
      formData.append("companyName", name);
      formData.append("companyEmail", email);
      formData.append("password", password);
      formData.append("companyImage", image);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/recruiter/register`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        const { message, success, token } = result;
        // console.log("message: ", message, success);
        if (success) {
          showSuccess(message);
          setMode("login");
          localStorage.setItem("tokenId", token);
        } else if (success === false) {
          showWarning(message);
          setMode("login");
        } else {
          showError(message);
        }
      } catch (err) {
        showError(err.message || "Registration failed");
      }
    }
  };

  return (
    <>
      {/* Popup */}
      <div className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-xs p-4 z-1000">
        <div className="bg-white rounded-2xl shadow-2xl p-5 w-[320px] relative animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setShowRecruterLogin(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          {/* Tabs */}
          <h2 className="w-full flex justify-center mb-6 text-[1.4rem] font-[600] font-['Roboto'] text-blue-700">
            Recruiter {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </h2>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {mode === "signup" && (
              <div className="w-full border-1 border-gray-400 rounded-2xl px-3 py-2 flex items-center gap-2">
                <RxAvatar size={21} color=" #6a7282" />
                <input
                  type="text"
                  placeholder="Recruiter Name"
                  name="companyName"
                  className="w-full outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="w-full border-1 border-gray-400 rounded-2xl px-3 py-2 flex items-center gap-2">
              <MdOutlineMailOutline size={21} color=" #6a7282" />
              <input
                type="email"
                placeholder="Email"
                name="companyEmail"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w-full border  border-gray-400 rounded-2xl px-3 py-2 flex items-center gap-2">
              <RiLockPasswordLine size={21} color=" #6a7282" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === "signup" && (
              <div className="flex items-center gap-2 mb-3 border-1 border-gray-400 rounded-2xl px-3 py-2">
                <label htmlFor="Img" className="cursor-pointer">
                  <img
                    src={image ? URL.createObjectURL(image) : uploadImg}
                    alt="uploadImg"
                    className="w-[50px] h-[50px] rounded-full object-contain"
                  />
                  <input
                    id="Img"
                    type="file"
                    name="companyImage"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                <p className="font-['Poppins'] font-[500] text-[14px] text-itelic">
                  {image ? `${image.name.slice(0,18)}...` : "Upload Company Logo"}
                </p>
              </div>
            )}

            {mode === "login" && (
              <p className="text-[0.9rem] font-[600] text-blue-500">
                Forgot Password?
              </p>
            )}

            <div className=" h-[40px] flex justify-center items-center">
              <button
                type="submit"
                className="px-4 h-full rounded-[30px] bg-blue-600 text-white font-semibold shadow-md mr-2.5 hover:-mr-2 transition-all duration-300 cursor-pointer"
              >
                {mode === "login" ? "LogIn" : "SignUp"}
              </button>
              <span className="grid place-items-center px-2.5 h-full rounded-[30px] bg-blue-600 text-white">
                <RiLoginCircleLine size={22} />
              </span>
            </div>
          </form>
          {/* Switch Mode Link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default RecruterLogin;
