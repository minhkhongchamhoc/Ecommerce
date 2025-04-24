import categoriesApi from '../api/categoriesApi';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

export const categoriesUtils = {
  // Fetch all categories
  getAllCategories: async () => {
    const response = await fetch(categoriesApi.GET_ALL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Create a new category
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

  // Get a category by ID
  getCategoryById: async (id) => {
    const response = await fetch(categoriesApi.GET_BY_ID(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Update a category
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

  // Delete a category
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