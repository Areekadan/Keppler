import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const tokenInfo = JSON.parse(localStorage.getItem("user"));
    const accessToken = tokenInfo?.access;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedTokenInfo = JSON.parse(localStorage.getItem("user"));
      const refreshToken = storedTokenInfo?.refresh;
      if (refreshToken) {
        try {
          const refreshResponse = await api.post("/auth/jwt/refresh/", {
            refresh: refreshToken,
          });
          const { access } = refreshResponse.data;
          localStorage.setItem(
            "user",
            JSON.stringify({ ...storedTokenInfo, access })
          );
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Unable to refresh token", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
