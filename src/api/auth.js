import API from "./axios";

// Register user
export const register = async (data) => {
  const res = await API.post("/auth/register/", data);
  return res.data;
};

// Login user
export const login = async (data) => {
  const res = await API.post("/auth/login/", data);

  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);

  return res.data;
};

// Get logged-in user
export const getProfile = async () => {
  const res = await API.get("/auth/me/");
  return res.data;
};

// Update user profile
export const updateProfile = async (data) => {
  const res = await API.put("/auth/me/", data);
  return res.data;
};

// Change password
export const changePassword = async (data) => {
  const res = await API.post("/auth/change-password/", data);
  return res.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};
