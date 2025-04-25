// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, removeToken } from '../utils/tokenStorage';

export const AuthContext = createContext();

// Helper functions for user data persistence
const setUserData = (userData) => {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  } else {
    localStorage.removeItem('user');
  }
};

const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(getUserData()); // Initialize from localStorage
  const navigate = useNavigate();

  const login = (userData, token) => {
    setToken(token);
    setUserData(userData); // Save to localStorage
    setUser(userData);
    setIsLoggedIn(true);
    navigate('/');
  };

  const logout = () => {
    removeToken();
    setUserData(null); // Clear from localStorage
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      const savedUser = getUserData();
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, []);

  // Debug log
  useEffect(() => {
    console.log('Auth State Changed:', { isLoggedIn, user });
  }, [isLoggedIn, user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};