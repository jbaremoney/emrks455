import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getPatientBySSN, getAllPatients, getLabsByPatientSSN } from '../api/patients';
import { getDoctorsBySSN } from '../api/medicalProffesional';
import { createLab, assignLab } from '../api/labs';

function LabTestsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [person, setPerson] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [labResult, setLabResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === 'patient') {
          const res = await getPatientBySSN(user.ssn);
          setPerson(res.data);
          const labRes = await getLabsByPatientSSN(user.ssn);
          const sortedLabs = labRes.data.sort((a, b) => new Date(b.ordered_at) - new Date(a.ordered_at));
          setLabTests(sortedLabs);
        } else if (user?.role === 'doctor') {
          const res = await getDoctorsBySSN(user.ssn);
          setPerson(res.data);
          const patientRes = await getAllPatients();
          setSearchResults(patientRes.data);
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const labRes = await createLab(labResult);
      await assignLab(labRes.data.id, selectedPatient.ssn, user.ssn);
      alert('Lab assigned!');
      setSelectedPatient(null);
      setLabResult('');
    } catch (err) {
      console.error('Error assigning lab:', err);
    }
  };

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
            <button className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Lab Tests
            </button>
            <button onClick={() => navigate("/claims")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Claims
            </button>
            <button onClick={() => navigate("/prescriptions")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Prescriptions
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue', flex: 1, padding: '20px', overflowY: 'auto' }}>
            <input
              className="search-bar"
              placeholder="Search"
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '400px',
                backgroundColor: 'lightblue',
                border: 'white solid',
                borderRadius: '20px',
                paddingLeft: '8px',
                color: 'black',
                margin: '20px'
              }}
            />
            <h1 style={{ paddingTop: '40px', color: '#27272b' }}>Lab Tests</h1>

            {showResults && user.role === 'doctor' && (
              <div
                style={{
                  position: 'absolute',
                  marginLeft: '25px',
                  top: '60px',
                  width: '400px',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  zIndex: 1,
                }}
              >
                {searchResults
                  .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((p, index) => (
                    <div
                      key={index}
                      onMouseDown={() => {
                        setSelectedPatient(p);
                        setShowResults(false);
                      }}
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                      }}
                    >
                      {p.name} — {p.insurance}
                    </div>
                  ))}
              </div>
            )}
            {!showResults && searchTerm.trim() === '' && (
                <div style={{ marginTop: '10px', marginLeft: '25px', color: '#555' }}>
                    <em>Search for a patient</em>
                </div>
                )}
            {user.role === 'doctor' && selectedPatient && (
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', width: '400px' }}>
                <h3>Assign Lab to {selectedPatient.name}</h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    placeholder="Enter lab result"
                    value={labResult}
                    onChange={(e) => setLabResult(e.target.value)}
                    required
                    style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '10px' }}
                  />
                  <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
                  <button type="button" onClick={() => setSelectedPatient(null)}>Cancel</button>
                </form>
              </div>
            )}

            {user.role === 'patient' && (
              <div style={{ paddingTop: '40px', color: '#27272b', paddingLeft: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                  {labTests.length === 0 ? (
                    <p>No lab tests found.</p>
                  ) : (
                    labTests.map((lab, index) => (
                      <div key={index} style={{
                        backgroundColor: 'white',
                        marginBottom: '10px',
                        padding: '10px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}>
                        <p><strong>Result:</strong> {lab.result}</p>
                        <p><strong>Ordered At:</strong> {new Date(lab.ordered_at).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        <p style={{ padding: '20px' }}>Loading user information...</p>
      )}
    </>
  );
}

export default LabTestsPage;
