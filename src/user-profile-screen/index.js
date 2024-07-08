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
    <div>
      <h1>User Profile</h1>
      <h2>User Name: {profileUser.username}</h2>
      <h3>First Name: {profileUser.firstName}</h3>
      <h3>Last Name: {profileUser.lastName}</h3>
      {userId !== user._id && (
        <button onClick={isFollowing ? handleUnfollow : handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfileScreen;
