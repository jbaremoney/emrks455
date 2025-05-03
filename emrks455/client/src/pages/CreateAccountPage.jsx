import React, { useState } from 'react';

function CreateAccountPage() {
    const [name, setName] = useState('');
    const [ssn, setSsn] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleCreateAccount = (e) => {
      e.preventDefault();
      console.log('Creating account with:', { email, password });
      // TODO: Send POST request to backend to create the account
    };
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
          <form className = 'wrapper' onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <h2 style={{textAlign: 'center'}}> Create an Account!</h2>
            <p style={{ color: '#27272b', margin: '0px'}}>Name:</p>
            <input className='textfield'
                type="text"
                placeholder="Firstname Lastname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ marginBottom: '10px', padding: '8px' }}
            />
            <p style={{ color: '#27272b', margin: '0px'}}>SSN:</p>
            <input className='textfield'
                type="password"
                placeholder="XXXXXXXXX"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                required
                style={{ marginBottom: '10px', padding: '8px' }}
            />
            <p style={{ color: '#27272b', margin: '0px'}}>Email:</p>
            <input className='textfield'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: '10px', padding: '8px' }}
            />
            <p style={{ color: '#27272b', margin: '0px'}}>Password:</p>
            <input className='textfield'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: '10px', padding: '8px' }}
            />
            <button class="fixed-button" type="submit" style={{ padding: '10px', borderRadius: '25px' }}>Sign Up</button>
          </form>
        </div>
    )
}
  
export default CreateAccountPage;