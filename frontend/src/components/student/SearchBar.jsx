import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({data}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    // Prevent default form submission
    e.preventDefault();
    if (input.trim() === "") return;
    navigate("/course-list/" + input.toLowerCase());
  };
  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <img
        className="md:w-auto w-10 px-3"
        src={assets.search_icon}
        alt="search icon"
      />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-full outline-none shadow-md text-gray-500/80"
        type="text"
        placeholder="Search for courses"
      />
      <button
        type="submit"
        className="bg-blue-600 justify-center text-center rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
