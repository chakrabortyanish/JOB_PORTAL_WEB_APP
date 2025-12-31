import React from "react";

import Marquee from "react-fast-marquee";

import { assets } from "../../assets/assets/assets.js";

const {
  infosys,
  microsoft_logo,
  walmart_logo,
  wipro,
  accenture_logo,
  tcs,
  samsung_logo,
  adobe_logo,
  ibm,
  amazon_logo,
} = assets;

const logos = [
  infosys,
  microsoft_logo,
  walmart_logo,
  wipro,
  accenture_logo,
  tcs,
  samsung_logo,
  adobe_logo,
  ibm,
  amazon_logo,
];

const CompanyLogos = () => {
  return (
    <div className="w-full mt-10 px-0 max-md:px-2.5 py-[30px]">
      <h2 className="text-3xl max-md:text-2xl font-semibold text-center mb-7">
        Top Companies Hiring
      </h2>
      <Marquee pauseOnHover={false} speed={60} gradient={false}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex justify-center items-center cursore-pointer mx-6 max-md:mx-2"
          >
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="w-[100px] h-[40px] max-md:h-[30px] max-md:w-[80px] object-contain opacity-100 transition-opacity duration-500"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyLogos;
