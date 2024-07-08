import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};

export const updateUser = (userId, updatedUser) => {
  return axios.put(`/api/users/${userId}`, updatedUser).catch((error) => {
    console.error("Error in updateUser API:", error.response?.data);
    throw error;
  });
};

export const fetchYelpData = async (location, term) => {
  const response = await axios.get(`/api/yelp`, {
    params: { term, location },
  });
  return response.data.businesses;
};

// Tuits API
export const getTuits = () => {
  return axios.get("/api/tuits");
};

export const addTuit = (tuitText, userId) => {
  const requestBody = { tuit: tuitText, userId: userId };
  console.log("Sending add tuit request:", requestBody);
  return axios.post("/api/tuits", requestBody).catch((error) => {
    console.error("Error in addTuit API:", error.response?.data);
    throw error;
  });
};

export const deleteTuit = (tuitId) => {
  return axios.delete(`/api/tuits/${tuitId}`).catch((error) => {
    console.error("Error in deleteTuit API:", error.response?.data);
    throw error;
  });
};

export const followUser = (userId, followUserId) => {
  return axios
    .post("/api/users/follow", { userId, followUserId })
    .catch((error) => {
      console.error("Error in followUser API:", error.response?.data);
      throw error;
    });
};

export const unfollowUser = (userId, unfollowUserId) => {
  return axios
    .post("/api/users/unfollow", { userId, unfollowUserId })
    .catch((error) => {
      console.error("Error in unfollowUser API:", error.response?.data);
      throw error;
    });
};
