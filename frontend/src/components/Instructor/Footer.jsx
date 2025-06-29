import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      {/*--------left side of footer----------*/}
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="Logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025@Edemy. All Right Reserved.
        </p>
      </div>
      {/*--------right side of footer----------*/}
      <div className="flex items-center gap-3 max-md:mt-4">
        <a href="#">
          <img
            className="hover:bg-blue-400 rounded-full hover:shadow-sm hover:shadow-cyan-600"
            src={assets.facebook_icon}
            alt="facebook"
          />
        </a>
        <a href="#">
          <img
            className="hover:bg-blue-400 rounded-full hover:shadow-sm hover:shadow-cyan-600"
            src={assets.twitter_icon}
            alt="twitter"
          />
        </a>
        <a href="#">
          <img
            className="hover:bg-blue-400 rounded-full hover:shadow-sm hover:shadow-cyan-600"
            src={assets.instagram_icon}
            alt="instagram"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
