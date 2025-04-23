import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../utils/apiClient';
import { transformProductData } from '../utils/transformData';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(filters);
      const transformedData = transformProductData(data);
      setProducts(transformedData);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <ProductsContext.Provider value={{ products, loading, error, filters, setFilters }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};