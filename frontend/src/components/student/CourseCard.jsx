import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  // Helper to determine star type: full, half, or empty
  const getStarType = (rating, index) => {
    console.log("rating and index", rating, index);
    if (rating >= index + 1) return "full";
    if (rating >= index + 0.5) return "half";
    return "empty";
  };

  //calculate the average rating of the course
  const rating = calculateRating(course);

  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 hover:-translate-y-3 hover:transition-all hover:duration-500 pb-6 overflow-hidden rounded-lg"
    >
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold line-clamp-1">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator.name}</p>
        <div className="flex items-center space-x-2">
          <p>{rating}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              const type = getStarType(rating, i);
              let src;
              if (type === "full") src = assets.star;
              else if (type === "half") src = assets.half_star;
              else src = assets.star_blank;
              return (
                <img
                  className="w-3.5 h-3.5"
                  key={i}
                  src={src}
                  alt={rating + " star rating"}
                />
              );
            })}
          </div>
          <p className="text-gray-500">
            ({course.courseRatings.length} rating)
          </p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
          {currency}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
