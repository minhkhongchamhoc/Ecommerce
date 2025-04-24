import React, { createContext, useState, useCallback } from 'react';
import { productsUtils } from '../utils/products';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 9, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterProducts = useCallback(async (filters) => {
    setLoading(true);
    try {
      const data = await productsUtils.filterProducts(filters);
      setProducts(data.products);
      setPagination(data.pagination);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to filter products');
      throw err;
    } finally {
      setTimeout(() => setLoading(false), 300); // Minimum loading time to reduce flickering
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ products, pagination, loading, error, filterProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};