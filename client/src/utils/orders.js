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
  const token = localStorage.getItem('auth_token');
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
    console.log('Checkout Response:', data);
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
    console.log('Fetch Orders Response:', data);
    return { orders: data.orders || [] }; // { orders: [...] }
  },

  /**
   * Fetches an order by its ID.
   * @param {string} orderId - The order ID.
   * @returns {Promise<{ order: import('../utils/ordersTypes').Order }>} The order details.
   * @throws {Error} If the request fails.
   */
  fetchOrderById: async (orderId) => {
    console.log('Fetching order with ID:', orderId); // Debug
    const url = ordersApi.GET_BY_ID(orderId);
    console.log('Fetch Order URL:', url); // Debug
    console.log('Headers:', getAuthHeaders()); // Debug
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Fetch Order By ID Response:', data);
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
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({}),
    });
    const data = await handleResponse(response);
    console.log('Cancel Order Response:', data);
    return data; // { order: {...} }
  },

  /**
   * Updates the status of an order.
   * @param {string} orderId - The order ID.
   * @param {'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'} status - The new status.
   * @returns {Promise<{ order: import('../utils/ordersTypes').Order }>} The updated order.
   * @throws {Error} If the request fails.
   */
  updateOrderStatus: async (orderId, status) => {
    console.log('Sending status for update:', status); // Debug
    const response = await fetch(ordersApi.UPDATE_STATUS(orderId), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await handleResponse(response);
    console.log('Update Order Status Response:', data);
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
    console.log('Update Payment Response:', data);
    return data; // { order: {...} }
  },

  /**
   * Fetches all orders for admins with pagination.
   * @param {Object} params - Pagination parameters.
   * @param {number} params.page - Page number.
   * @param {number} params.limit - Number of orders per page.
   * @returns {Promise<{ orders: import('../utils/ordersTypes').Order[], pagination: { total: number, page: number, limit: number, totalPages: number } }>} List of orders and pagination info.
   * @throws {Error} If the request fails.
   */
  fetchAllOrdersAdmin: async ({ page = 1, limit = 9 } = {}) => {
    const url = new URL(ordersApi.GET_ALL_ADMIN);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Fetch All Orders Admin Response:', data);
    return {
      orders: data.data?.orders || [],
      pagination: data.data?.pagination || { total: 0, page: 1, limit, totalPages: 1 },
    };
  },

  /**
   * Searches orders by status for admins.
   * @param {string} status - The order status to filter by.
   * @returns {Promise<{ orders: import('../utils/ordersTypes').Order[] }>} List of matching orders.
   * @throws {Error} If the request fails.
   */
  searchOrdersByStatus: async (status) => {
    const url = new URL(ordersApi.SEARCH_ADMIN);
    if (status) {
      console.log('Searching orders with status:', status); // Debug
      url.searchParams.append('status', status);
    }
    console.log('Search URL:', url.toString()); // Debug
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Search Orders By Status Response:', data);
    return { orders: data.data?.orders || [] }; // { orders: [...] }
  },
};

export default ordersUtils;