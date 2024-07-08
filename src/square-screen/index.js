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
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 order-2 md:order-1 p-4 md:mr-4">
        <TuitList tuits={tuits} />
      </div>
      <div className="w-full md:w-1/4 order-1 md:order-2 p-4"></div>
    </div>
  );
}

export default SquareScreen;
