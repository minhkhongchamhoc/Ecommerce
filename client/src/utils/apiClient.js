import productsApi from '../api/productsApi';

export const apiClient = {
  get: async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }
};

export const fetchProducts = async (filters) => {
  const queryParams = new URLSearchParams();
  if (filters.category && filters.category !== 'All') {
    queryParams.append('category', filters.category);
  }
  if (filters.minPrice) {
    queryParams.append('minPrice', filters.minPrice);
  }
  if (filters.maxPrice) {
    queryParams.append('maxPrice', filters.maxPrice);
  }

  return apiClient.get(`${productsApi.FILTER}?${queryParams.toString()}`);
};