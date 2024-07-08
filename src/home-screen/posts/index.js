import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth-context";
import "./styles.css";

const PostInput = ({ addTuit }) => {
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handlePublish = () => {
    if (user) {
      addTuit(post);
      setPost(""); // Clear the input after publishing
    } else {
      alert("You must be logged in to post.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-purple-200 p-4 rounded-lg shadow-md">
      <div className="flex w-full space-x-4">
        <textarea
          value={post}
          onChange={handleInputChange}
          className="flex-1 p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
          placeholder="Write your post..."
        ></textarea>
        <button className="cute-button" onClick={handlePublish}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default PostInput;
