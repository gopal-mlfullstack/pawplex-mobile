import axios from "axios";

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
baseURL: API_BASE_URL,
headers: {
"Content-Type": "application/json",
},
});

// Attach access token to every request
API.interceptors.request.use(
(config) => {
const token = localStorage.getItem("access_token");


if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}

return config;
```

},
(error) => Promise.reject(error)
);

// Handle token refresh automatically
API.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;

```
// If token expired
if (error.response?.status === 401 && !originalRequest._retry) {
  originalRequest._retry = true;

  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const res = await axios.post(
      `${API_BASE_URL}/auth/token/refresh/`,
      { refresh: refreshToken }
    );

    const newAccess = res.data.access;

    // Save new token
    localStorage.setItem("access_token", newAccess);

    // Retry original request
    originalRequest.headers.Authorization = `Bearer ${newAccess}`;

    return API(originalRequest);
  } catch (refreshError) {
    // Logout if refresh fails
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";

    return Promise.reject(refreshError);
  }
}

return Promise.reject(error);


}
);

export default API;
