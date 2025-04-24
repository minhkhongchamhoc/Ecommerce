import React, { createContext, useState, useEffect } from 'react';
import { categoriesUtils } from '../utils/categories';

// Create the Categories Context
export const CategoriesContext = createContext({
  categories: [],
  loading: false,
  error: null,
  getAllCategories: () => Promise.resolve(),
  createCategory: () => Promise.resolve(),
  updateCategory: () => Promise.resolve(),
  deleteCategory: () => Promise.resolve(),
});

// Categories Provider Component
const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await categoriesUtils.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Get all categories
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const data = await categoriesUtils.getAllCategories();
      setCategories(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async (data) => {
    setLoading(true);
    try {
      const newCategory = await categoriesUtils.createCategory(data);
      setCategories((prev) => [...prev, newCategory]);
      setError(null);
      return newCategory;
    } catch (err) {
      setError(err.message || 'Failed to create category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a category
  const updateCategory = async (id, data) => {
    setLoading(true);
    try {
      const updatedCategory = await categoriesUtils.updateCategory(id, data);
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? updatedCategory : category
        )
      );
      setError(null);
      return updatedCategory;
    } catch (err) {
      setError(err.message || 'Failed to update category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      await categoriesUtils.deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
        getAllCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;