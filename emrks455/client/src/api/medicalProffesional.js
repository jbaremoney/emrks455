import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/doctor'; 

export const authDoctor = () => axios.post(`${BASE_URL}/${auth}`, {username, password})
export const getAllDoctors = () => axios.get(`${BASE_URL}`);
export const getDoctorsBySSN = (ssn) => axios.get(`${BASE_URL}/${ssn}`);
export const createDoctor = (ssn, name, specialty, address) => axios.post(`${BASE_URL}`, { ssn, name, specialty, address });
export const updateDoctor = (ssn, name, specialty, address) => axios.put(`${BASE_URL}/${ssn}`, { name, specialty, address });
export const deleteDoctor = (ssn) => axios.delete(`${BASE_URL}/${ssn}`);
export const getAppointmentsForDoctor = (ssn) => axios.get(`${BASE_URL}/${ssn}/appointments`);

