import React, { useContext } from "react";
import Title from "./title";
import PostInput from "./posts";
import TuitList from "../tuits";
import DogOfTheDay from "./dog-of-the-day";
import Welcome from "./welcome";
import { AuthContext } from "../auth-context";
import "./neon-lights.css";

const HomeScreen = ({ addTuit, tuits, deleteTuit }) => {
  const { user } = useContext(AuthContext);

  // Filter tuits to display only those from the current user and followed users
  const filteredTuits = user
    ? tuits.filter(
        (tuit) =>
          tuit.userId._id === user._id ||
          user.followedUsers.includes(tuit.userId._id)
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 order-2 md:order-1 p-4 md:mr-4 shadow-lg rounded-lg">
          <Title />
          <div className="my-4 border-t border-gray-300"></div> {/* Divider */}
          <PostInput addTuit={addTuit} />
          <div className="my-4 border-t border-gray-300"></div> {/* Divider */}
          <TuitList tuits={filteredTuits} handleDelete={deleteTuit} />
        </div>
        <div className="w-full md:w-2/5 order-1 md:order-2 p-4 md:ml-4 shadow-lg rounded-lg">
          <Welcome />
          <DogOfTheDay />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
