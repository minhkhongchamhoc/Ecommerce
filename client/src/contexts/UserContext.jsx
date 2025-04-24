import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { usersUtils } from '../utils/users';

const UserContext = createContext({
  user: null,
  loading: false,
  error: null,
  getUserProfile: async () => {},
  updateUserProfile: async () => {},
  addAddress: async () => {}
});

export const UserProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setUser(null);
      setLoading(false);
      return;
    }

    const loadUserProfile = async () => {
        try {
          const userData = await usersUtils.getUserProfile();
          setUser(userData);
        } catch (err) {
          setError(err.message);
          console.error('Load User Profile Error:', err);
        } finally {
          setLoading(false);
        }
      };

    loadUserProfile();
  }, [isLoggedIn]);

  const getUserProfile = async () => {
    try {
      const userData = await usersUtils.getUserProfile();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Failed to load user profile');
      throw err;
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const updatedUser = await usersUtils.updateUserProfile(profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to update user profile');
      throw err;
    }
  };

  const addAddress = async (address) => {
    try {
      const updatedUser = await usersUtils.addAddress(address);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to add address');
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        getUserProfile,
        updateUserProfile,
        addAddress
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;