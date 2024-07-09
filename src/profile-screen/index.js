import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SetUser from "./set-user";
import { getUsers, updateUser as updateUserApi } from "../api";
import { AuthContext } from "../auth-context";
import AddDog from "./add-dog"; // Import AddDog component

const ProfileScreen = () => {
  const { user, updateUserInContext } = useContext(AuthContext);
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dogs: [], // Initialize dogs
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
        if (userId === user._id) {
          updateUserInContext(response.data);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDogAdded = () => {
    getUsers()
      .then((response) => {
        const userData = response.data.find((u) => u._id === userId);
        if (userData) {
          setProfileUser(userData);
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 order-1 md:order-1 p-4 md:mr-4 shadow-lg rounded-lg ">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Profile Information
          </h2>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">User Name: </span>
            {profileUser.username}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">First Name: </span>
            {profileUser.firstName}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Last Name: </span>
            {profileUser.lastName}
            <h3 className="text-xl font-bold mt-4 text-gray-800">Dogs</h3>
            <div className="flex flex-wrap">
              {profileUser.dogs.map((dog, index) => (
                <div key={index} className="mb-4 w-1/2 md:w-1/4 p-2">
                  <div className="font-semibold text-gray-700">{dog.name}</div>
                  <img
                    src={dog.imageUrl}
                    alt={dog.name}
                    className="mt-2 rounded-full w-24 h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {userId === user._id && (
            <div className="w-1/2 mt-4">
              <AddDog userId={user._id} onDogAdded={handleDogAdded} />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/4 order-2 md:order-2 p-4 shadow-lg rounded-lg mt-4 md:mt-0 ">
          <SetUser user={profileUser} updateUser={handleUpdateUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
