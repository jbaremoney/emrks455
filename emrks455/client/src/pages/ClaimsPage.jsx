import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getPatientBySSN, getAllPatients, getClaimsByPatient } from '../api/patients';
import { getDoctorsBySSN } from '../api/medicalProffesional';
import { createClaim, updateClaimStatus } from '../api/claims';

function ClaimsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [person, setPerson] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [claimAmount, setClaimAmount] = useState('');
  const [claimStatus, setClaimStatus] = useState('');
  const [claims, setClaims] = useState([]);
  const [newClaim, setNewClaim] = useState({ amount: '', status: 'Pending' });
  const [patientClaims, setPatientClaims] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === 'patient') {
          const res = await getPatientBySSN(user.ssn);
          setPerson(res.data);
          const claimRes = await getClaimsByPatient(user.ssn);
          setClaims(claimRes.data);
        } else if (user?.role === 'doctor') {
          const res = await getDoctorsBySSN(user.ssn);
          setPerson(res.data);
          const allPatients = await getAllPatients();
          setSearchResults(allPatients.data);
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
      }
    };

    fetchData();
  }, [user]);

  const fetchClaims = async (ssn) => {
    try {
      const res = await getClaimsByPatient(ssn);
      setPatientClaims(res.data);
    } catch (err) {
      console.error('Error fetching claims:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClaim(selectedPatient.ssn, user.ssn, claimAmount, claimStatus);
      alert('Claim created!');
      setClaimAmount('');
      setClaimStatus('');
      const updatedClaims = await getClaimsByPatient(selectedPatient.ssn);
      setClaims(updatedClaims.data);
    } catch (err) {
      console.error('Error creating claim:', err);
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

            <button onClick={() => navigate('/home')} className="fixed-button" style={{ marginTop: '60px', marginLeft: '10px', width: '200px' }}>
              Home
            </button>
            <button onClick={() => navigate('/lab-tests')} className="fixed-button" style={{ marginTop: '5px', marginLeft: '10px', width: '200px' }}>
              Lab Tests
            </button>
            <button className="fixed-button" style={{ marginTop: '5px', marginLeft: '10px', width: '200px' }}>
              Claims
            </button>
            <button onClick={() => navigate("/prescriptions")} className="fixed-button" style={{ marginTop: '5px', marginLeft: '10px', width: '200px' }}>
              Prescriptions
            </button>
          </div>

          <div style={{ flex: 1, backgroundColor: 'lightblue', padding: '20px', position: 'relative' }}>
            {user.role === 'doctor' && (
              <>
                <input
                  className="search-bar"
                  placeholder="Search for a patient"
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 100)}
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
                 <h1 style={{ paddingTop: '40px', color: '#27272b' }}>Claims</h1>

                {showResults && (
                  <div style={{
                    position: 'absolute',
                    marginLeft: '25px',
                    top: '80px',
                    width: '400px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    zIndex: 1,
                  }}>
                    {searchResults
                      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((p, index) => (
                        <div key={index} onMouseDown={async () => {
                          setSelectedPatient(p);
                          const claimRes = await getClaimsByPatient(p.ssn);
                          setClaims(claimRes.data);
                          fetchClaims(p.ssn);
                          setShowResults(false);
                        }} style={{
                          padding: '8px',
                          borderBottom: '1px solid #eee',
                          cursor: 'pointer'
                        }}>
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
                {selectedPatient && (
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', width: '500px' }}>
                        <h3>Manage Claims for {selectedPatient.name}</h3>

                        {/* Create New Claim */}
                        <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newClaim.amount}
                            onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
                            required
                            style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
                        />
                        <select
                            value={newClaim.status}
                            onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value })}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="denied">Denied</option>
                        </select>
                        <button type="submit" style={{ marginBottom: '20px' }}>Create Claim</button>
                        </form>

                        {/* Existing Claims with Update Option */}
                        <h4>Existing Claims</h4>
                        {patientClaims.length === 0 ? (
                        <p>No claims found.</p>
                        ) : (
                        patientClaims.map((claim) => (
                            <div key={claim.id} style={{ marginBottom: '15px' }}>
                            <p><strong>ID:</strong> {claim.id}</p>
                            <p><strong>Amount:</strong> ${claim.amount}</p>
                            <p><strong>Status:</strong> {claim.status}</p>
                            <select
                                value={claim.status}
                                onChange={(e) => {
                                const updatedClaims = patientClaims.map(c =>
                                    c.id === claim.id ? { ...c, status: e.target.value } : c
                                );
                                setPatientClaims(updatedClaims);
                                }}
                                style={{ marginRight: '10px' }}
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="denied">Denied</option>
                            </select>
                            <button
                                onClick={async () => {
                                try {
                                    await updateClaimStatus(claim.id, claim.status);
                                    alert('Claim status updated');
                                } catch (err) {
                                    console.error('Failed to update claim:', err);
                                }
                                }}
                                style={{ padding: '5px 10px' }}
                            >
                                Submit Status Update
                            </button>
                            </div>
                        ))
                        )}
                        <button type="button" onClick={() => setSelectedPatient(null)} style={{ marginTop: '10px' }}>Close</button>
                    </div>
                    )}

              </>
            )}

            {user.role === 'patient' && (
              <div style={{ marginTop: '40px', paddingLeft: '20px' }}>
                <h1>Claims</h1>
                {claims.length === 0 ? (
                  <p>No claims found.</p>
                ) : (
                  claims.map((claim, index) => (
                    <div key={index} style={{
                      backgroundColor: 'white',
                      marginBottom: '10px',
                      padding: '10px',
                      borderRadius: '6px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                      <p><strong>Amount:</strong> ${claim.amount}</p>
                      <p><strong>Status:</strong> {claim.status}</p>
                    </div>
                  ))
                )}
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

export default ClaimsPage;
