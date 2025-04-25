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

  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    try {
      const newProduct = await productsUtils.createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      setError(err.message || 'Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    try {
      const updatedProduct = await productsUtils.updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updatedProduct : product))
      );
      setError(null);
      return updatedProduct;
    } catch (err) {
      setError(err.message || 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    try {
      await productsUtils.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, pagination, loading, error, filterProducts, createProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};