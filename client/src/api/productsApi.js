const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const productsApi = {
  FILTER: `${BASE_URL}/api/products/filter`,
  GET_BY_ID: (id) => `${BASE_URL}/api/products/${id}`,
  UPDATE: (id) => `${BASE_URL}/api/products/${id}`,
  DELETE: (id) => `${BASE_URL}/api/products/${id}`,
  CREATE: `${BASE_URL}/api/products`,
};

export default productsApi;