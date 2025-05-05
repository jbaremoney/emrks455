import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getPatientBySSN } from '../api/patients';
import { getDoctorsBySSN } from '../api/medicalProffesional';

function PrescriptionsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [person, setPerson] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === 'patient') {
          const res = await getPatientBySSN(user.ssn);
          setPerson(res.data);
        } else if (user?.role === 'doctor') {
          const res = await getDoctorsBySSN(user.ssn);
          setPerson(res.data);
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {user && person ? (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <div id="sidebar">
            <h2 style={{ marginBottom: '2px', padding: '10px 10px 0px 15px', color: '#27272b', textDecorationLine: 'underline' }}>
              {person.name}
            </h2>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{person.address}</p>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>
              {user.role === 'patient' ? person.insurance : person.specialty}
            </p>

            <button onClick={() => navigate('/home')} className="fixed-button" type="button" style={{ marginTop: '60px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Home
            </button>
            <button onClick = {() => navigate("/lab-tests")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Lab Tests
            </button>
            <button onClick = {() => navigate("/claims")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Claims
            </button>
            <button className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Prescriptions
            </button>
          </div>

          <div style={{ flex: 1, padding: '20px', backgroundColor: 'lightblue', position: 'relative' }}>
            <input
              className="search-bar"
              placeholder="Search"
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 100)}
              style={{ width: '400px', backgroundColor: 'lightblue', border: 'white solid', borderRadius: '20px', paddingLeft: '8px', color: 'black' }}
            />
            {/* Placeholder for dynamic lab content */}
            <h1 style={{ paddingTop: '40px', color: '#27272b' }}>Prescriptions</h1>
          </div>
        </div>
      ) : (
        <p style={{ padding: '20px' }}>Loading user information...</p>
      )}
    </>
  );
}

export default PrescriptionsPage;
