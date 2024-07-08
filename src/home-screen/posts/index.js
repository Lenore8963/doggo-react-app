import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth-context";

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
    <div>
      <textarea
        value={post}
        onChange={handleInputChange}
        placeholder="Write your post..."
      ></textarea>
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
};

export default PostInput;
