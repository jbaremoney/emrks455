import React, { useState } from 'react';

function HomePage() {
    
    return (
      <>
        {/* {user?.role === 'patient' && patient ? ( */}
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
          </div>
        {/* ) : ( */}
          <p style={{ padding: '20px' }}>Loading patient information...</p>
        {/* )} */}
      </>
    );
  }
  export default HomePage;
  