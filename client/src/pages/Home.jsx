import React from "react";
import "../components/home/style.css";
import {
  CompanyLogos,
  Footer,
  Hero,
  JobSection,
  MobileApp,
} from "../components";
import RecruterLogin from "../components/RecruterLogin";
import { JobContext } from "../context/JobContext";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const recruterId = localStorage.getItem("recruiterId") || null;
  const CompanyImage = localStorage.getItem("CompanyImage") || null;

  if (recruterId && CompanyImage) {
    navigate("/dashboard");
  }

  const { showRecruterLogin } = React.useContext(JobContext);
  return (
    <>
      {showRecruterLogin && <RecruterLogin />}
      <div className="w-full bg-cyan-100">
        <div className="max-w-[1200px] mx-auto pb-[50px] bg-cyan-200 rounded-br-[200px] overflow-hidden">
          <Hero />
          <JobSection />
          <CompanyLogos />
        </div>
        <MobileApp />
        <Footer />
      </div>
    </>
  );
};

export default Home;
