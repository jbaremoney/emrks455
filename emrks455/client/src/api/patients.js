import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/patients'; 

export const authPatient = (email, password) => axios.post(`${BASE_URL}/auth`,{email, password});
export const getAllPatients = () => axios.get(`${BASE_URL}`);
export const getPatientBySSN = (ssn) => axios.get(`${BASE_URL}/${ssn}`);
export const createPatient = (ssn, name, address, insurance, email, password) => axios.post(`${BASE_URL}`, { ssn, name, address, insurance, email, password });
export const updatePatient = (ssn, name, address, insurance, email, password) => axios.put(`${BASE_URL}/${ssn}`, { name, address, insurance, email, password });
export const deletePatient = (ssn) => axios.delete(`${BASE_URL}/${ssn}`);

export const getAllergiesByPatient = (ssn) => axios.get(`${BASE_URL}/${ssn}/allergies`);
export const addAllergy = (ssn, allergen) => axios.post(`${BASE_URL}/${ssn}/allergies`, {allergen});
export const deleteAllergy = (ssn, allergen) => axios.delete(`${BASE_URL}/${ssn}/allergies/${allergen}`);

export const getAppointmentsForPatient = (ssn) => axios.get(`${BASE_URL}/${ssn}/appointments`);

export const getClaimsByPatient = (ssn) => axios.get(`${BASE_URL}/${ssn}/claims`);

export const getMedicalHistoryBySSN = (ssn) => axios.get(`${BASE_URL}/${ssn}/history`);

export const getLabsByPatientSSN = (ssn) => axios.get(`${BASE_URL}/${ssn}/labs`);

export const getNotesByPatientSSN = (ssn) => axios.get(`${BASE_URL}/${ssn}/notes`);

export const getPresctiptionsByPatient = (ssn) => axios.get(`${BASE_URL}/${ssn}/prescriptions`);
