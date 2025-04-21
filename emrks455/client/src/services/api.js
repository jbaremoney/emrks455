import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchPatients = async () => {
  const response = await axios.get(`${API_BASE_URL}/patients`);
  return response.data;
};
