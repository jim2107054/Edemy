import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Instructor/Navbar";
import Sidebar from "../../components/Instructor/Sidebar";
import Footer from "../../components/Instructor/Footer";

const Instructor = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
       <Footer/>
    </div>
  );
};

export default Instructor;
