import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SetUser from "./set-user";
import {
  getUsers,
  updateUser as updateUserApi,
  followUser,
  unfollowUser,
} from "../api";
import { AuthContext } from "../auth-context";

const ProfileScreen = () => {
  const { user, updateUserInContext } = useContext(AuthContext);
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({
    id: "",
    username: "",
    password: "",
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

  const handleFollow = async () => {
    try {
      await followUser(user._id, profileUser._id);
      setProfileUser((prevUser) => ({
        ...prevUser,
        followedUsers: [...prevUser.followedUsers, profileUser._id],
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(user._id, profileUser._id);
      setProfileUser((prevUser) => ({
        ...prevUser,
        followedUsers: prevUser.followedUsers.filter(
          (id) => id !== profileUser._id
        ),
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = user?.followedUsers?.includes(profileUser._id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 order-1 md:order-1 p-4 md:mr-4 shadow-lg rounded-lg bg-transparent">
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
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
        </div>
        <div className="w-full md:w-1/4 order-2 md:order-2 p-4 shadow-lg rounded-lg mt-4 md:mt-0">
          <SetUser user={profileUser} updateUser={handleUpdateUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
