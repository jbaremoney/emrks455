import React from 'react';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  getPatientBySSN
} from '../api/patients';
import { useAuth } from './AuthContext'; // adjust path as needed


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

const events = [
  {
    title: 'Test Appointment',
    start: new Date(2025, 4, 2, 10, 0), 
    end: new Date(2025, 4, 2, 11, 0),   
  },
];

const patientResults = ['Alice', 'Bob', 'Charlie', 'Diana'];
const doctorResults = ['Poop', 'Fart', 'Charlie', 'Diana']

function HomePage() {
  const { user } = useAuth();
  const [showResults, setShowResults] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div id="sidebar" >
        <h2 style={{ marginBottom: '2px', padding: '10px 10px 0px 15px', color: '#27272b', textDecorationLine: 'underline'}}> Patient Name </h2>
        <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>123 Street North</p>
        <p style={{ margin: '0px', padding: '0px 0px 0px 15px', color: '#27272b' }}>Patient Insurance</p>
        <button className="fixed-button" type="submit" style={{ marginTop: '60px', marginLeft:'10px', padding: '5px', borderRadius: '8px', width:'200px'}}> Home </button>
        <button className="fixed-button" type="submit" style={{ marginTop: '5px', marginLeft:'10px', padding: '5px', borderRadius: '8px', width:'200px' }}> Lab Tests </button>
        <button className="fixed-button" type="submit" style={{ marginTop: '5px', marginLeft:'10px', padding: '5px', borderRadius: '8px', width:'200px' }}> Claims </button>
        <button className="fixed-button" type="submit" style={{ marginTop: '5px', marginLeft:'10px', padding: '5px', borderRadius: '8px', width:'200px' }}> Prescriptions </button>
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
            {results.map((name, index) => (
              <div
                key={index}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer'
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}

        <h1 style={{ paddingTop: '40px', color: '#27272b' }}>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['week']}
          defaultView="week"
          toolbar={false}
          style={{
            height: 600,
            margin: '10px 0',
            backgroundColor: 'white',
            color: 'gray',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  );
}
export default HomePage;