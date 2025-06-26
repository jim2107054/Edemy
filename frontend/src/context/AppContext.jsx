import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  //function to calculate average rating of a course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) return 0;
    //if we have ratings, calculate the average
    let totalRating = 0;
    course.courseRatings.forEach((cRating) => {
      totalRating += cRating.rating;
    });
    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  //Function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) =>
      time += lecture.lectureDuration);
    return humanizeDuration(time * 60 *1000, { units: ["h", "m"] });
  };

  //Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    console.log("time", time);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate No of lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // Helper to determine star type: full, half, or empty
  const getStarType = (rating, index) => {
    // console.log("rating and index", rating, index);
    if (rating >= index + 1) return "full";
    if (rating >= index + 0.5) return "half";
    return "empty";
  };

  //fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    getStarType,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
