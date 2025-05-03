import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Hook for easy use in components
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { ssn: '...', role: 'doctor' | 'patient' }

  const login = (ssn, role) => {
    setUser({ ssn, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
