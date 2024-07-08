// tuits/tuit-item.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth-context";

const TuitItem = ({ tuit, time, user, onDelete }) => {
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
    <div>
      <p>{tuit}</p>
      <p>{new Date(time).toLocaleString()}</p>
      <p>
        <span
          onClick={handleUserClick}
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {user.firstName} {user.lastName}
        </span>
      </p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TuitItem;
