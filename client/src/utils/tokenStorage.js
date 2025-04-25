const TOKEN_KEY = 'auth_token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  // Remove both the auth token and any other auth-related data
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('token'); // Remove token if stored with different key
  localStorage.removeItem('user'); // Remove user data
};