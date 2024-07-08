import React, { useEffect, useState } from "react";

const FetchLocation = ({ setLocation }) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = await fetchCityName(latitude, longitude);
          setLocation(location);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("Unable to fetch location");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, [setLocation]);

  const fetchCityName = async (latitude, longitude) => {
    const apiKey = "80dba2a210ee472bafce4a482d9430a5"; // Replace with your OpenCage API key
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    const city = data.results[0].components.city || "Unknown city";
    return city;
  };

  return null;
};

export default FetchLocation;
