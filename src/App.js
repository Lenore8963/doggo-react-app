import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./home-screen";
import ProfileScreen from "./profile-screen";
import SearchScreen from "./search-screen";
import SquareScreen from "./square-screen";
import Navigation from "./navigation";
import Login from "./login";
import Register from "./register";
import { AuthProvider } from "./auth-context";
import PrivateRoute from "./private-route";
import {
  getTuits,
  addTuit as addTuitApi,
  deleteTuit as deleteTuitApi,
} from "./api";

function App() {
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

  const addTuit = async (tuitText) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const requestBody = { tuit: tuitText, userId: user._id };
      console.log("Adding tuit:", requestBody);
      const response = await addTuitApi(requestBody.tuit, requestBody.userId);
      setTuits([response.data, ...tuits]); // Insert the new tuit at the beginning
    } catch (error) {
      console.error("Error adding tuit:", error);
      console.log(error.response?.data); // Log the response data
    }
  };

  const deleteTuit = async (tuitId) => {
    try {
      await deleteTuitApi(tuitId);
      setTuits(tuits.filter((tuit) => tuit._id !== tuitId));
    } catch (error) {
      console.error("Error deleting tuit:", error);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <HomeScreen
                  addTuit={addTuit}
                  tuits={tuits}
                  deleteTuit={deleteTuit}
                />
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/square" element={<SquareScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
