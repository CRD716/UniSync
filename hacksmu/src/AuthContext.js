// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    // Implement your login logic here
    // Once the user is authenticated, call setAuthenticated(true)
    setAuthenticated(true);
  };



  const logout = () => {
    // Implement your logout logic here
    // Once the user logs out, call setAuthenticated(false)
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}