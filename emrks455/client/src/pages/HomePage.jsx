import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function HomePage() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'left', alignItems: 'left',}}>
      <div id="sidebar" style={{}}>
        <h2 style={{padding: '10px 10px 10px 15px', color:'black', textDecorationLine: 'underline'}}>Sidebar</h2>
      </div>

      <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
          
      </div>

    </div>
    
  );
}

export default HomePage;