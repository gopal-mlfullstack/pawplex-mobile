import API from "./axios";

export const getStats = () => API.get("/api/dashboard/stats/");

export const getCharts = () => API.get("/api/dashboard/charts/");

export const getActivity = () => API.get("/api/dashboard/activity/");
