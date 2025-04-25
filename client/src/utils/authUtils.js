import authApi from '../api/authApi';

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} Parsed response data
 * @throws {Error} If response is not OK
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
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
    Authorization: token ? `Bearer ${token}` : '',
  };
};

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{ success: boolean, data?: { token: string, user: { id: string, email: string, role: string } }, error?: string }>} Login result
 */
const loginUser = async (email, password) => {
  try {
    console.log('Login Request:', { email, password });
    const response = await fetch(authApi.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    console.log('Login Response:', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Token Stored:', data.token);
    }
    return { success: true, data };
  } catch (err) {
    console.error('Login Error:', err.message);
    let errorMsg;
    if (err.message.includes('401')) {
      errorMsg = 'Invalid email or password';
    } else if (err.message.includes('400')) {
      errorMsg = 'Invalid request data';
    } else if (err.message.includes('500')) {
      errorMsg = 'Server error. Please try again later.';
    } else {
      errorMsg = err.message || 'Unexpected error. Please try again.';
    }
    return { success: false, error: errorMsg };
  }
};

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{ success: boolean, data?: { token: string, user: { id: string, email: string, role: string } }, error?: string }>} Registration result
 */
const registerUser = async (email, password) => {
  try {
    console.log('Register Request:', { email, password });
    const response = await fetch(authApi.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    console.log('Register Response:', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Token Stored:', data.token);
    }
    return { success: true, data };
  } catch (err) {
    console.error('Register Error:', err.message);
    let errorMsg;
    if (err.message.includes('409')) {
      errorMsg = 'User already exists';
    } else if (err.message.includes('400')) {
      errorMsg = 'Invalid request data';
    } else if (err.message.includes('500')) {
      errorMsg = 'Server error. Please try again later.';
    } else {
      errorMsg = err.message || 'Unexpected error. Please try again.';
    }
    return { success: false, error: errorMsg };
  }
};

/**
 * Get current user's profile
 * @returns {Promise<{ id: string, email: string, role: string }>} User profile data
 */
const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching user profile with token:', token ? 'Present' : 'Missing');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch(authApi.ME, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('User Profile Response:', data);
    // Normalize response: handle nested user object or direct fields
    return data.user || data;
  } catch (err) {
    console.error('Get User Profile Error:', err.message);
    throw err;
  }
};

export default {
  loginUser,
  registerUser,
  getUserProfile,
};