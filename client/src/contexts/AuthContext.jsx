// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, removeToken } from '../utils/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData, token) => {
    setToken(token);
    setUser(userData); // userData is { id, email, role }
    setIsLoggedIn(true);
    navigate('/');
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};