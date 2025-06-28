import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Instructor/Navbar";

const Instructor = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <div>{<Outlet />}</div>
    </div>
  );
};

export default Instructor;
