import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        followUserInContext,
        unfollowUserInContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
