import axios from 'axios';

const BASE_URL = 'http://localhost:8020/api/v1';

// GET all reservations
export const getAllReservations = async () => {
  return await axios.get(`${BASE_URL}/reserva/`);
};

// GET reservation by ID
export const getReservationById = async (id : any  ) => {
  return await axios.get(`${BASE_URL}/reserva/${id}`);
};

// POST new reservation
export const createReservation = async (data : any ) => {
  return await axios.post(`${BASE_URL}/reserva/insert`, data);
};

// PUT update reservation
export const updateReservation = async (data : any ) => {
  return await axios.put(`${BASE_URL}/reserva/update`, data);
};

// DELETE reservation
export const deleteReservation = async (id : number ) => {
  return await axios.delete(`${BASE_URL}/reserva/delete/${id}`);
};

// GET all Cities
export const getAllCities = async () => {
  return await axios.get(`${BASE_URL}/ciudad/`);
};

// GET all Services
export const getAllServices = async () => {
  return await axios.get(`${BASE_URL}/servicio/`);
};


