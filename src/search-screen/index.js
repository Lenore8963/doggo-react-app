import React, { useState } from "react";
import FetchLocation from "../location"; // Import the FetchLocation component
import { fetchYelpData } from "./fetchYelp"; // Import the Yelp fetch function

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [results, setResults] = useState([]);

  const handleSearch = async (term) => {
    const searchLocation =
      location === "Fetching location..." ? "Vancouver, BC" : location; // Fallback location
    const data = await fetchYelpData(searchLocation, term);
    setResults(data);
  };

  const handleButtonClick = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div>
      <h1>Search for Dog Services</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for dog services..."
      />
      <button onClick={handleFormSubmit}>Search</button>
      <div>
        <button onClick={() => handleButtonClick("dog parks")}>
          Dog Parks
        </button>
        <button onClick={() => handleButtonClick("dog grooming")}>
          Dog Grooming
        </button>
        <button onClick={() => handleButtonClick("dog training")}>
          Dog Training
        </button>
        <button onClick={() => handleButtonClick("dog boarding")}>
          Dog Boarding
        </button>
      </div>
      <h3>Current Location: {location}</h3>
      <FetchLocation setLocation={setLocation} />
      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((business) => (
            <li key={business.id}>
              <h3>{business.name}</h3>
              <p>{business.location.address1}</p>
              <p>{business.location.city}</p>
              <p>{business.display_phone}</p>
              <a href={business.url} target="_blank" rel="noopener noreferrer">
                View on Yelp
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchScreen;
