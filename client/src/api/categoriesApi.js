const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categoriesApi = {
  GET_ALL: `${BASE_URL}/api/categories`,
  CREATE: `${BASE_URL}/api/categories`,
  GET_BY_ID: (id) => `${BASE_URL}/api/categories/${id}`,
  UPDATE: (id) => `${BASE_URL}/api/categories/${id}`,
  DELETE: (id) => `${BASE_URL}/api/categories/${id}`,
};

export default categoriesApi;