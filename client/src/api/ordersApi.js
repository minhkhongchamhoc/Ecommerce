const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ordersApi = {
  CHECKOUT: `${BASE_URL}/api/orders/checkout`,
  GET_ALL: `${BASE_URL}/api/orders`,
  GET_BY_ID: (orderId) => `${BASE_URL}/api/orders/${orderId}`,
  CANCEL: (orderId) => `${BASE_URL}/api/orders/${orderId}/cancel`,
  UPDATE_STATUS: (orderId) => `${BASE_URL}/api/orders/${orderId}/status`,
  UPDATE_PAYMENT: (orderId) => `${BASE_URL}/api/orders/${orderId}/payment`,
  GET_ALL_ADMIN: `${BASE_URL}/api/orders/admin/all`,
  SEARCH_ADMIN: `${BASE_URL}/api/orders/admin/search`,
};

export default ordersApi;