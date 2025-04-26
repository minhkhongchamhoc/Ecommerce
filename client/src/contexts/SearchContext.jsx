import React, { createContext, useState, useContext } from 'react';
import productsApi from '../api/productsApi';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${productsApi.FILTER}?search=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      console.log('API Response:', data);

      let products = [];

      if (Array.isArray(data)) {
        products = data;
      } else if (data.data && Array.isArray(data.data)) {
        products = data.data;
      } else if (data.products && Array.isArray(data.products)) {
        products = data.products;
      } else {
        throw new Error('Unexpected response format');
      }

      const formattedResults = products.map((product) => ({
        id: product._id || product.id,
        name: product.name || 'Unknown Product',
        price: typeof product.price === 'number' ? product.price : 0,
        image: Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : product.image || product.imageUrl || '/placeholder.jpg',
      }));

      setSearchResults(formattedResults);
      setShowResults(true);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setShowResults(false);
    setError(null);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        isLoading,
        error,
        showResults,
        searchProducts,
        clearSearch,
        setShowResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;