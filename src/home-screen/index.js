import React, { useContext } from "react";
import Title from "./title";
import PostInput from "./posts";
import TuitList from "../tuits";
import DogOfTheDay from "./dog-of-the-day";
import Welcome from "./welcome";
import { AuthContext } from "../auth-context";

const HomeScreen = ({ addTuit, tuits, deleteTuit }) => {
  const { user } = useContext(AuthContext);

  // Filter tuits to display only those from the current user and followed users
  const filteredTuits = tuits.filter(
    (tuit) =>
      tuit.userId._id === user._id ||
      user.followedUsers.includes(tuit.userId._id)
  );

  return (
    <div>
      <Title />
      <PostInput addTuit={addTuit} />
      <TuitList tuits={filteredTuits} handleDelete={deleteTuit} />
      <Welcome />
      <DogOfTheDay />
    </div>
  );
};

export default HomeScreen;
