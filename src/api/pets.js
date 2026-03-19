import API from "./axios";

export const getPets = () => API.get("/api/pets/");

export const getPet = (id) => API.get(`/api/pets/${id}/`);

export const createPet = (data) => API.post("/api/pets/", data);

export const updatePet = (id, data) => API.patch(`/api/pets/${id}/`, data);

export const deletePet = (id) => API.delete(`/api/pets/${id}/`);

export const getPetQR = (id) => API.get(`/api/pets/${id}/qr/`);

export const getHealthCard = (id) => API.get(`/api/pets/${id}/health_card/`);

export const getVaccinations = (id) => API.get(`/api/pets/${id}/vaccinations/`);

export const addVaccination = (id, data) =>
  API.post(`/api/pets/${id}/vaccinations/`, data);

export const getMedicalRecords = (id) =>
  API.get(`/api/pets/${id}/medical-records/`);

export const addMedicalRecord = (id, data) =>
  API.post(`/api/pets/${id}/medical-records/`, data);
