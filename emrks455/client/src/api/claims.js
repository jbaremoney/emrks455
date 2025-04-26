import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/claims';

export const createClaim = (patient_ssn, medical_ssn, amount, status) => axios.post(`${BASE_URL}/`, { patient_ssn, medical_ssn, amount, status });
export const updateClaimStatus = (id, status) => axios.put(`${BASE_URL}/${id}`, { status });
