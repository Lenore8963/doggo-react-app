import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      login(response.data); // Set the user data in context
      navigate(`/profile/${response.data._id}`); // Redirect to profile page with user ID
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Login failed: Invalid username or password");
      } else {
        alert("Login failed: An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-start h-screen">
      <div className="w-3/4">
        <h1 className="text-5xl mb-8 text-center font-bold text-indigo-600 tracking-wide">
          Login
        </h1>
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="cute-button bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
