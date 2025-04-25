import userApi from '../api/userApi';

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} Parsed response data
 * @throws {Error} If response is not OK
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `An error occurred (Status: ${response.status})`);
  }
  return response.json();
};

/**
 * Get authentication headers
 * @returns {Object} Headers with JWT token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  };
};

/**
 * Utility functions for handling user-related API requests.
 */
export const usersUtils = {
  /**
   * Fetches the current user's profile.
   * @returns {Promise<import('../user.types').User>} User profile data
   * @throws {Error} If the request fails
   */
  getUserProfile: async () => {
    const response = await fetch(userApi.GET_PROFILE, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    console.log('Get User Profile Response:', data);
    return data;
  },

  /**
   * Updates the user's profile.
   * @param {Object} profileData - Profile data to update
   * @param {string} profileData.firstName - User's first name
   * @param {string} profileData.lastName - User's last name
   * @param {string} [profileData.phoneNumber] - User's phone number
   * @param {string} [profileData.dateOfBirth] - User's date of birth (ISO date string)
   * @param {string} [profileData.gender] - User's gender (male, female, other)
   * @returns {Promise<import('../user.types').User>} Updated user profile
   * @throws {Error} If the request fails
   */
  updateUserProfile: async (profileData) => {
    const response = await fetch(userApi.UPDATE_PROFILE, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await handleResponse(response);
    console.log('Update User Profile Response:', data);
    return data;
  },

  /**
   * Adds a new address to the user's profile.
   * @param {import('../user.types').Address} address - Address to add
   * @returns {Promise<import('../user.types').User>} Updated user profile
   * @throws {Error} If the request fails
   */
  addAddress: async (address) => {
    const response = await fetch(userApi.ADD_ADDRESS, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(address)
    });
    const data = await handleResponse(response);
    console.log('Add Address Response:', data);
    return data;
  }
};

export default usersUtils;