import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUsers, followUser, unfollowUser } from "../api";
import { AuthContext } from "../auth-context";

const UserProfileScreen = () => {
  const { user, followUserInContext, unfollowUserInContext } =
    useContext(AuthContext);
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({
    id: "",
    username: "",
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
    }
  }, [userId]);

  const handleFollow = async () => {
    try {
      await followUser(user._id, profileUser._id);
      followUserInContext(profileUser._id);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(user._id, profileUser._id);
      unfollowUserInContext(profileUser._id);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = user?.followedUsers?.includes(profileUser._id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 order-2 md:order-1 p-4 md:mr-4 shadow-lg rounded-lg bg-transparent">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="mb-2">
            <span className="font-semibold">User Name: </span>
            {profileUser.username}
          </div>
          <div className="mb-2">
            <span className="font-semibold">First Name: </span>
            {profileUser.firstName}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Last Name: </span>
            {profileUser.lastName}
          </div>
          {userId !== user._id && (
            <button
              className="cute-button mb-4"
              onClick={isFollowing ? handleUnfollow : handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
          <div>
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
        </div>
        <div className="w-full md:w-1/4 order-1 md:order-2 p-4 shadow-lg rounded-lg mt-4 md:mt-0"></div>
      </div>
    </div>
  );
};

export default UserProfileScreen;
