import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  //Healper to determine star type: full, half, or empty
  const getStarType = (rating, index) => {
    if (rating >= index + 1) return "full";
    if (rating >= index + 0.5) return "half";
    return "empty";
  };
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of
        transformation,success, and how our <br /> platform has made a
        difference in their lives.
      </p>
      <div>
        {dummyTestimonial.map((testimonial, index) => {
          return (
            <div key={index}>
              <div>
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h1>{testimonial.name}</h1>
                  <p>{testimonial.role}</p>
                </div>

                {/*---show star rating---*/}
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => {
                      const type = getStarType(testimonial.rating, i);
                      let src;
                      if (type === "full") src = assets.star;
                      else if (type === "half") src = assets.half_star;
                      else src = assets.star_blank;

                      return (
                        <img
                          className="w-3.5 h-3.5"
                          key={i}
                          src={src}
                          alt={testimonial.rating + " star rating"}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialsSection;
