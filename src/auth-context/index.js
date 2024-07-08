// auth-context.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const followUserInContext = (followUserId) => {
    setUser((prevUser) => ({
      ...prevUser,
      followedUsers: [...prevUser.followedUsers, followUserId],
    }));
  };

  const unfollowUserInContext = (unfollowUserId) => {
    setUser((prevUser) => ({
      ...prevUser,
      followedUsers: prevUser.followedUsers.filter(
        (id) => id !== unfollowUserId
      ),
    }));
  };

  const updateUserInContext = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        followUserInContext,
        unfollowUserInContext,
        updateUserInContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
