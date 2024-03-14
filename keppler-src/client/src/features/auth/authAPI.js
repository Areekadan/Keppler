import api from "../api";

const register = async (userData) => {
  const response = await api.post("auth/users/", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post("/auth/jwt/create/", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const activate = async (userData) => {
  const response = await api.post("/auth/users/activation/", userData);
  return response.data;
};

const authAPI = { register, login, logout, activate };

export default authAPI;
