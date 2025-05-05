import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getPatientBySSN, getMedicalHistoryBySSN, updatePatient } from '../api/patients';
import MedicalHistoryPopup from './MedicalHistory';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

function AccountPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', address: '', insurance: '', email: '', password: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatientBySSN(user.ssn);
        setPatient(res.data);
        setEditForm(res.data);

        const historyRes = await getMedicalHistoryBySSN(user.ssn);
        setMedicalHistory(historyRes.data);
      } catch (err) {
        console.error('Error loading account info:', err);
      }
    };
    fetchData();
  }, [user]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(user.ssn, editForm.name, editForm.address, editForm.insurance, editForm.email, editForm.password);
      setShowEditPopup(false);
      const updated = await getPatientBySSN(user.ssn);
      setPatient(updated.data);
    } catch (err) {
      console.error('Failed to update patient:', err);
    }
  };

  return (
    <>
      {patient && (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <div id="sidebar">
            <h2 style={{ marginBottom: '2px', padding: '10px 10px 0px 15px', color: '#27272b', textDecorationLine: 'underline' }}>{patient.name}</h2>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{patient.address}</p>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{patient.insurance}</p>

            <button onClick={() => navigate('/home')} className="fixed-button" type="button" style={{ marginTop: '60px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Home
            </button>
            <button onClick={() => navigate('/labs')} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Lab Tests
            </button>
            <button onClick={() => navigate('/claims')} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Claims
            </button>
            <button onClick={() => navigate('/prescriptions')} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Prescriptions
            </button>
          </div>

          <div style={{ flex: 1, backgroundColor: 'lightblue', padding: '40px', overflowY: 'auto' }}>
            <h1>Account Information</h1>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>Insurance:</strong> {patient.insurance}</p>
            <p><strong>Email:</strong> {patient.email}</p>

            <button onClick={() => setShowEditPopup(true)} style={{ marginTop: '10px', marginBottom: '20px', padding: '8px 16px', borderRadius: '6px' }}>Edit Info</button>

            <h2>Medical History</h2>
            {medicalHistory ? (
              <div>
                <h4>Appointments</h4>
                {medicalHistory.appointments.map((appt) => (
                  <p key={appt.id}>{new Date(appt.start_time).toLocaleString()} - {new Date(appt.end_time).toLocaleString()} @ {appt.location} ({appt.notes})</p>
                ))}

                <h4>Prescriptions</h4>
                {medicalHistory.prescriptions.map((rx) => (
                  <p key={rx.id}>{rx.drug} ({rx.amount}) - {new Date(rx.date).toLocaleDateString()}</p>
                ))}

                <h4>Lab Results</h4>
                {medicalHistory.labs.map((lab) => (
                  <p key={lab.id}>{lab.result} ({new Date(lab.ordered_at).toLocaleString()})</p>
                ))}

                <h4>Admin Notes</h4>
                {medicalHistory.notes.map((note) => (
                  <p key={note.id}>{note.note} ({new Date(note.created_at).toLocaleString()})</p>
                ))}

                <h4>Allergies</h4>
                {medicalHistory.allergies.map((a, index) => (
                  <p key={index}>{a.allergen}</p>
                ))}
              </div>
            ) : (
              <p>Loading medical history...</p>
            )}
          </div>

          {showEditPopup && (
            <div style={overlayStyle}>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>
                <h3>Edit Information</h3>
                <form onSubmit={handleEditSubmit}>
                  <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" required style={{ marginBottom: '10px', width: '100%' }} />
                  <input type="text" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} placeholder="Address" required style={{ marginBottom: '10px', width: '100%' }} />
                  <input type="text" value={editForm.insurance} onChange={(e) => setEditForm({ ...editForm, insurance: e.target.value })} placeholder="Insurance" required style={{ marginBottom: '10px', width: '100%' }} />
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" required style={{ marginBottom: '10px', width: '100%' }} />
                  <input type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} placeholder="Password" required style={{ marginBottom: '10px', width: '100%' }} />
                  <button type="submit" style={{ marginRight: '10px' }}>Save</button>
                  <button type="button" onClick={() => setShowEditPopup(false)}>Cancel</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AccountPage;
