import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';


import { getPatientBySSN, getAppointmentsForPatient, getAllPatients, getMedicalHistoryBySSN, addAllergy } from '../api/patients';
import { deleteAppointment, createAppointment } from '../api/appointments';
import { getAllDoctors, getAppointmentsForDoctor, getDoctorsBySSN } from '../api/medicalProffesional';
import { createClaim } from '../api/claims';
import { createPrescription, assignPrescription } from '../api/prescriptions';
import { createLab, assignLab } from '../api/labs';
import { createNote } from '../api/notes';
import MedicalHistoryPopup from './MedicalHistory';


import { useAuth } from './AuthContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


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


function HomePage() {
  const { user, setUser  } = useAuth();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [doctorResults, setDoctorResults] = useState([]);
  const [selectedPerson, setselectedPerson] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    startTime: '',
    endTime: '',
    location: '',
    notes: '',
  });
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [showLabForm, setShowLabForm] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [prescriptionForm, setPrescriptionForm] = useState({ drug: '', amount: '' });
  const [labResult, setLabResult] = useState('');
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showAllergyForm, setShowAllergyForm] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [allergen, setAllergen] = useState('');

  
  const viewMedicalHistory = async (patientSSN) => {
    try {
      const res = await getMedicalHistoryBySSN(patientSSN);
      setMedicalHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch medical history:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(selectedAppointment.id);
      setSelectedAppointment(null);

      const apptRes = await getAppointmentsForPatient(user.ssn);
      const formattedEvents = apptRes.data.map(appt => ({
        id: appt.id, // ✅ include this for deletion
        title: appt.notes || 'Appointment',
        start: new Date(appt.start_time),
        end: new Date(appt.end_time),
        location: appt.location,
        notes: appt.notes,
      }));
      setAppointments(formattedEvents);
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === 'patient') {
          const res = await getPatientBySSN(user.ssn);
          setPerson(res.data);
  
          const apptRes = await getAppointmentsForPatient(user.ssn);
          const formattedEvents = apptRes.data.map(appt => ({
            id: appt.id,
            title: appt.notes || 'Appointment',
            start: new Date(appt.start_time),
            end: new Date(appt.end_time),
            location: appt.location,
            notes: appt.notes,
          }));
          setAppointments(formattedEvents);
  
          const doctorRes = await getAllDoctors();
          setDoctorResults(doctorRes.data);
        } else if (user?.role === 'doctor') {
          const res = await getDoctorsBySSN(user.ssn);
          setPerson(res.data);

          const apptRes = await getAppointmentsForDoctor(user.ssn);
          const formattedEvents = apptRes.data.map(appt => ({
            id: appt.id,
            title: appt.notes || 'Appointment',
            start: new Date(appt.start_time),
            end: new Date(appt.end_time),
            location: appt.location,
            notes: appt.notes,
          }));
          setAppointments(formattedEvents);
  
          const patientRes = await getAllPatients();
          setDoctorResults(patientRes.data); // reuse existing variable for simplicity
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
  
    fetchData();
  }, [user]);
  
  return (
    <>
      {(user?.role === 'patient' || user?.role === 'doctor') && person ? (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <div id="sidebar">
            <h2 style={{ marginBottom: '2px', padding: '10px 10px 0px 15px', color: '#27272b', textDecorationLine: 'underline' }}>
              {person.name}
            </h2>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{person.address}</p>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>
              {user.role === 'patient' ? person.insurance : person.specialty}
            </p>


            <button className="fixed-button" type="button" style={{ backgroundColor: "grey", marginTop: '60px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Home
            </button>
            <button onClick = {() => navigate("/lab-tests")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Lab Tests
            </button>
            <button onClick = {() => navigate("/claims")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Claims
            </button>
            <button onClick = {() => navigate("/prescriptions")} className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Prescriptions
            </button>
            {user?.role === 'patient' && (
              <button
                onClick={() => navigate("/account")}
                className="fixed-button"
                type="button"
                style={{
                  marginTop: '5px',
                  marginLeft: '10px',
                  padding: '5px',
                  borderRadius: '8px',
                  width: '200px'
                }}
              >
                Account
              </button>
            )}
            <button
                onClick={() => {
                    setUser(null);       // Clear auth context
                    navigate('/');       // Go to login page
                }}
                className="fixed-button"
                type="button"
                style={{
                    backgroundColor: "red",
                    marginTop: '300px',
                    marginLeft: '10px',
                    padding: '5px',
                    borderRadius: '8px',
                    width: '200px'
                }}
                >
                Logout
                </button>

          </div>

          <div style={{ flex: 1, padding: '20px', backgroundColor: 'lightblue', position: 'relative' }}>
            <input
              className="search-bar"
              placeholder="Search"
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 100)}
            />

            {showResults && (
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
                {doctorResults.map((doctor, index) => (
                  <div
                    key={index}
                    onClick={() => setselectedPerson(doctor)}
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                    }}
                  >
                    {doctor.name} — {doctor.specialty}
                  </div>
                ))}
              </div>
            )}

            <h1 style={{ paddingTop: '40px', color: '#27272b' }}>Calendar</h1>

            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              views={['week']}
              defaultView="week"
              toolbar={false}
              onSelectEvent={(event) => setSelectedAppointment(event)}
              style={{
                height: 600,
                margin: '10px 10px 10px 20px',
                backgroundColor: 'white',
                color: 'gray',
                borderRadius: '8px',
              }}
            />

            {selectedAppointment && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>

                <h3>Appointment Details</h3>
                <p><strong>Title:</strong> {selectedAppointment.title}</p>
                <p><strong>Start:</strong> {selectedAppointment.start.toLocaleString()}</p>
                <p><strong>End:</strong> {selectedAppointment.end.toLocaleString()}</p>
                <p><strong>Location:</strong> {selectedAppointment.location || 'N/A'}</p>
                <p><strong>Notes:</strong> {selectedAppointment.notes || 'None'}</p>
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => setSelectedAppointment(null)} style={{ marginRight: '10px' }}>
                    Close
                  </button>
                  <button onClick={handleDelete} style={{ backgroundColor: '#cc0000', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px' }}>
                    Delete
                  </button>
                </div>
              </div>
              </div>
            )}
            {selectedPerson && user.role === 'patient' &&(
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#e8f0fe', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>

                <h3>'Doctor Info'</h3>
                <p><strong>Name:</strong> {selectedPerson.name}</p>
                <p><strong>Address:</strong> {selectedPerson.address}</p>
                <p>
                  <strong>Specialty: </strong> 
                {selectedPerson.specialty}
                </p>
                
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => setShowAppointmentForm(true)} style={{ marginRight: '10px' }}>
                    Schedule Appointment
                  </button>
                  <button onClick={() => setselectedPerson(null)}>
                    Close
                  </button>
                </div>
              </div>
              </div>
            )}
            {selectedPerson && user.role === 'doctor' && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#e8f0fe', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>
                  <h3>Patient Info</h3>
                  <p><strong>Name:</strong> {selectedPerson.name}</p>
                  <p><strong>Address:</strong> {selectedPerson.address}</p>
                  <p><strong>Insurance:</strong> {selectedPerson.insurance}</p>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => setShowAppointmentForm(true)}>Schedule Appointment</button>
                    <button onClick={() => setShowClaimForm(true)}>Create Claim</button>
                    <button onClick={() => setShowPrescriptionForm(true)}>Create Prescription</button>
                    <button onClick={() => setShowLabForm(true)}>Create Lab Test</button>
                    <button onClick={() => setShowNoteForm(true)}>Add Note</button>
                    <button onClick={() => setShowAllergyForm(true)}>Add Allergy</button>
                    <button onClick={() => viewMedicalHistory(selectedPerson.ssn)} style={{ marginLeft: '10px' }}>
                      View Medical History
                    </button>                    
                    <button onClick={() => setselectedPerson(null)}>Close</button>
                  </div>
                </div>
              </div>
            )}

            {showAppointmentForm && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '400px' }}>

                <h3>Schedule Appointment with {selectedPerson.name}</h3>
                <form onSubmit={async(e) => {
                  e.preventDefault();
                  try {
                    await createAppointment(
                      appointmentForm.startTime,
                      appointmentForm.endTime,
                      appointmentForm.location,
                      appointmentForm.notes,
                      user.role === 'patient' ? user.ssn : selectedPerson.ssn,
                      user.role === 'patient' ? selectedPerson.ssn : user.ssn
                    );
                    
                    const apptRes = user.role === 'patient'
                      ? await getAppointmentsForPatient(user.ssn)
                      : await getAppointmentsForDoctor(user.ssn);
                    
                    const formattedEvents = apptRes.data.map(appt => ({
                      id: appt.id,
                      title: appt.notes || 'Appointment',
                      start: new Date(appt.start_time),
                      end: new Date(appt.end_time),
                      location: appt.location,
                      notes: appt.notes,
                    }));
                    setAppointments(formattedEvents); // ✅ Update the calendar
                            
                    alert('Appointment submitted!');
                    setShowAppointmentForm(false);
                    setselectedPerson(null);
                  } catch (err) {
                    console.error('Failed to create appointment:', err);
                  }
                }}>
                  <input
                    type="datetime-local"
                    value={appointmentForm.startTime}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, startTime: e.target.value })}
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                  />

                  <input
                    type="datetime-local"
                    value={appointmentForm.endTime}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, endTime: e.target.value })}
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                  />

                  <input
                    type="text"
                    placeholder="Location"
                    value={appointmentForm.location}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, location: e.target.value })}
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                  />

                  <textarea
                    placeholder="Notes"
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                  />
                  <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
                  <button onClick={() => setShowAppointmentForm(false)}>Cancel</button>
                </form>
              </div>
              </div>
            )}
            {showClaimForm && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                  <h3>Create Claim</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await createClaim(selectedPerson.ssn, user.ssn, claimAmount, 'pending');
                      alert('Claim created!');
                      setShowClaimForm(false);
                      setClaimAmount('');
                    } catch (err) {
                      console.error('Failed to create claim:', err);
                    }
                  }}>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      required
                      style={{ display: 'block', marginBottom: '10px' }}
                    />
                    <button type="submit">Submit</button>
                    <button onClick={() => setShowClaimForm(false)}>Cancel</button>
                  </form>
                </div>
              </div>
            )}

            {/* //PRESCRIPTION FORM */}
            {showPrescriptionForm && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                  <h3>Create Prescription</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const res = await createPrescription(prescriptionForm.drug, prescriptionForm.amount);
                      await assignPrescription(res.data.id, selectedPerson.ssn, user.ssn);
                      alert('Prescription created and assigned!');
                      setShowPrescriptionForm(false);
                      setPrescriptionForm({ drug: '', amount: '' });
                    } catch (err) {
                      console.error('Failed to create prescription:', err);
                    }
                  }}>
                    <input
                      type="text"
                      placeholder="Drug"
                      value={prescriptionForm.drug}
                      onChange={(e) => setPrescriptionForm({ ...prescriptionForm, drug: e.target.value })}
                      required
                      style={{ display: 'block', marginBottom: '10px' }}
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={prescriptionForm.amount}
                      onChange={(e) => setPrescriptionForm({ ...prescriptionForm, amount: e.target.value })}
                      required
                      style={{ display: 'block', marginBottom: '10px' }}
                    />
                    <button type="submit">Submit</button>
                    <button onClick={() => setShowPrescriptionForm(false)}>Cancel</button>
                  </form>
                </div>
              </div>
            )}

            {/* // LAB FORM */}
            {showLabForm && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                  <h3>Create Lab Test</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const res = await createLab(labResult);
                      await assignLab(res.data.id, selectedPerson.ssn, user.ssn);
                      alert('Lab test created and assigned!');
                      setShowLabForm(false);
                      setLabResult('');
                    } catch (err) {
                      console.error('Failed to create lab:', err);
                    }
                  }}>
                    <input
                      type="text"
                      placeholder="Lab Result"
                      value={labResult}
                      onChange={(e) => setLabResult(e.target.value)}
                      required
                      style={{ display: 'block', marginBottom: '10px' }}
                    />
                    <button type="submit">Submit</button>
                    <button onClick={() => setShowLabForm(false)}>Cancel</button>
                  </form>
                </div>
              </div>
            )}
            {medicalHistory && (
              <MedicalHistoryPopup
                history={medicalHistory}
                onClose={() => setMedicalHistory(null)}
              />
            )}
            {showNoteForm && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>
                  <h3>Add Note for {selectedPerson.name}</h3>
                  <textarea
                    placeholder="Enter note"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    style={{ width: '100%', height: '100px', marginBottom: '10px' }}
                  />
                  <button
                    onClick={async () => {
                      await createNote(selectedPerson.ssn, user.ssn, noteText);
                      alert('Note added!');
                      setShowNoteForm(false);
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    Submit
                  </button>
                  <button onClick={() => setShowNoteForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            {showAllergyForm && (
              <div style={overlayStyle}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>
                  <h3>Add Allergy for {selectedPerson.name}</h3>
                  <input
                    type="text"
                    placeholder="Enter allergen"
                    value={allergen}
                    onChange={(e) => setAllergen(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px' }}
                  />
                  <button
                    onClick={async () => {
                      await addAllergy(selectedPerson.ssn, allergen);
                      alert('Allergy added!');
                      setShowAllergyForm(false);
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    Submit
                  </button>
                  <button onClick={() => setShowAllergyForm(false)}>Cancel</button>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        <p style={{ padding: '20px' }}>Loading patient information...</p>
      )}
    </>
  );
}

export default HomePage;
