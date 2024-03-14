import api from "../api";

const getProfile = async () => {
  const response = await api.get("/profile/me/");
  return response.data;
};

const updateProfile = async (username, profileData) => {
  const response = await api.patch(`/profile/update/${username}/`, profileData);
  return response.data;
};

const profileAPI = { getProfile, updateProfile };

export default profileAPI;
