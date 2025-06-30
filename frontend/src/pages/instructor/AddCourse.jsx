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

  // Function to handle adding, removing, and toggling chapters
  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter title:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false, // collapsed means chapter is not expanded, in which case we will not show the lectures
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              collapsed: !chapter.collapsed, // Toggle the collapsed state
            };
          }
          return chapter;
        })
      );
    }
  };

  // Function to handle adding a lecture to a chapter
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setShowPopup(true);
      setCurrentChapterId(chapterId);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1); // Remove the lecture at the specified index
          }
          return chapter;
        })
      );
    }
  };

  // Function to add lecture details to the chapter
  const addLecture = () => {
    setChapters(
      chapters.map((chapter)=> {
        if(chapter.chapterId === currentChapterId){
          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid(), // Generate a unique ID for the lecture
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
          };
          chapter.chapterContent.push(newLecture); // Add the new lecture to the chapter
          }
        return chapter;
      })
    )
    setShowPopup(false); // Close the popup after adding the lecture
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    }); // Reset the lecture details
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      // const courseDescription = quillRef.current.root.innerHTML; // Get the HTML content from the Quill editor

      // // Create a course object with all the details
      // const course = {
      //   title: courseTitle,
      //   description: courseDescription,
      //   price: coursePrice,
      //   discount: discount,
      //   thumbnail: image,
      //   chapters: chapters,
      // };

       console.log("Form Submitted Successfully"); // Log the course object to the console (or send it to your backend)
  }

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
      <form 
      onSubmit={handleSubmit}
       className="flex p-5 md:p-0 flex-col gap-4 w-full max-w-md text-gray-500">
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
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
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
                  onClick={()=> handleChapter('remove', chapter.chapterId)}
                  className="cursor-pointer"
                  src={assets.cross_icon}
                  alt=""
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}
                        {" " + lecture.lectureTitle} - {lecture.lectureDuration}{" "}
                        mins -
                        <a
                          target="_blank"
                          href={lecture.lectureUrl}
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                       onClick={()=> handleLecture("remove", chapter.chapterId, lectureIndex)}
                        className="cursor-pointer"
                        src={assets.cross_icon}
                        alt=""
                      />
                    </div>
                  ))}
                  <div 
                  onClick={() => handleLecture("add", chapter.chapterId)}
                  className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2">
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center text-white bg-blue-400 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>
          {showPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white text-gray-700 p-4 rounded-md relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                {/*--------------Lecture Title---------*/}
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                {/*--------------Lecture Duration---------*/}
                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    type="number"
                  />
                </div>
                {/*--------------Lecture URL---------*/}
                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                {/*--------------Free Preview Checkbox---------*/}
                <div className="flex gap-2 my-4">
                  <p>Free Preview</p>
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="mt-1 scale-125"
                  />
                </div>
                {/*--------------Buttons---------*/}
                <button
                  onClick={addLecture}
                  type="button"
                  className="w-full bg-blue-400 text-white py-2 px-4 rounded-md"
                >
                  Add
                </button>
                {/*----------show popup false----------*/}
                <img
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                  src={assets.cross_icon}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        {/*-------Submit Button-------*/}
        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
