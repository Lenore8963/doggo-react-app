// user-profile-screen/index.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsers } from "../api";

const UserProfileScreen = () => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
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
    }
  }, [userId]);

  return (
    <div>
      <h1>{profileUser.username}'s Profile</h1>
      <h2>First Name: {profileUser.firstName}</h2>
      <h3>Last Name: {profileUser.lastName}</h3>
      {/* Add more user details here as needed */}
    </div>
  );
};

export default UserProfileScreen;
