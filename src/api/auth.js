import API from "./axios";

// Register
export const register = (data) => {
  return API.post("/auth/register/", data);
};

// Login
export const login = async (data) => {
  const res = await API.post("/auth/login/", data);

  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);

  return res;
};

// Get profile
export const getProfile = () => {
  return API.get("/auth/me/");
};

// Update profile
export const updateProfile = (data) => {
  return API.put("/auth/me/", data);
};

// Change password
export const changePassword = (data) => {
  return API.post("/auth/change-password/", data);
};
