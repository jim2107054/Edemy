import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 my-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>
      {/*-------Add course card-------*/}
      <div className="grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0,4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      {/*-----Show All Button---------*/}
      <Link
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
      >
        Show All Courses
      </Link>
      {/*-----ScrollTo(0,0) means it will scroll to the top of the page ---------*/}
    </div>
  );
};

export default CoursesSection;
