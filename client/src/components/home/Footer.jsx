import React from "react";

import logo from "../../assets/job-logo-removebg-preview.png";

import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 flex justify-center py-[50px] text-white">
      <div className="max-w-[1000px] w-full px-[20px]">
        <div className="flex w-full justify-between max-sm:flex-col max-sm:text-center max-sm:gap-[30px]">
          <ul className="flex flex-col gap-3">
            <li>About us</li>
            <li>We're hiring</li>
            <li>Hire interns for your company</li>
            <li>Post a Job</li>
          </ul>
          <ul className="flex flex-col gap-3">
            <li>Team Diary</li>
            <li>Blog</li>
            <li>Our Services</li>
          </ul>
          <ul className="flex flex-col gap-3">
            <li>Terms & Conditions</li>
            <li>Privacy</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="flex items-center gap-10 mt-10 max-sm:justify-center">
          <div className="flex items-center max-md:flex-col">
            <img src={logo} alt="Careeronix" className='w-15 h-10' />
            <h2 className="">Careeronix</h2> {/*  "Dancing Script", cursive; */}
          </div>
          <ul className="flex items-center gap-5 text-2xl text-blue-700">
            <li><FaSquareFacebook/></li>
            <li><FaInstagram /></li>
            <li><FaLinkedin /></li>
          </ul>
        </div>
        <p className="text-right mt-5 text-gray-500">©<span className="font-bold">{new Date().getFullYear()}</span> Careeronix. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
