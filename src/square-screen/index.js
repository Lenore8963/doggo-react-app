// square-screen/index.js
import React, { useState, useEffect } from "react";
import TuitList from "../tuits";
import { getTuits } from "../api";

function SquareScreen() {
  const [tuits, setTuits] = useState([]);

  useEffect(() => {
    fetchTuits();
  }, []);

  const fetchTuits = async () => {
    try {
      const response = await getTuits();
      setTuits(response.data);
    } catch (error) {
      console.error("Error fetching tuits:", error);
    }
  };

  return (
    <div>
      <h1>All Tuits</h1>
      <TuitList tuits={tuits} />
    </div>
  );
}

export default SquareScreen;
