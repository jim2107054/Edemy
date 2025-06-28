import React, { useContext } from "react";
import { AppContext } from "./../../context/AppContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  //create a menu array
  const menuItems = [
    {
      name: "Dashboard",
      path: "/instructor",
      icon: assets.home_icon,
    },
    {
      name: "Add Course",
      path: "/instructor/add-course",
      icon: assets.add_icon,
    },
    {
      name: "My Courses",
      path: "/instructor/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Students Enrolled",
      path: "/instructor/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/instructor"}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-5 gap-3 px-4 text-xl text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-200 border-r-[6px] border-indigo-500/80 text-gray-800" : ""
              }`
            }
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-8 h-8 md:w-6 md:h-6"
            />
            <p className="hidden md:block">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
