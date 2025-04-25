import React, { createContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ordersApi from '../api/ordersApi'; // Import ordersApi directly
import ordersUtils from '../utils/orders';

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
 * Context for managing order-related state and actions.
 * @type {React.Context}
 */
export const OrdersContext = createContext({
  orders: [],
  loading: false,
  error: null,
  currentUserId: null,
  checkout: async () => {},
  fetchOrders: async () => {},
  fetchOrderById: async () => {},
  cancelOrder: async () => {},
  updateOrderStatus: async () => {},
  updatePayment: async () => {},
  fetchAllOrdersAdmin: async () => {},
  searchOrdersByStatus: async () => {},
});

/**
 * Provides order-related state and actions to child components.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} The OrdersContext provider.
 */
export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  };

  /**
   * Fetches all orders for the authenticated user.
   * @returns {Promise<{ orders: import('../utils/ordersTypes').Order[] }>}
   */
  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return { orders: [] };
    }

    setLoading(true);
    let isMounted = true;
    try {
      const response = await fetch(ordersApi.GET_ALL, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await handleResponse(response);
      console.log('Fetch Orders Response:', data); // Debug: Should show array of 10 orders
      const ordersData = Array.isArray(data) ? data : data.orders || [];
      if (isMounted) {
        setOrders(ordersData);
        console.log('Orders State Updated:', ordersData); // Debug: Confirm state update
        setError(null);
      }
      return { orders: ordersData };
    } catch (err) {
      console.error('Fetch Orders Error:', err, { message: err.message, stack: err.stack });
      let errorMsg = err.message || 'Failed to fetch orders';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      if (isMounted) {
        setError(errorMsg);
        setOrders([]); // Ensure orders is empty on error
      }
      return { orders: [] };
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  /**
   * Submits a checkout request and adds the order to state.
   * @param {import('../utils/ordersTypes').CheckoutPayload} checkoutData - The checkout payload.
   * @returns {Promise<import('../utils/ordersTypes').CheckoutResponse>} The created order and message.
   */
  const checkout = useCallback(async (checkoutData) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await ordersUtils.checkout(checkoutData);
      setOrders((prev) => [...prev, response.order]);
      console.log('Checkout Success:', response);
      setError(null);
      return response;
    } catch (err) {
      console.error('Checkout Error:', err);
      let errorMsg = err.message || 'Checkout failed';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Fetches an order by its ID.
   * @param {string} orderId - The order ID.
   * @returns {Promise<import('../utils/ordersTypes').Order>} The order details.
   */
  const fetchOrderById = useCallback(async (orderId) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await ordersUtils.fetchOrderById(orderId);
      console.log('Order Fetched:', response);
      setError(null);
      return response.order;
    } catch (err) {
      console.error('Fetch Order Error:', err);
      let errorMsg = err.message || 'Failed to fetch order';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Cancels an order.
   * @param {string} orderId - The order ID.
   * @returns {Promise<import('../utils/ordersTypes').Order>} The updated order.
   */
  const cancelOrder = useCallback(async (orderId) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return { order: null };
    }

    setLoading(true);
    try {
      const response = await fetch(ordersApi.CANCEL(orderId), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({}),
      });
      const data = await handleResponse(response);
      console.log('Cancel Order Response:', data); // Debug
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? data.order : order
        )
      );
      setError(null);
      return data.order;
    } catch (err) {
      console.error('Cancel Order Error:', err);
      let errorMsg = err.message || 'Failed to cancel order';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Updates an order’s status optimistically.
   * @param {string} orderId - The order ID.
   * @param {'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'} status - The new status.
   * @returns {Promise<import('../utils/ordersTypes').Order>} The updated order.
   */
  const updateOrderStatus = useCallback(async (orderId, status) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    const originalOrders = [...orders];
    setOrders((prev) =>
      prev.map((order) => (order._id === orderId ? { ...order, status } : order))
    );
    try {
      console.log('Updating order status to:', status); // Debug
      const response = await ordersUtils.updateOrderStatus(orderId, status);
      console.log('Order Status Updated:', response);
      setError(null);
      return response.order;
    } catch (err) {
      setOrders(originalOrders);
      console.error('Update Order Status Error:', err);
      let errorMsg = err.message || 'Failed to update order status';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [orders, navigate]);

  /**
   * Updates an order’s payment information optimistically.
   * @param {string} orderId - The order ID.
   * @param {import('../utils/ordersTypes').PaymentInfo} paymentInfo - The updated payment information.
   * @returns {Promise<import('../utils/ordersTypes').Order>} The updated order.
   */
  const updatePayment = useCallback(async (orderId, paymentInfo) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    const originalOrders = [...orders];
    setOrders((prev) =>
      prev.map((order) => (order._id === orderId ? { ...order, paymentInfo } : order))
    );
    try {
      const response = await ordersUtils.updatePayment(orderId, paymentInfo);
      console.log('Payment Updated:', response);
      setError(null);
      return response.order;
    } catch (err) {
      setOrders(originalOrders);
      console.error('Update Payment Error:', err);
      let errorMsg = err.message || 'Failed to update payment';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [orders, navigate]);

  /**
   * Fetches all orders for admins with pagination.
   * @param {Object} params - Pagination parameters.
   * @param {number} params.page - Page number.
   * @param {number} params.limit - Number of orders per page.
   * @returns {Promise<{ orders: import('../utils/ordersTypes').Order[], pagination: { total: number, page: number, limit: number, totalPages: number } }>}
   */
  const fetchAllOrdersAdmin = useCallback(async ({ page = 1, limit = 9 } = {}) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await ordersUtils.fetchAllOrdersAdmin({ page, limit });
      setOrders(response.orders || []);
      console.log('All Orders Fetched (Admin):', response);
      setError(null);
      return response;
    } catch (err) {
      console.error('Fetch All Orders Admin Error:', err);
      let errorMsg = err.message || 'Failed to fetch all orders';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Searches orders by status for admins.
   * @param {string} status - The order status to filter by.
   * @returns {Promise<{ orders: import('../utils/ordersTypes').Order[] }>}
   */
  const searchOrdersByStatus = useCallback(async (status) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      console.log('Calling searchOrdersByStatus with status:', status); // Debug
      const response = await ordersUtils.searchOrdersByStatus(status);
      setOrders(response.orders || []);
      console.log('Orders Searched By Status:', response);
      setError(null);
      return response;
    } catch (err) {
      console.error('Search Orders By Status Error:', err);
      let errorMsg = err.message || 'Failed to search orders';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('auth_token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        currentUserId,
        checkout,
        fetchOrders,
        fetchOrderById,
        cancelOrder,
        updateOrderStatus,
        updatePayment,
        fetchAllOrdersAdmin,
        searchOrdersByStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// PropTypes for type safety
OrdersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrdersProvider;