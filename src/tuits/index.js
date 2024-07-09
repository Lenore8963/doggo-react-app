import React from "react";
import TuitItem from "./tuit-item";

const TuitList = ({ tuits, handleDelete }) => {
  const sortedTuits = [...tuits].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  return (
    <div>
      {sortedTuits.map((tuit) => (
        <TuitItem
          key={tuit._id}
          tuit={tuit.tuit}
          time={tuit.time}
          user={tuit.userId}
          imageUrl={tuit.imageUrl} // Pass the imageUrl to TuitItem
          onDelete={() => handleDelete(tuit._id)}
        />
      ))}
    </div>
  );
};

export default TuitList;
