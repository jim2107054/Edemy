import React, { useContext } from "react";
import { assets, dummyTestimonial } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const TestimonialsSection = () => {
  const {getStarType} = useContext(AppContext)
  
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of
        transformation,success, and how our <br /> platform has made a
        difference in their lives.
      </p>
      <div className="grid grid-cols-auto md:px-10 sm:gap-3 md:gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => {
          return (
            <div 
            className="text-sm text-left border border-gray-500/30 rounded-lg bg-white my-3 shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
            key={index}>
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
                <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                  <p className="text-gray-800/80">{testimonial.role}</p>
                </div>
              </div>
              {/*---show star rating---*/}
                <div className="px-5 pt-1 pb-7">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const type = getStarType(testimonial.rating, i);
                      let src;
                      if (type === "full") src = assets.star;
                      else if (type === "half") src = assets.half_star;
                      else src = assets.star_blank;

                      return (
                        <img
                          className="w-4 h-4"
                          key={i}
                          src={src}
                          alt={testimonial.rating + " star rating"}
                        />
                      );
                    })}
                  </div>
                  <p className="text-gray-600 mt-3">{testimonial.feedback}</p>
                  <a href="#" className="text-blue-500 font-medium mt-1 underline">Read more...</a>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialsSection;
