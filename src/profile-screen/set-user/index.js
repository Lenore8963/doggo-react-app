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
    <div>
      <h2>Set User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input type="text" value={userName} onChange={handleUserNameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SetUser;
