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

export const addTuit = (tuitText, userId, imageFile) => {
  const formData = new FormData();
  formData.append("tuit", tuitText);
  formData.append("userId", userId);
  if (imageFile) {
    formData.append("image", imageFile);
  }

  console.log("Sending add tuit request:", formData);
  return axios
    .post("/api/tuits", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
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

export const addDog = (userId, name, imageFile) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("name", name);
  formData.append("image", imageFile);

  return axios
    .post("/api/users/add-dog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      console.error("Error in addDog API:", error.response?.data);
      throw error;
    });
};
