import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SetUser from "./set-user";
import FetchLocation from "../location";
import {
  getUsers,
  updateUser as updateUserApi,
  followUser,
  unfollowUser,
} from "../api";
import { AuthContext } from "../auth-context";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
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
    <div>
      <h1>Profile Screen</h1>
      <h2>User Name: {profileUser.username}</h2>
      <h3>First Name: {profileUser.firstName}</h3>
      <h3>Last Name: {profileUser.lastName}</h3>
      <h3>Location: {profileUser.location}</h3>
      {userId !== user._id && (
        <button onClick={isFollowing ? handleUnfollow : handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
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
