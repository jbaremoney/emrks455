import React from 'react';
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

function HomePage() {
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

      <div style={{flex: 1, backgroundColor: 'lightblue', padding: '20px', overflowY: 'auto' }}>
        <input style={{width:'400px', backgroundColor:'lightblue', border:'white solid', borderRadius:'20px', paddingLeft:'8px', color:'black'}}
          placeholder='Search'
        />
        <h1 style={{ padding: "0 0 0 20px",color: '#27272b' }}>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['week']}
          defaultView="week"
          toolbar = {false}
          style={{ height: 600, margin: '10px 10px 10px 20px', backgroundColor: 'white', color:"gray", borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}

export default HomePage;