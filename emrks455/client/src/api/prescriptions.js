import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/prescriptions';

export const getPrescriptionById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createPrescription = (drug, amount) => axios.post(`${BASE_URL}/`, { drug, amount });
export const assignPrescription = (id, patientSSN, medicalSSN) => axios.post(`${BASE_URL}/${id}/assign`, { patientSSN, medicalSSN });

