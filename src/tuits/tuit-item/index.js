import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth-context";
import { FaTrash } from "react-icons/fa";
import "./styles.css";

const TuitItem = ({ tuit, time, user, imageUrl, onDelete }) => {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (currentUser && user._id === currentUser._id) {
      navigate(`/profile/${currentUser._id}`);
    } else {
      navigate(`/user/${user._id}`);
    }
  };

  return (
    <div className="tuit-item p-4 mb-4 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-start">
        <span
          onClick={handleUserClick}
          className="cursor-pointer text-blue-600 hover:text-blue-800 transition duration-300 font-bold text-lg"
        >
          {user.firstName} {user.lastName}
        </span>
        <FaTrash
          onClick={onDelete}
          className="text-gray-500 cursor-pointer hover:text-red-600 transition duration-300"
        />
      </div>
      <p className="mt-2 text-gray-800">{tuit}</p>
      {imageUrl && (
        <img
          src={`http://localhost:5000${imageUrl}`}
          alt="Tuit"
          className="mt-2 rounded-lg"
        />
      )}
      <p className="text-gray-500 text-right text-sm mt-2">
        {new Date(time).toLocaleString()}
      </p>
    </div>
  );
};

export default TuitItem;
