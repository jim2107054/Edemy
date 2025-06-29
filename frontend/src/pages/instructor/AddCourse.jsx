import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid"; // For generating unique IDs, for each courses
import Quill from "quill"; // For rich text editor
import { assets } from "./../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null); // Reference to the Quill editor instance
  const editorRef = useRef(null); // Reference to the Quill editor DOM element

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    // Initialize Quill editor when the component mounts => initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 pt-8 pb-0">
      <form className="flex p-5 md:p-0 flex-col gap-4 w-full max-w-md text-gray-500">
        {/*-------Course Title-------*/}
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
            type="text"
          />
        </div>
        {/*-------Course Description-------*/}
        <div className="flex flex-col gap-1 ">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>
        {/*-------Course Price and Thumbnail-------*/}
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <p>Course Price</p>
            <input
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
              required
              type="number"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p>Course Thumbnail</p>
            <label className="flex items-center gap-3" htmlFor="thumbnailImage">
              <img
                className="p-3 bg-blue-500 rounded"
                src={assets.file_upload_icon}
                alt=""
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
                type="file"
                id="thumanailImage"
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>
        {/*-------Course discount-------*/}
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            max={100}
            min={0}
            required
            type="number"
          />
        </div>
        {/*---------Adding Chapters and Lectures---------*/}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-white border rounded-lg mb-4">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                  />
                  <span className="font-medium">
                    {chapterIndex + 1}
                    {" " + chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  className="cursor-pointer"
                  src={assets.cross_icon}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
