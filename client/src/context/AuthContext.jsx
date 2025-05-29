import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthDataState] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (authData?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authData]);

  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === 'auth' && !event.newValue) {
        setAuthDataState(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    };
  
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);  

  const setAuthData = (newAuthData) => {
    if (newAuthData?.user && newAuthData?.token) {
      setAuthDataState(newAuthData);
      localStorage.setItem('auth', JSON.stringify(newAuthData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAuthData.token}`;
    } else {
      setAuthDataState(null);
      localStorage.removeItem('auth');
      delete axios.defaults.headers.common['Authorization'];
    }
  };  

  const login = (data) => {
    setAuthData(data);  
  };

  const logout = () => {
    setAuthData(null);
  };

  const value = {
    authData,
    login,
    logout,
    setAuthData,
    isAuthenticated: !!authData?.token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
