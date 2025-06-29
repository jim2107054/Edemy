import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid"; // For generating unique IDs, for each courses
import Quill from "quill"; // For rich text editor

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
      <form>
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
      </form>
    </div>
  );
};

export default AddCourse;
