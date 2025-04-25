import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ordersUtils from '../utils/orders';
import authUtils from '../utils/authUtils';

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
    const token = localStorage.getItem('token');
    return !!token;
  };

 
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
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Fetches all orders for the authenticated user.
   * @returns {Promise<void>}
   */
  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await ordersUtils.fetchOrders();
      setOrders(response.orders || []);
      console.log('Orders Fetched:', response);
      setError(null);
    } catch (err) {
      console.error('Fetch Orders Error:', err);
      let errorMsg = err.message || 'Failed to fetch orders';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(errorMsg);
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
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Cancels an order optimistically.
   * @param {string} orderId - The order ID.
   * @returns {Promise<import('../utils/ordersTypes').Order>} The updated order.
   */
  const cancelOrder = useCallback(async (orderId) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    const originalOrders = [...orders];
    setOrders((prev) =>
      prev.map((order) => (order._id === orderId ? { ...order, status: 'cancelled' } : order))
    );
    try {
      const response = await ordersUtils.cancelOrder(orderId);
      console.log('Order Cancelled:', response);
      setError(null);
      return response.order;
    } catch (err) {
      setOrders(originalOrders);
      console.error('Cancel Order Error:', err);
      let errorMsg = err.message || 'Failed to cancel order';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('token');
        navigate('|/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [orders, navigate]);

  /**
   * Updates an order’s status optimistically.
   * @param {string} orderId - The order ID.
   * @param {'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} status - The new status.
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
        localStorage.removeItem('token');
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
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [orders, navigate]);

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