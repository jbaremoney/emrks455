import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getPatientBySSN, getAppointmentsForPatient} from '../api/patients';
//import {  } from '../api/';
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

const patientResults = ['Alice', 'Bob', 'Charlie', 'Diana'];
const doctorResults = ['Poop', 'Fart', 'Charlie', 'Diana']

function HomePage() {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === 'patient') {
        try {
          const res = await getPatientBySSN(user.ssn);
          setPatient(res.data);

          const apptRes = await getAppointmentsForPatient(user.ssn);
          const formattedEvents = apptRes.data.map(appt => ({
            title: appt.notes || 'Appointment',
            start: new Date(appt.start_time),
            end: new Date(appt.end_time),
            location: appt.location,
            notes: appt.notes,
          }));
          setAppointments(formattedEvents);
        } catch (err) {
          console.error('Error fetching patient or appointments:', err);
        }
      }
    };

    fetchData();
  }, [user]);

  const [showResults, setShowResults] = useState(false);

  return (
    <>
      {user?.role === 'patient' && patient ? (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <div id="sidebar">
            <h2 style={{ marginBottom: '2px', padding: '10px 10px 0px 15px', color: '#27272b', textDecorationLine: 'underline' }}>
              {patient.name}
            </h2>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{patient.address}</p>
            <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>{patient.insurance}</p>

            <button className="fixed-button" type="button" style={{ marginTop: '60px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Home
            </button>
            <button className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Lab Tests
            </button>
            <button className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Claims
            </button>
            <button className="fixed-button" type="button" style={{ marginTop: '5px', marginLeft: '10px', padding: '5px', borderRadius: '8px', width: '200px' }}>
              Prescriptions
            </button>
          </div>

          <div style={{ flex: 1, backgroundColor: 'lightblue', padding: '20px', overflowY: 'auto' }}>
            <input
              style={{
                width: '400px',
                backgroundColor: 'lightblue',
                border: 'white solid',
                borderRadius: '20px',
                paddingLeft: '8px',
                color: 'black',
              }}
              placeholder="Search"
            />

            <h1 style={{ padding: '0 0 0 20px', color: '#27272b' }}>Calendar</h1>

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
              <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
                <h3>Appointment Details</h3>
                <p><strong>Title:</strong> {selectedAppointment.title}</p>
                <p><strong>Start:</strong> {selectedAppointment.start.toLocaleString()}</p>
                <p><strong>End:</strong> {selectedAppointment.end.toLocaleString()}</p>
                <p><strong>Location:</strong> {selectedAppointment.location || 'N/A'}</p>
                <p><strong>Notes:</strong> {selectedAppointment.notes || 'None'}</p>
                <button onClick={() => setSelectedAppointment(null)} style={{ marginTop: '10px' }}>
                  Close
                </button>
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
