import categoriesApi from '../api/categoriesApi';

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
 * Utility functions for category-related API operations
 * @namespace categoriesUtils
 */
export const categoriesUtils = {
  /**
   * Fetch all categories
   * @returns {Promise<any>} List of categories
   */
  getAllCategories: async () => {
    const response = await fetch(categoriesApi.GET_ALL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Create a new category
   * @param {Object} data - Category data (name, description)
   * @returns {Promise<any>} Created category data
   */
  createCategory: async (data) => {
    const response = await fetch(categoriesApi.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Get a category by ID
   * @param {string} id - Category identifier
   * @returns {Promise<any>} Category data
   */
  getCategoryById: async (id) => {
    const response = await fetch(categoriesApi.GET_BY_ID(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Update a category
   * @param {string} id - Category identifier
   * @param {Object} data - Updated category data (name, description)
   * @returns {Promise<any>} Updated category data
   */
  updateCategory: async (id, data) => {
    const response = await fetch(categoriesApi.UPDATE(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Delete a category
   * @param {string} id - Category identifier
   * @returns {Promise<void>} No content on success
   */
  deleteCategory: async (id) => {
    const response = await fetch(categoriesApi.DELETE(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await handleResponse(response);
  },
};

// Export categoriesUtils as default for compatibility with default imports
export default categoriesUtils;