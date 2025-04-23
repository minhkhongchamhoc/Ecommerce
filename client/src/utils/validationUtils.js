// src/utils/validationUtils.js
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password) => password.length >= 6;

export const validateEmail = (value, setErrors, setIsValid) => {
  if (!value) {
    setErrors((prev) => ({ ...prev, email: 'Email is required' }));
    setIsValid((prev) => ({ ...prev, email: false }));
    return false;
  } else if (!isValidEmail(value)) {
    setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    setIsValid((prev) => ({ ...prev, email: false }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, email: '' }));
    setIsValid((prev) => ({ ...prev, email: true }));
    return true;
  }
};

export const validatePassword = (value, setErrors, setIsValid, confirmPassword, validateConfirmPassword) => {
  if (!value) {
    setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    setIsValid((prev) => ({ ...prev, password: false }));
    return false;
  } else if (!isValidPassword(value)) {
    setErrors((prev) => ({
      ...prev,
      password: 'Password must be at least 6 characters long',
    }));
    setIsValid((prev) => ({ ...prev, password: false }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, password: '' }));
    setIsValid((prev) => ({ ...prev, password: true }));
    // Re-validate confirm password if it exists
    if (confirmPassword && validateConfirmPassword) {
      validateConfirmPassword(confirmPassword, value);
    }
    return true;
  }
};

export const validateConfirmPassword = (value, currentPassword, setErrors, setIsValid) => {
  if (!value) {
    setErrors((prev) => ({ ...prev, confirmPassword: 'Please confirm your password' }));
    setIsValid((prev) => ({ ...prev, confirmPassword: false }));
    return false;
  } else if (value !== currentPassword) {
    setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    setIsValid((prev) => ({ ...prev, confirmPassword: false }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    setIsValid((prev) => ({ ...prev, confirmPassword: true }));
    return true;
  }
};