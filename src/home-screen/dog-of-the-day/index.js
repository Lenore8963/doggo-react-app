import React, { useState, useEffect } from "react";

const DogOfTheDay = () => {
  const [dogPhoto, setDogPhoto] = useState("");

  useEffect(() => {
    fetchDogPhoto();
  }, []);

  const fetchDogPhoto = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogPhoto(data.message);
    } catch (error) {
      console.error("Error fetching dog photo:", error);
    }
  };

  return (
    <div>
      <h1>Dog of the Day</h1>
      {dogPhoto && <img src={dogPhoto} alt="Dog of the Day" />}
    </div>
  );
};

export default DogOfTheDay;
