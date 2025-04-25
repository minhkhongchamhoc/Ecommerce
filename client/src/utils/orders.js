import ordersApi from '../api/ordersApi';

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} Parsed response data
 * @throws {Error} If response is not OK
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `An error occurred (Status: ${response.status})`);
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
 * Utility functions for handling order-related API requests.
 */
export const ordersUtils = {
  /**
   * Submits a checkout request to create a new order.
   * @param {import('../utils/ordersTypes').CheckoutPayload} checkoutData - The checkout payload.
   * @returns {Promise<import('../utils/ordersTypes').CheckoutResponse>} The created order and message.
   * @throws {Error} If the request fails.
   */
  checkout: async (checkoutData) => {
    const response = await fetch(ordersApi.CHECKOUT, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(checkoutData),
    });
    const data = await handleResponse(response);
    console.log('Checkout Response:', data); // Debug log
    return data; // { order: {...}, message: string }
  },

  /**
   * Fetches all orders for the authenticated user.
   * @returns {Promise<{ orders: import('../utils/ordersTypes').Order[] }>} List of orders.
   * @throws {Error} If the request fails.
   */
  fetchOrders: async () => {
    const response = await fetch(ordersApi.GET_ALL, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Fetch Orders Response:', data); // Debug log
    return data; // { orders: [...] }
  },

  /**
   * Fetches an order by its ID.
   * @param {string} orderId - The order ID.
   * @returns {Promise<{ order: import('../utils/ordersTypes').Order }>} The order details.
   * @throws {Error} If the request fails.
   */
  fetchOrderById: async (orderId) => {
    const response = await fetch(ordersApi.GET_BY_ID(orderId), {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Fetch Order By ID Response:', data); // Debug log
    return data; // { order: {...} }
  },

  /**
   * Cancels an order by its ID.
   * @param {string} orderId - The order ID.
   * @returns {Promise<{ order: import('../utils/ordersTypes').Order }>} The updated order.
   * @throws {Error} If the request fails.
   */
  cancelOrder: async (orderId) => {
    const response = await fetch(ordersApi.CANCEL(orderId), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({}),
    });
    const data = await handleResponse(response);
    console.log('Cancel Order Response:', data); // Debug log
    return data; // { order: {...} }
  },

  /**
   * Updates the status of an order.
   * @param {string} orderId - The order ID.
   * @param {'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} status - The new status.
   * @returns {Promise<{ order: import('../utils/ordersTypes').Order }>} The updated order.
   * @throws {Error} If the request fails.
   */
  updateOrderStatus: async (orderId, status) => {
    const response = await fetch(ordersApi.UPDATE_STATUS(orderId), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await handleResponse(response);
    console.log('Update Order Status Response:', data); // Debug log
    return data; // { order: {...} }
  },

  /**
   * Updates the payment information for an order.
   * @param {string} orderId - The order ID.
   * @param {import('../utils/ordersTypes').PaymentInfo} paymentInfo - The updated payment information.
   * @returns {Promise<{ order: import('../utils/ordersTypes').Order }>} The updated order.
   * @throws {Error} If the request fails.
   */
  updatePayment: async (orderId, paymentInfo) => {
    const response = await fetch(ordersApi.UPDATE_PAYMENT(orderId), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentInfo),
    });
    const data = await handleResponse(response);
    console.log('Update Payment Response:', data); // Debug log
    return data; // { order: {...} }
  },
};

export default ordersUtils;