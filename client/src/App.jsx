import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./pages/Application";
import Applyjob from "./components/home/ApplyJob.jsx";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";
import RecruterDashboard from "./pages/RecruterDashboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/application" element={<Application />} />
      <Route path="/applyjob" element={<Applyjob />} />
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="" element={<RecruterDashboard/>} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="view-application" element={<ViewApplications />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
      </Route>
    </Routes>
  );
};

export default App;
