import React, { useEffect, useState } from 'react'

const Rating = ({initialRating,onRate}) => {
  const [rating, setRating] = useState(initialRating || 0); // Assuming initialRating is defined somewhere in your component or props

  const handleRating = (value) =>{
    setRating(value)
    if(onRate){
      onRate(value);
    }
  }

  // Render stars based on the rating
  useEffect(()=>{
    if(initialRating){
      setRating(initialRating);
    }
  },[initialRating])

  return (
    <div>
      {
        Array.from({length:5},(_,index)=>{
          const startValue = index +1;
          return (
            <span
            onClick={() => handleRating(startValue)}
            key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${startValue<=rating?"text-yellow-500":"text-gray-400"}`}>
              &#9733;
            </span>
          )
        })
      }
    </div>
  )
}

export default Rating