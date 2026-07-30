import React from "react";

import logo from "../../assets/job-logo-removebg-preview.png";
import footer_image from "../../assets/footer_image.png";

import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      className="relative w-full flex justify-center py-[50px] text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${footer_image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-950/85"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] w-full px-[20px]">
        {/* Links Section */}
        <div className="flex w-full justify-between max-sm:flex-col max-sm:text-center max-sm:gap-[30px]">
          <ul className="flex flex-col gap-3">
            {["About us", "We're hiring", "Hire interns", "Post a Job"].map(
              (text, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="group inline-flex items-center transition-all duration-300"
                  >
                    <span className="ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        className="text-current group-hover:scale-110 transition-transform duration-300"
                      >
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                      </svg>
                    </span>

                    <span className="transition-all duration-300 group-hover:translate-x-2">
                      {text}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>

          <ul className="flex flex-col gap-3">
            {["Team Diary", "Blog", "Our Services"].map((text, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="group inline-flex items-center transition-all duration-300"
                >
                  <span className="ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      className="text-current group-hover:scale-110 transition-transform duration-300"
                    >
                      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                    </svg>
                  </span>

                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    {text}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-3">
            {["Terms & Conditions", "Privacy", "Contact us"].map((text, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="group inline-flex items-center transition-all duration-300"
                >
                  <span className="ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      className="text-current group-hover:scale-110 transition-transform duration-300"
                    >
                      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                    </svg>
                  </span>

                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    {text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo + Social */}
        <div className="flex items-center justify-between gap-10 mt-10 max-sm:flex-col max-sm:gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Careeronix logo" className="w-15 h-10" />
            <h2 className="text-xl font-semibold">Careeronix</h2>
          </div>

          <ul className="flex items-center gap-6 text-2xl">
            <li>
              <a
                href="#"
                className="transition duration-300 transform hover:-translate-y-2 hover:scale-125 hover:text-blue-500 inline-block"
              >
                <FaSquareFacebook />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition duration-300 transform hover:-translate-y-2 hover:scale-125 hover:text-pink-500 inline-block"
              >
                <FaInstagram />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition duration-300 transform hover:-translate-y-2 hover:scale-125 hover:text-blue-400 inline-block"
              >
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <p className="text-center mt-8 text-gray-300 text-sm">
          © <span className="font-semibold">{new Date().getFullYear()}</span>{" "}
          Careeronix. All rights reserved. Designed & Developed by <span className="font-semibold text-amber-600">Anish Chakraborty</span>.
        </p>
      </div>
    </div>
  );
};

export default React.memo(Footer);
