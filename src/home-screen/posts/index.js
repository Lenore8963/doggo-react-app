import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth-context";
import "./styles.css";

const PostInput = ({ addTuit }) => {
  const [post, setPost] = useState("");
  const [imageFile, setImageFile] = useState(null); // Add state for image file
  const { user } = useContext(AuthContext);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]); // Handle image file selection
  };

  const handlePublish = () => {
    if (user) {
      addTuit(post, user._id, imageFile); // Pass image file to addTuit
      setPost(""); // Clear the input after publishing
      setImageFile(null); // Clear the selected image file
    } else {
      alert("You must be logged in to post.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-purple-200 p-4 rounded-lg shadow-md w-full mx-auto">
      <textarea
        value={post}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
        placeholder="Write your post..."
      ></textarea>
      <div className="flex w-full space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full md:w-auto p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button
          className="cute-button bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ml-auto"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PostInput;
