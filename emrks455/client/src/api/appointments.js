import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/appointments';

export const getAppointmentById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createAppointment = (startTime, endTime, location, notes, patientSSN, doctorSSN) => axios.post(`${BASE_URL}/`, { startTime, endTime, location, notes, patientSSN, doctorSSN });
export const updateAppointment = (id, startTime, endTime, location, notes) => axios.put(`${BASE_URL}/${id}`, { startTime, endTime, location, notes });
export const deleteAppointment = (id) => axios.delete(`${BASE_URL}/${id}`); 