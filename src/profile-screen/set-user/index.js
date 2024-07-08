import React, { useState, useEffect } from "react";

const SetUser = ({ user, updateUser }) => {
  const [userName, setUserName] = useState(user.username || "");
  const [password, setPassword] = useState(user.password || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  useEffect(() => {
    setUserName(user.username || "");
    setPassword(user.password || "");
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
  }, [user.username, user.password, user.firstName, user.lastName]);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...user,
      username: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    updateUser(updatedUser);
  };

  return (
    <div className="p-4 rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Set User Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-white">User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-white">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-white">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-white">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="cute-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default SetUser;
