import React, { useState } from 'react';

function LoginPage() {
  const [role, setRole] = useState('');       // 'doctor' or 'patient'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // prevents page reload
    console.log('Role:', role);
    console.log('Username:', username);
    console.log('Password:', password);
    // Later: send this to the backend
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
      {role === '' ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 id='welcome-header'>Welcome to EMRKS System!</h1>
            <div class='wrapper' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>Are you a Doctor or a Patient?</h2>
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                  <button class='fixed-button' onClick={() => handleRoleSelection('doctor')} style={{ padding: '10px 20px' }}>Doctor</button>
                  <button class='fixed-button' onClick={() => handleRoleSelection('patient')} style={{ padding: '10px 20px' }}>Patient</button>
                </div>
            </div>
        </div>
      ) : (
        <form class = 'wrapper' onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <h2 style={{textAlign: 'center'}}>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2> {/* Capitalize first letter */}
          <input class='textfield'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '8px' }}
          />
          <input class='textfield'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '8px' }}
          />
          <button class="fixed-button" type="submit" style={{ padding: '10px', borderRadius: '25px' }}>Login</button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;



  /* NOTES -- 
  login as patient or doctor -- either have two buttons one for doctor one for patient or ask first


  */