import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const TOKEN_KEY = 'auth_token';

// Token storage utilities
const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

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
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken()); // Initialize based on token
  const [user, setUser] = useState(getUserData()); // Initialize from localStorage
  const navigate = useNavigate();

  const login = (userData, token) => {
    setToken(token); // Store token in localStorage
    setUserData(userData); // Save user data to localStorage
    setUser(userData);
    setIsLoggedIn(true);
    navigate('/');
  };

  const logout = () => {
    // Clear all auth-related data from localStorage
    removeToken();
    localStorage.clear(); // Clear all localStorage data
    setUserData(null);
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