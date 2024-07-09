// components/add-dog.js
import React, { useState } from "react";
import { addDog as addDogApi } from "../../api";

const AddDog = ({ userId, onDogAdded }) => {
  const [dogName, setDogName] = useState("");
  const [dogImage, setDogImage] = useState(null);

  const handleNameChange = (event) => {
    setDogName(event.target.value);
  };

  const handleImageChange = (event) => {
    setDogImage(event.target.files[0]);
  };

  const handleAddDog = async () => {
    try {
      await addDogApi(userId, dogName, dogImage);
      onDogAdded();
      setDogName("");
      setDogImage(null);
    } catch (error) {
      console.error("Error adding dog:", error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-bold mb-4 text-white">Add a Dog</h3>
      <input
        type="text"
        value={dogName}
        onChange={handleNameChange}
        placeholder="Dog's Name"
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleAddDog}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add Dog
      </button>
    </div>
  );
};

export default AddDog;
