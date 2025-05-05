import React from 'react';

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

function MedicalHistoryPopup({ history, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto', minWidth: '500px' }}>
        <h3>Medical History</h3>

        <h4>Appointments</h4>
        {history.appointments.map((appt) => (
          <p key={appt.id}>
            {new Date(appt.start_time).toLocaleString()} - {new Date(appt.end_time).toLocaleString()} @ {appt.location} ({appt.notes})
          </p>
        ))}

        <h4>Prescriptions</h4>
        {history.prescriptions.map((rx) => (
          <p key={rx.id}>
            {rx.drug} ({rx.amount}) - {new Date(rx.date).toLocaleDateString()}
          </p>
        ))}

        <h4>Lab Results</h4>
        {history.labs.map((lab) => (
          <p key={lab.id}>
            {lab.result} ({new Date(lab.ordered_at).toLocaleString()})
          </p>
        ))}

        <h4>Admin Notes</h4>
        {history.notes.map((note) => (
          <p key={note.id}>
            {note.note} ({new Date(note.created_at).toLocaleString()})
          </p>
        ))}

        <h4>Allergies</h4>
        {Array.isArray(history.allergies) && history.allergies.length > 0 ? (
        history.allergies.map((allergy, index) => (
            <p key={index}>{allergy.allergen}</p>
        ))
        ) : (
        <p>No known allergies.</p>
        )}


        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicalHistoryPopup;
