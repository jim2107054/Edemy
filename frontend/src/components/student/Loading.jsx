import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-500"></div>
      <div className="text-center font-medium text-blue-500 mt-4">Loading...</div>
    </div>
  );
};

export default Loading;
