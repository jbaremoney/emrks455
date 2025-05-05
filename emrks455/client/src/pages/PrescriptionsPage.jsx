import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getPatientBySSN, getPresctiptionsByPatient } from '../api/patients';
import { getDoctorsBySSN } from '../api/medicalProffesional';
import { createPrescription, getPrescriptionById, updatePrescription } from '../api/prescriptions';


function PrescriptionsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [person, setPerson] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionName, setPrescriptionName] = useState('');
  const [prescriptionDose, setPrescriptionDose] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({name: '', dose: '', date: ''});
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === 'patient') {
          const res = await getPatientBySSN(user.ssn);
          setPerson(res.data);
          const prescRes = await getPresctiptionsByPatient(user.ssn);
          setPrescriptions(prescRes.data);
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

  const fetchPrescription = async (ssn) => {
    try {
      const res = await getPresctiptionsByPatient(ssn);
      setPatientPrescriptions(res.data);
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription(selectedPatient.ssn, user.ssn, prescriptionName, prescriptionDose, prescriptionDate);
      alert('Prescription created!');
      setPrescriptionName('');
      setPrescriptionDose('');
      setPrescriptionDate('');
      const updatedPrescriptions = await getPresctiptionsByPatient(selectedPatient.ssn);
      setPrescriptions(updatedPrescriptions.data);
    } catch (err) {
      console.error('Error creating prescription:', err);
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
                 <h1 style={{ paddingTop: '40px', color: '#27272b' }}>Prescriptions</h1>
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
                          const prescRes = await getPresctiptionsByPatient(p.ssn);
                          setPrescriptions(prescRes.data);
                          fetchPrescription(p.ssn);
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
                        <h3>Manage Prescriptions for {selectedPatient.name}</h3>

                        {/* Create New Prescription */}
                        <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Prescription Name"
                            value={newPrescription.name}
                            onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
                            required
                            style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
                        />
                        <input
                            type="text"
                            placeholder="Prescription Dose (ex: 500 mg)"
                            value={newPrescription.dose}
                            onChange={(e) => setNewPrescription({ ...newPrescription, dose: e.target.value })}
                            required
                            style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
                        />
                        <input
                            type="text"
                            placeholder="Prescription Date (YYYY-MM-DD)"
                            value={newPrescription.date}
                            onChange={(e) => setNewPrescription({ ...newPrescription, date: e.target.value })}
                            required
                            style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
                        />
                        <button type="submit" style={{ marginBottom: '20px' }}>Create Prescription</button>
                        </form>

                        {/* Existing Prescriptions with Update Option */}
                        <h4>Existing Prescriptions</h4>
                        {patientPrescriptions.length === 0 ? (
                        <p>No prescriptions found.</p>
                        ) : (
                        patientPrescriptions.map((prescription) => (
                            <div key={prescription.id} style={{ marginBottom: '15px' }}>
                              <p><strong>ID:</strong> {prescription.id}</p>
                              <p><strong>Name:</strong> {prescription.name}</p>
                              <p><strong>Dose:</strong> {prescription.dose}</p>
                              <p><strong>Date:</strong>{prescription.date}</p>
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
                <h1>Prescriptions</h1>
                {prescriptions.length === 0 ? (
                  <p>No prescriptions found.</p>
                ) : (
                  prescriptions.map((prescription, index) => (
                    <div key={index} style={{
                      backgroundColor: 'white',
                      marginBottom: '10px',
                      padding: '10px',
                      borderRadius: '6px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                      <p><strong>ID:</strong> {prescription.id}</p>
                      <p><strong>Name:</strong> {prescription.name}</p>
                      <p><strong>Dose:</strong> {prescription.dose}</p>
                      <p><strong>Date:</strong>{prescription.date}</p>
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

export default PrescriptionsPage;
