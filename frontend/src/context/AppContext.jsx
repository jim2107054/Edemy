import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();

  //function to calculate average rating of a course
  const calculateRating = (course)=>{
    if(course.courseRatings.length===0) return 0;
    //if we have ratings, calculate the average
    let totalRating = 0;
    course.courseRatings.forEach((cRating)=>{
      totalRating += cRating.rating;
    })
    return (totalRating/course.courseRatings.length).toFixed(1)
  }

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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
