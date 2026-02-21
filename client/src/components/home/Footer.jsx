import React from "react";

import logo from "../../assets/job-logo-removebg-preview.png";
import footer_image from "../../assets/footer_image.png"

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
          <li><a href="#" className="hover:text-blue-400 transition">About us</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">We're hiring</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Hire interns</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Post a Job</a></li>
        </ul>

        <ul className="flex flex-col gap-3">
          <li><a href="#" className="hover:text-blue-400 transition">Team Diary</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Our Services</a></li>
        </ul>

        <ul className="flex flex-col gap-3">
          <li><a href="#" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Privacy</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Contact us</a></li>
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
            <a href="#" className="hover:text-blue-500 transition">
              <FaSquareFacebook />
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <p className="text-center mt-8 text-gray-300 text-sm">
        © <span className="font-semibold">{new Date().getFullYear()}</span> Careeronix. All rights reserved.
      </p>

    </div>
  </div>
);
};

export default Footer;
