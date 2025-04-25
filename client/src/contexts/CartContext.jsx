import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartUtils } from '../utils/cart';


export const CartContext = createContext({
  cart: null,
  loading: false,
  error: null,
  currentUserId: null,
  fetchCart: async () => {},
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeCartItem: async () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Fetch current user profile
  const fetchUserProfile = useCallback(async () => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      const profile = await authUtils.getUserProfile();
      setCurrentUserId(profile.user);
      console.log('Current User ID:', profile.user);
      setError(null);
    } catch (err) {
      console.error('Fetch User Profile Error:', err);
      let errorMsg = err.message || 'Failed to fetch user profile';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(errorMsg);
    }
  }, [navigate]);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated()) {
      console.log('No token found, skipping cart fetch');
      return;
    }

    setLoading(true);
    try {
      const data = await cartUtils.getCart();
      console.log('Cart Fetched:', data); // Debug log
      setCart(data); // Set cart state
      setError(null);
    } catch (err) {
      console.error('Fetch Cart Error:', err);
      let errorMsg = err.message || 'Failed to fetch cart';
      if (err.message.includes('401')) {
        errorMsg = 'Session expired. Please log in again.';
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(errorMsg);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Add item to cart
  const addToCart = useCallback(
    async (item) => {
      if (!isAuthenticated()) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const data = await cartUtils.addToCart(item);
        console.log('Cart Updated (Add):', data);
        setCart(data);
        setError(null);
        // Refresh cart to ensure latest data
        await fetchCart();
      } catch (err) {
        console.error('Add to Cart Error:', err);
        let errorMsg = err.message || 'Failed to add item to cart';
        if (err.message.includes('401')) {
          errorMsg = 'Session expired. Please log in again.';
          localStorage.removeItem('token');
          navigate('/login');
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [fetchCart, navigate]
  );

  // Update cart item
  const updateCartItem = useCallback(async (itemId, updates) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const data = await cartUtils.updateCartItem(itemId, updates);
      console.log('Cart Updated (Update):', data);
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Update Cart Item Error:', err);
      let errorMsg = err.message || 'Failed to update cart item';
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

  // Remove cart item
  const removeCartItem = useCallback(async (itemId) => {
    if (!isAuthenticated()) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const data = await cartUtils.removeCartItem(itemId);
      console.log('Cart Updated (Remove):', data);
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Remove Cart Item Error:', err);
      let errorMsg = err.message || 'Failed to remove cart item';
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

  // Automatically fetch cart on mount for authenticated users
  useEffect(() => {
    const initializeCart = async () => {
      if (isAuthenticated()) {
        try {
          await fetchCart();
        } catch (err) {
          console.error('Initialize Cart Error:', err.message);
        }
      }
    };
    initializeCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        currentUserId,
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};