import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SetUser from "./set-user";
import FetchLocation from "../location";
import { getUsers, updateUser as updateUserApi } from "../api";
import { AuthContext } from "../auth-context";

const ProfileScreen = () => {
  const { user, updateUserContext } = useContext(AuthContext);
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    location: "Fetching location...",
  });

  useEffect(() => {
    if (userId) {
      getUsers()
        .then((response) => {
          const userData = response.data.find((u) => u._id === userId);
          if (userData) {
            setProfileUser(userData);
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    } else if (user) {
      setProfileUser(user);
    }
  }, [userId, user]);

  const handleUpdateUser = (updatedUser) => {
    updateUserApi(updatedUser._id, updatedUser)
      .then((response) => {
        console.log("User updated:", response.data);
        setProfileUser(response.data);
        updateUserContext(response.data); // Update the AuthContext with the new user data
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div>
      <h1>Profile Screen</h1>
      <h2>User Name: {profileUser.username}</h2>
      <h3>First Name: {profileUser.firstName}</h3>
      <h3>Last Name: {profileUser.lastName}</h3>
      <h3>Location: {profileUser.location}</h3>
      <button>Follow</button>
      <SetUser user={profileUser} updateUser={handleUpdateUser} />
      <FetchLocation
        setLocation={(location) =>
          setProfileUser((prevUser) => ({ ...prevUser, location }))
        }
      />
    </div>
  );
};

export default ProfileScreen;
