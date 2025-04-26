import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/labs';

export const getLabById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createLab = (result) => axios.post(`${BASE_URL}/`, { result });
export const assignLab = (id, patientSSN, medicalSSN) => axios.post(`${BASE_URL}/${id}/assign`, { patientSSN, medicalSSN });
