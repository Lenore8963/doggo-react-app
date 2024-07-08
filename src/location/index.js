import { useEffect, useState } from "react";

const FetchLocation = ({ setLocation }) => {
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = await fetchCityName(latitude, longitude);
            setLocation(location);
            setLocationFetched(true);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLocation("Unable to fetch location");
            setLocationFetched(true);
          }
        );
      } else {
        setLocation("Geolocation not supported");
        setLocationFetched(true);
      }
    };

    if (!locationFetched) {
      fetchLocation();
    }
  }, [locationFetched, setLocation]);

  const fetchCityName = async (latitude, longitude) => {
    const apiKey = "80dba2a210ee472bafce4a482d9430a5"; // Replace with your OpenCage API key
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      if (response.status === 402) {
        return "API limit reached for today";
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.results && data.results[0] && data.results[0].components) {
        const city = data.results[0].components.city || "Unknown city";
        return city;
      } else {
        return "Unknown city";
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unable to fetch city";
    }
  };

  return null;
};

export default FetchLocation;
