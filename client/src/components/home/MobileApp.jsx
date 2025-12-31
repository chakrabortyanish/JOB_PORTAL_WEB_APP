import React from "react";
import "./style.css";

import { mobile, d_image, apple_store } from "../../assets/image";

const MobileApp = () => {
  return (
    <div className="px-2">
      <div id="mobile" className="relative w-full max-w-[1200px] mx-auto bg-cyan-200 h-[400px] my-[50px] flex justify-center max-sm:h-[220px] text-center rounded-[8px]">
      <div className="b-s-1"></div>
      <div className="b-s-2"></div>
      <div className=" max-w-[800px] flex  h-full gap-8 p-5 max-md:gap-3">
        <div className="flex flex-col items-center justify-center max-w-[400px]">
          <h2 className="text-[2rem] font-semibold max-md:text-[1.5rem] max-sm:text-[1.2rem]">
            Download Mobile App For Better Experience
          </h2>
          <div className="flex flex-wrap gap-5 mt-5 max-sm:justify-center">
            <a href="#">
              <img src={mobile} alt="" className="rounded-[7px] max-md:w-[120px]" />
            </a>
            <a href="#">
              <img src={apple_store} alt="" className="rounded-[7px] max-md:w-[120px]" />
            </a>
          </div>
        </div>
        <img src={d_image} alt="" className="w-[300px] max-lg:w-[200px] max-sm:hidden" />
      </div>
    </div>
    </div>
  );
};

export default MobileApp;
