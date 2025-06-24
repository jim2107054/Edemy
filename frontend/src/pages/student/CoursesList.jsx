import React, { useContext } from "react";
import Footer from "../../components/student/Footer";
import { AppContext } from "./../../context/AppContext";
import SearchBar from "./../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "./../../components/student/CourseCard";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);

  //we will get input from url and pass it to SearchBar component
  const { inputParameter } = useParams();
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          {/*-----------Left Group----------*/}
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Courses List
            </h1>
            <p className="text-gray-500">
              <span
                onClick={() => navigate("/")}
                className="text-blue-600 cursor-pointer"
              >
                Home
              </span>
              / <span>Course List</span>
            </p>
          </div>
          {/*-----------Right Group(SearchBar component)----------*/}
          <SearchBar data={inputParameter} />
        </div>
        {/*-------Add course card-------*/}
        <div className="grid grid-cols-auto px-4 md:px-0 md:my-10 my-5 gap-5 md:gap-y-7">
          {allCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        {/*-----Show All Button---------*/}
        <div className="flex justify-center pb-32 items-center">
          <button
            className="text-gray-600 border border-gray-500/40 px-10 py-3 rounded"
            onClick={() => scrollTo(0, 0)}
          >
            Load more
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
