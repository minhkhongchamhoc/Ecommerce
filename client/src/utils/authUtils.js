
import API from '../api/api';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(API.auth.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      return { success: true, data };
    } else {
      let errorMsg;
      switch (response.status) {
        case 400:
          errorMsg = data.message || 'Invalid credentials';
          break;
        case 500:
          errorMsg = data.message || 'Server error. Please try again later.';
          break;
        default:
          errorMsg = data.message || 'Unexpected error. Please try again.';
      }
      return { success: false, error: errorMsg };
    }
  } catch (err) {
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await fetch(API.auth.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      return { success: true, data };
    } else {
      let errorMsg;
      switch (response.status) {
        case 400:
          errorMsg = data.message || 'Invalid input or user already exists';
          break;
        case 500:
          errorMsg = data.message || 'Server error. Please try again later.';
          break;
        default:
          errorMsg = data.message || 'Unexpected error. Please try again.';
      }
      return { success: false, error: errorMsg };
    }
  } catch (err) {
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
};