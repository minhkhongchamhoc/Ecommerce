import cartApi from '../api/cartApi';

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} Parsed response data
 * @throws {Error} If response is not OK
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
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

export const cartUtils = {
  /**
   * Get user's cart
   * @returns {Promise<Cart>} Cart data
   */
  getCart: async () => {
    const response = await fetch(cartApi.GET, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Get Cart Response:', data); // Debug log
    return data; // Return cart object directly
  },

  /**
   * Add item to cart
   * @param {AddCartItemRequest} item - Item to add
   * @returns {Promise<Cart>} Updated cart
   */
  addToCart: async (item) => {
    const response = await fetch(cartApi.ADD, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    const data = await handleResponse(response);
    console.log('Add to Cart Response:', data); // Debug log
    return data; // Return cart object directly
  },

  /**
   * Update cart item
   * @param {string} itemId - Cart item ID
   * @param {UpdateCartItemRequest} updates - Updates to apply
   * @returns {Promise<Cart>} Updated cart
   */
  updateCartItem: async (itemId, updates) => {
    const response = await fetch(cartApi.UPDATE(itemId), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await handleResponse(response);
    console.log('Update Cart Item Response:', data); // Debug log
    return data; // Return cart object directly
  },

  /**
   * Remove item from cart
   * @param {string} itemId - Cart item ID
   * @returns {Promise<Cart>} Updated cart
   */
  removeCartItem: async (itemId) => {
    const response = await fetch(cartApi.REMOVE(itemId), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    console.log('Remove Cart Item Response:', data); // Debug log
    return data; // Return cart object directly
  },
};