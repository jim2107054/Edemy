import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./../../context/AppContext";
import Footer from "./../../components/student/Footer";
import Loading from "./../../components/student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  //Get course id from url
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { calculateRating, getStarType, allCourses } = useContext(AppContext);

  const fetchCourseData = async () => {
    //Find course with id
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
    console.log("courseData", courseData);
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourses]);

  //  //calculate the average rating of the course
  // const rating = calculateRating(courseData);

  return courseData ? (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>
        {/*--------Left column----------*/}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>
          {/*------Review and rating----------*/}
          <div className="flex items-center space-x-2 pt-2 pb-1 text-sm">
          <p>{calculateRating(courseData)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              const type = getStarType(calculateRating(courseData), i);
              let src;
              if (type === "full") src = assets.star;
              else if (type === "half") src = assets.half_star;
              else src = assets.star_blank;
              return (
                <img
                  className="w-3.5 h-3.5"
                  key={i}
                  src={src}
                  alt={calculateRating(courseData) + " star rating"}
                />
              );
            })}
          </div>
          <p className="text-blue-600">
            ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
          </p>
          <p>({courseData.enrolledStudents.length} {courseData.enrolledStudents.length>1?"students":"student"} enrolled)</p>
        </div>
        {/*----------Course Instructor Name------*/}
        <p className="text-sm">Course by <span className="text-blue-600 underline">Jahid Hasan Jim</span></p>
        </div>
        {/*--------Right column----------*/}
        <div></div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
