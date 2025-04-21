import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/patients')
      .then((res) => setPatients(res.data))
      .catch((err) => console.error('Failed to fetch patients:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Patient List</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.ssn}>
              <strong>{patient.name}</strong> — {patient.address} — {patient.insurance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientList;
