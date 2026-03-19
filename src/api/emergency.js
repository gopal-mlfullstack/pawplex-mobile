import API from "./axios";

export const triggerSOS = (data) => API.post("/api/emergency/sos/", data);

export const getSOSList = () => API.get("/api/emergency/sos/list/");

export const resolveSOS = (id) =>
  API.patch(`/api/emergency/sos/${id}/resolve/`);

export const getNearbyVets = (lat, lng) =>
  API.get("/api/emergency/nearby/", { params: { lat, lng } });

export const getContacts = () => API.get("/api/emergency/contacts/");

export const createContact = (data) =>
  API.post("/api/emergency/contacts/", data);
