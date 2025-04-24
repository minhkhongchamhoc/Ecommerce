import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiSliders } from 'react-icons/fi';
import { BsBookmark, BsDot } from 'react-icons/bs';
import { MdFilterListOff } from 'react-icons/md';
import ProductCard from '../components/ProductCard';
import { ProductsContext } from '../contexts/ProductContext';
import { CategoriesContext } from '../contexts/CategoriesContext';
import { transformProductData } from '../utils/products';

// Debounce utility
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Radio component
const Radio = ({ label, isSelected, onSelect }) => {
  return (
    <div
      className="inline-flex justify-start items-center gap-3 cursor-pointer"
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center relative transition-all duration-200 ${
          isSelected ? 'border-2 border-sky-500' : 'border-slate-400'
        }`}
      >
        {isSelected && <FaCircle className="w-2.5 h-2.5 text-sky-500" />}
      </div>
      <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">{label}</div>
    </div>
  );
};

// RangeSlider component
const RangeSlider = ({ min, max, value, onChange }) => {
  const [activeThumb, setActiveThumb] = useState(null);
  const [positions, setPositions] = useState({ min: 0, max: 100 });
  const trackRef = useRef(null);

  useEffect(() => {
    const minPos = ((value.min - min) / (max - min)) * 100;
    const maxPos = ((value.max - min) / (max - min)) * 100;
    setPositions({ min: minPos, max: maxPos });
  }, [value.min, value.max, min, max]);

  const handleMouseDown = (thumb) => (e) => {
    setActiveThumb(thumb);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!trackRef.current || !activeThumb) return;

    const track = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, ((e.clientX - track.left) / track.width) * 100), 100);
    const newValue = Math.round(min + ((max - min) * percent) / 100);

    if (activeThumb === 'min') {
      if (newValue <= value.max) {
        onChange({ ...value, min: newValue });
      }
    } else if (activeThumb === 'max') {
      if (newValue >= value.min) {
        onChange({ ...value, max: newValue });
      }
    }
  };

  const handleMouseUp = () => {
    setActiveThumb(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="w-full pt-6 pb-2" role="region" aria-label="Price range slider">
      <div
        ref={trackRef}
        className="w-full h-1 bg-gray-200 rounded-md relative cursor-pointer"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const step = (max - min) / 100;
            const newMin = e.key === 'ArrowLeft' ? Math.max(min, value.min - step) : Math.min(value.max, value.min + step);
            const newMax = e.key === 'ArrowLeft' ? Math.max(newMin, value.max - step) : Math.min(max, value.max + step);
            onChange({ min: Math.round(newMin), max: Math.round(newMax) });
          }
        }}
      >
        <div
          className="h-1 bg-sky-500 rounded-md absolute"
          style={{ left: `${positions.min}%`, width: `${positions.max - positions.min}%` }}
        />
        <div
          className="w-4 h-4 bg-white rounded-full border-2 border-sky-500 absolute top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-shadow"
          style={{ left: `${positions.min}%`, marginLeft: '-8px' }}
          onMouseDown={handleMouseDown('min')}
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={value.max}
          aria-valuenow={value.min}
          tabIndex={0}
        />
        <div
          className="w-4 h-4 bg-white rounded-full border-2 border-sky-500 absolute top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-shadow"
          style={{ left: `${positions.max}%`, marginLeft: '-8px' }}
          onMouseDown={handleMouseDown('max')}
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={value.min}
          aria-valuemax={max}
          aria-valuenow={value.max}
          tabIndex={0}
        />
      </div>
    </div>
  );
};

// Main component
const ShopPage = () => {
  const { products, pagination, loading, error, filterProducts } = useContext(ProductsContext);
  const { categories, categoryError } = useContext(CategoriesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  const sortOptions = ['Newest', 'Price Low - High', 'Price High - Low'];
  const sortMap = {
    'Newest': 'newest',
    'Price Low - High': 'price_asc',
    'Price High - Low': 'price_desc',
  };
  const limit = 9;

  // Initialize filters from URL
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const minPrice = parseInt(searchParams.get('minPrice')) || 0;
    const maxPrice = parseInt(searchParams.get('maxPrice')) || 500;
    const sort = searchParams.get('sort') || 'Newest';
    const page = parseInt(searchParams.get('page')) || 1;

    const categoryName = categories.find((cat) => cat.name === category || cat._id === category)?.name || '';

    setSelectedCategory(categoryName);
    setPriceRange({ min: minPrice, max: Math.max(minPrice, maxPrice) });
    setSelectedSort(sortOptions.includes(sort) ? sort : 'Newest');
    setCurrentPage(page);
  }, [searchParams, categories]);

  // Update URL and fetch products
  const updateFilters = useCallback(
    debounce(async (filters, params) => {
      setIsFiltering(true);
      try {
        await filterProducts(filters);
        setSearchParams(params, { replace: true });
      } catch (err) {
        // Error handled by ProductsContext
      } finally {
        setTimeout(() => setIsFiltering(false), 200);
      }
    }, 300),
    [filterProducts, setSearchParams]
  );

  // Trigger filter update when filter states change
  useEffect(() => {
    const filters = {
      category: selectedCategory ? categories.find((cat) => cat.name === selectedCategory)?._id : '',
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sort: sortMap[selectedSort],
      page: currentPage,
      limit,
    };

    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (priceRange.min !== 0) params.set('minPrice', priceRange.min.toString());
    if (priceRange.max !== 500) params.set('maxPrice', priceRange.max.toString());
    if (selectedSort !== 'Newest') params.set('sort', selectedSort);
    if (currentPage !== 1) params.set('page', currentPage.toString());

    updateFilters(filters, params);
  }, [selectedCategory, priceRange.min, priceRange.max, selectedSort, currentPage, categories, updateFilters]);

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 500 });
    setSelectedSort('Newest');
    setCurrentPage(1);
  };

  // Generate pagination buttons
  const paginationButtons = Array.from({ length: Math.min(pagination.totalPages || 1, 5) }, (_, i) => i + 1);

  return (
    <div className="w-full px-4 pt-10 pb-16 flex justify-center items-start overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row justify-start items-start gap-8">
        {/* Sidebar - Filters */}
        <aside className="w-full lg:w-80 pr-0 lg:pr-6 flex flex-col gap-2.5 shrink-0 mb-8 lg:mb-0">
          <div className="flex flex-col gap-8">
            {/* Categories */}
            <section className="pb-10 border-b border-gray-200 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <BsBookmark className="text-gray-900" aria-hidden="true" />
                <h2 className="text-gray-900 text-lg font-semibold font-poppins leading-7">Categories</h2>
              </div>
              <div className="pt-4 flex flex-col gap-4" role="radiogroup" aria-label="Product categories">
                {categoryError ? (
                  <div className="text-red-600 text-sm">{categoryError}</div>
                ) : categories.length === 0 ? (
                  <div className="text-gray-600 text-sm">Loading categories...</div>
                ) : (
                  categories.map((category) => (
                    <Radio
                      key={category._id}
                      label={category.name}
                      isSelected={selectedCategory === category.name}
                      onSelect={() => {
                        setSelectedCategory(category.name === selectedCategory ? '' : category.name);
                        setCurrentPage(1);
                      }}
                    />
                  ))
                )}
              </div>
            </section>

            {/* Price Range */}
            <section className="pb-10 border-b border-gray-200 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <FiSliders className="text-gray-900" aria-hidden="true" />
                <h2 className="text-gray-900 text-lg font-semibold font-poppins leading-7">Price range</h2>
              </div>
              <div className="flex flex-col gap-5">
                <RangeSlider
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={(val) => {
                    setPriceRange(val);
                    setCurrentPage(1);
                  }}
                />
                <div className="px-4 py-2 rounded-full border border-gray-200 flex items-center">
                  <input
                    type="text"
                    value={`$${priceRange.min} - $${priceRange.max}`}
                    onChange={(e) => {
                      const [min, max] = e.target.value
                        .replace(/[^0-9-]/g, '')
                        .split('-')
                        .map((v) => parseInt(v) || 0);
                      setPriceRange({
                        min: Math.max(0, min),
                        max: Math.min(1000, max >= min ? max : min),
                      });
                      setCurrentPage(1);
                    }}
                    className="flex-1 text-gray-600 text-sm font-medium font-poppins leading-tight bg-transparent outline-none"
                    placeholder="$0 - $500"
                    aria-label="Price range input"
                  />
                </div>
              </div>
            </section>

            {/* Sort Order */}
            <section className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <BsDot className="text-gray-900 text-xl" aria-hidden="true" />
                <h2 className="text-gray-900 text-lg font-semibold font-poppins leading-7">Sort order</h2>
              </div>
              <div className="py-4 flex flex-col gap-4" role="radiogroup" aria-label="Sort options">
                {sortOptions.map((option) => (
                  <Radio
                    key={option}
                    label={option}
                    isSelected={selectedSort === option}
                    onSelect={() => {
                      setSelectedSort(option);
                      setCurrentPage(1);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="mt-4 flex items-center gap-2 text-sky-500 hover:text-sky-600 transition-colors"
              aria-label="Clear all filters"
            >
              <MdFilterListOff className="text-lg" />
              <span className="text-sm font-medium font-poppins">Clear Filters</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center gap-12">
          {/* Products Grid */}
          <div
            className={`w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16 justify-items-center transition-opacity duration-300 ${
              isFiltering || loading ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {loading ? (
              <div className="col-span-full text-center text-gray-600 opacity-0 animate-fadeIn">Loading...</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-600">{error}</div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">No products found</div>
            ) : (
              transformProductData(products).map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  category={product.category}
                  currentPrice={product.currentPrice}
                  originalPrice={product.originalPrice}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="w-full flex justify-center items-center gap-1 mt-8" aria-label="Pagination">
              <button
                className="px-3 py-2 flex items-center gap-2.5 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              {paginationButtons.map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 flex justify-center items-center ${
                    currentPage === page ? 'bg-gray-200/50' : 'hover:bg-gray-100'
                  } rounded-xl transition-colors`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                  aria-label={`Page ${page}`}
                >
                  <span className="text-gray-600 text-base font-normal font-poppins">{page}</span>
                </button>
              ))}
              <button
                className="px-3 py-2 flex items-center gap-2.5 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                disabled={currentPage === pagination.totalPages}
                aria-label="Next page"
              >
                <FiChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;