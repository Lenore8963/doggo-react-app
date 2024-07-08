import React from "react";
import Title from "./title";
import PostInput from "./posts";
import TuitList from "../tuits";
import DogOfTheDay from "./dog-of-the-day";
import Welcome from "./welcome";

const HomeScreen = ({ addTuit, tuits, deleteTuit }) => {
  return (
    <div>
      <Title />
      <PostInput addTuit={addTuit} />
      <TuitList tuits={tuits} handleDelete={deleteTuit} />
      <Welcome />
      <DogOfTheDay />
    </div>
  );
};

export default HomeScreen;
