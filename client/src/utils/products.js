import productsApi from '../api/productsApi';

/**
 * Handles API response, throwing errors for non-OK responses
 * @param {Response} response - Fetch response
 * @returns {Promise} Parsed JSON data
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

/**
 * Transforms API product data to match ProductCard props
 * @param {Array} apiData - Array of product objects from API
 * @returns {Array} Transformed product data
 */
export const transformProductData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    image: item.images[0] || 'https://placehold.co/320x360',
    name: item.name || 'Unknown Product',
    category: item.category.name || 'Uncategorized',
    currentPrice: item.price || 0,
    originalPrice: item.price * 1.2 || 0,
  }));
};

/**
 * Product utility functions for API interactions
 */
export const productsUtils = {
  /**
   * Filter products based on criteria
   * @param {Object} filters - Filter criteria (category, minPrice, maxPrice, sort, page, limit)
   * @returns {Promise} Filtered products and pagination data
   */
  filterProducts: async (filters) => {
    const query = new URLSearchParams();
    if (filters.category) query.set('category', filters.category);
    if (filters.minPrice !== undefined) query.set('minPrice', filters.minPrice);
    if (filters.maxPrice !== undefined) query.set('maxPrice', filters.maxPrice);
    if (filters.sort) query.set('sort', filters.sort);
    if (filters.page) query.set('page', filters.page);
    if (filters.limit) query.set('limit', filters.limit);

    const response = await fetch(`${productsApi.FILTER}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Get a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise} Product data
   */
  getProductById: async (id) => {
    const response = await fetch(productsApi.GET_BY_ID(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Get recommended products based on category
   * @param {string} categoryId - Category ID
   * @returns {Promise} Recommended products data
   */
  getRecommendedProducts: async (categoryId) => {
    const query = new URLSearchParams({ category: categoryId, limit: '4' });
    const response = await fetch(`${productsApi.FILTER}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

export default productsUtils;