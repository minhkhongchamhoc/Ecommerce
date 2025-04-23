const errorHandler = (error) => {
    if (error.message.includes('Unauthorized')) {
      return 'Your session has expired. Please log in again.';
    }
    if (error.message.includes('Invalid')) {
      return 'Invalid email or password.';
    }
    if (error.message.includes('Server')) {
      return 'Server error. Please try again later.';
    }
    return error.message || 'An unexpected error occurred.';
  };
  
  export default errorHandler;