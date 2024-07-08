import React from "react";

const TuitItem = ({ tuit, time, user, onDelete }) => {
  return (
    <div>
      <p>{tuit}</p>
      <p>{new Date(time).toLocaleString()}</p>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TuitItem;
