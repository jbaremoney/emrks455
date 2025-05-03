import React, { useState } from 'react';

function LoginPage() {
  const [role, setRole] = useState('');       // 'doctor' or 'patient'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // prevents page reload
    console.log('Role:', role);
    console.log('Email:', email);
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {role === 'patient' && (
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <hr></hr>
              <span style={{ color: "#27272b"}}>Don't have an account? </span>
              <a style={{ color: '#0077cc', textDecoration: 'underline', cursor: 'pointer' }}>
                Create one here
              </a>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default LoginPage;