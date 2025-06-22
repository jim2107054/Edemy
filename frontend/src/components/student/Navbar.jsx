import React from "react";
import { assets } from "./../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  //if the url pathname includes 'courseList' then bg color should be white, if it's false then we add another bg color
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { isSignedIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate()

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-400 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        className="w-28 lg:w-32 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      {/*--------DeskTop view---------*/}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {!isSignedIn ? (
            <></>
          ) : (
            <div className="flex items-center gap-5">
              <button>Become Educator</button> |
              <Link to="/my-enrollments">My Enrollments</Link>
            </div>
          )}
        </div>
        {isSignedIn ? (
          <UserButton className="w-10 h-10 rounded-full" />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      {/*--------Mobile view----------*/}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-5 text-gray-500">
          {!isSignedIn ? (
            <></>
          ) : (
            <div className="flex items-center gap-1 sm:gap-5 text-gray-500 text-sm">
              <button>Become Educator</button> |
              <Link to="/my-enrollments">My Enrollments</Link>
            </div>
          )}
        </div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <button>
            <img onClick={() => openSignIn()} src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
