import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getPatientBySSN, getMedicalHistoryBySSN } from '../api/patients';

function AccountPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatientBySSN(user.ssn);
        setPatient(res.data);
        const historyRes = await getMedicalHistoryBySSN(user.ssn);
        setHistory(historyRes.data);
      } catch (err) {
        console.error('Error loading account data:', err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {user && patient && (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <div id="sidebar">
            <h2 style={{ marginBottom: '2px', padding: '10px 10px 0px 15px', color: '#27272b', textDecorationLine: 'underline' }}>
              {patient.name}
            </h2>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{patient.address}</p>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{patient.insurance}</p>

            <button onClick={() => navigate('/home')} className="fixed-button" type="button" style={{ marginTop: '60px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>Home</button>
            <button onClick={() => navigate('/labs')} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>Lab Tests</button>
            <button onClick={() => navigate('/claims')} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>Claims</button>
            <button onClick={() => navigate('/prescriptions')} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>Prescriptions</button>
          </div>

          <div style={{ flex: 1, backgroundColor: 'lightblue', padding: '20px', overflowY: 'auto' }}>
            <h1 style={{ color: '#27272b' }}>Account Information</h1>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>Insurance:</strong> {patient.insurance}</p>
            <button style={{ marginTop: '10px', marginBottom: '20px', padding: '8px 16px', borderRadius: '6px' }}>Edit Info</button>

            <h2 style={{ marginTop: '30px', color: '#27272b' }}>Medical History</h2>
            {history ? (
              <>
                <h4>Appointments</h4>
                {history.appointments.map((appt) => (
                  <p key={appt.id}>{new Date(appt.start_time).toLocaleString()} - {new Date(appt.end_time).toLocaleString()} @ {appt.location} ({appt.notes})</p>
                ))}

                <h4>Prescriptions</h4>
                {history.prescriptions.map((rx) => (
                  <p key={rx.id}>{rx.drug} ({rx.amount}) - {new Date(rx.date).toLocaleDateString()}</p>
                ))}

                <h4>Lab Results</h4>
                {history.labs.map((lab) => (
                  <p key={lab.id}>{lab.result} ({new Date(lab.ordered_at).toLocaleString()})</p>
                ))}

                <h4>Allergies</h4>
                {history.allergies.map((al, index) => (
                  <p key={index}>{al.allergen}</p>
                ))}

                <h4>Admin Notes</h4>
                {history.notes.map((note) => (
                  <p key={note.id}>{note.note} ({new Date(note.created_at).toLocaleString()})</p>
                ))}
              </>
            ) : (
              <p>Loading medical history...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AccountPage;