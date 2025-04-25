import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
import { FiSearch, FiX } from 'react-icons/fi';
import debounce from 'lodash/debounce';

const SearchBar = ({ placeholder = 'Search in products...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, isLoading, error, showResults, searchProducts, clearSearch, setShowResults } = useSearch();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounce search function
  const debouncedSearch = useRef(
    debounce((query) => {
      searchProducts(query);
    }, 300)
  ).current;

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    clearSearch();
  };

  // Navigate to product
  const handleProductClick = (productId) => {
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }
    navigate(`/products/${productId}`);
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Mobile Search Bar */}
      <div className="md:hidden w-48 h-9 px-4 bg-stone-50 rounded-full flex justify-start items-center gap-1.5">
        <FiSearch className="w-3.5 h-3.5 text-gray-600" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 bg-transparent outline-none text-gray-600 text-xs font-normal font-poppins"
          placeholder={placeholder}
        />
        {searchTerm && (
          <FiX
            className="w-3.5 h-3.5 text-gray-600 cursor-pointer"
            onClick={handleClearSearch}
          />
        )}
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex w-96 h-12 px-6 bg-stone-50 rounded-full justify-start items-center gap-2.5">
        <FiSearch className="w-5 h-5 text-gray-600" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 bg-transparent outline-none text-gray-600 text-sm font-normal font-poppins"
          placeholder={placeholder}
        />
        {searchTerm && (
          <FiX
            className="w-5 h-5 text-gray-600 cursor-pointer"
            onClick={handleClearSearch}
          />
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          )}

          {!isLoading && !error && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-600">
              No products found
            </div>
          )}

          {!isLoading && !error && searchResults.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image || '/placeholder.jpg'}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-600">${product.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;