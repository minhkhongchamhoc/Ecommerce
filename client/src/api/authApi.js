const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authApi = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,
  ME: `${BASE_URL}/api/auth/me`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
};

export default authApi;