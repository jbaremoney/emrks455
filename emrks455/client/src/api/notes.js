import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/notes'; 

export const createNote = (patientSSN, medicalSSN, note) => axios.post(`${BASE_URL}`, { patientSSN, medicalSSN, note });
