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
    <div className="hidden md:block">
      <div className="dog-of-day-title mb-4">Dog of the Day!</div>
      <div className="frame mx-auto">
        {dogPhoto && (
          <div className="image-container">
            <img src={dogPhoto} alt="Dog of the Day" className="main-image" />
            <img src={dogPhoto} alt="Dog of the Day" className="blur-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DogOfTheDay;
