import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/student/Footer";
import { AppContext } from "./../../context/AppContext";
import SearchBar from "./../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "./../../components/student/CourseCard";
import { assets } from "../../assets/assets";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);

  //we will get input from url and pass it to SearchBar component
  const { input } = useParams();

  //Filter courses based on input
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    if (allCourses.length > 0) {
      const tempcourses = allCourses.slice();

      if (input) {
        const searchTerm = input.toLowerCase();
        const filtered = tempcourses.filter(
          (course) =>
            course.courseTitle.toLowerCase().includes(searchTerm) ||
            course.courseDescription.toLowerCase().includes(searchTerm)
        );
        setFilteredCourses(filtered);
      } else {
        setFilteredCourses(tempcourses);
      }
    }
  }, [allCourses, input]);
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
          <SearchBar data={input} />
        </div>
        {/*-------Filtered input and cross icon to remove filter-------*/}
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img
              onClick={() => {navigate("/course-list"); scrollTo(0, 0);input("")}}
              src={assets.cross_icon}
              alt=""
              className="cursor-pointer text-gray-700 font-medium"
            />
          </div>
        )}
        {/*-------Add course card-------*/}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center my-5">
            <h2 className="text-center text-gray-600">
              No courses found for "{input}"
            </h2>
          </div>
        )}
        {/*-----Show All Button---------*/}
        {filteredCourses.length > 0 && (
          <div className="flex justify-center pb-32 items-center">
            <button
              className="text-gray-600 border border-gray-500/40 px-10 py-3 rounded"
              onClick={() => scrollTo(0, 0)}
            >
              Load more
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
