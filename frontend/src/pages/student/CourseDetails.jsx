import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./../../context/AppContext";
import Footer from "./../../components/student/Footer";
import Loading from "./../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  //Get course id from url
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const {
    calculateRating,
    getStarType,
    allCourses,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    //Find course with id
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
    console.log("courseData", courseData);
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourses]);

  

  // create a function to toggle the section open/close
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
            className="pt-4 md:text-base line-clamp-3 text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription,
            }}
          ></p>
          {/*------Review and rating----------*/}
          <div className="flex text-xs items-center space-x-2 pt-2 pb-1 sm:text-sm">
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
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              ({courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}{" "}
              enrolled)
            </p>
          </div>
          {/*----------Course Instructor Name------*/}
          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">Jahid Hasan Jim</span>
          </p>

          {/*----------Course Contents(Lectures)----------*/}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  {/*----------Lecture List----------*/}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-none md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, index) => (
                        <li className="flex items-start gap-2 py-1" key={index}>
                          <img
                            className="w-4 h-4 md:mt-1"
                            src={assets.play_icon}
                            alt="play icon"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p className="">{lecture.lectureTitle}</p>
                            <div className="flex gap-2 items-center">
                              {lecture.isPreviewFree && (
                                <p className="text-blue-500 cursor-pointer">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*----------Course Description----------*/}
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
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
