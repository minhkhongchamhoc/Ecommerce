const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const cartApi = {
  GET: `${BASE_URL}/api/cart`,
  ADD: `${BASE_URL}/api/cart/add`,
  UPDATE: (itemId) => `${BASE_URL}/api/cart/update/${itemId}`,
  REMOVE: (itemId) => `${BASE_URL}/api/cart/remove/${itemId}`,
};

export default cartApi;