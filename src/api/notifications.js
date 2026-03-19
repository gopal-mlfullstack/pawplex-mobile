import API from "./axios";

export const getNotifications = () => API.get("api/notifications/");

export const getUnreadCount = () => API.get("api/notifications/unread-count/");

export const markRead = (id) => API.patch(`api/notifications/${id}/read/`);

export const markAllRead = () => API.post("api/notifications/mark-all-read/");
