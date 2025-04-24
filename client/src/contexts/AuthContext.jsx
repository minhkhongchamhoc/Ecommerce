import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, removeToken } from '../utils/tokenStorage';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from /api/auth/me
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const userData = await api.getUserProfile();
      console.log('Setting user:', userData);
      setUser(userData); // { id, email, role }
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Failed to fetch user:', err.message);
      removeToken();
      setUser(null);
      setIsLoggedIn(false);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for token and fetch user on mount
  useEffect(() => {
    const token = getToken();
    console.log('Initial token check:', token ? 'Present' : 'Missing');
    if (token) {
      fetchUser();
    }
  }, []);

  // Login function
  const login = async (arg1, arg2) => {
    try {
      let userData, token;
      // Handle direct login with email/password (for LoginPage)
      if (typeof arg1 === 'string' && typeof arg2 === 'string') {
        const { success, data, error } = await api.loginUser(arg1, arg2);
        if (!success) {
          throw new Error(error);
        }
        userData = data.user;
        token = data.token;
      } 
      // Handle manual userData/token (for RegisterPage)
      else {
        userData = arg1; // { id, email, role }
        token = arg2;
      }

      setToken(token);
      setUser(userData);
      setIsLoggedIn(true);
      console.log('Login successful, user:', userData);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.message);
      throw err; // Let LoginPage/RegisterPage handle the error
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out, clearing user');
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Log user state after updates
  useEffect(() => {
    console.log('AuthContext user state:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};