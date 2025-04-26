import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductContext';
import { CategoriesContext } from '../../contexts/CategoriesContext';

const ProductsPage = () => {
  const {
    products,
    pagination,
    loading: productsLoading,
    error: productsError,
    filterProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductsContext);
  const { categories, loading: categoriesLoading, error: categoriesError } = useContext(CategoriesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: [],
    sizes: [],
    stock: 0,
  });
  const [imageInput, setImageInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Predefined sizes for quick selection
  const predefinedSizes = ['S', 'M', 'L', 'XL'];

  // Fetch products for the current page
  useEffect(() => {
    filterProducts({ page: currentPage, limit: 9 });
  }, [currentPage, filterProducts]);

  // Open modal for creating or editing
  const openModal = (product = null) => {
    setEditingProduct(product);
    setFormData(
      product
        ? {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category._id || '',
            images: product.images || [],
            sizes: product.sizes || [],
            stock: product.stock || 0,
          }
        : {
            name: '',
            description: '',
            price: 0,
            category: '',
            images: [],
            sizes: [],
            stock: 0,
          }
    );
    setImageInput('');
    setSizeInput('');
    setFormError(null);
    setSuccessMessage(null);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'imageInput') {
      setImageInput(value);
    } else if (name === 'sizeInput') {
      setSizeInput(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'price' || name === 'stock' ? Number(value) : value,
      }));
    }
  };

  // Add an image to the list
  const addImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput('');
    }
  };

  // Remove an image from the list
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Add a size to the list
  const addSize = () => {
    if (sizeInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, sizeInput.trim()],
      }));
      setSizeInput('');
    }
  };

  // Add a predefined size
  const addPredefinedSize = (size) => {
    if (!formData.sizes.includes(size)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
  };

  // Remove a size from the list
  const removeSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.name || !formData.price || !formData.category || formData.stock < 0) {
      setFormError('Please fill in all required fields: Name, Price, Category, Stock.');
      return;
    }

    try {
      console.log('Sending product data:', formData);
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        setSuccessMessage('Product updated successfully!');
      } else {
        await createProduct(formData);
        setSuccessMessage('Product added successfully!');
      }
      // Refresh product list on the current page
      filterProducts({ page: currentPage, limit: 9 });
      console.log('Products after create:', products, 'Pagination:', pagination); // Debug
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error saving product. Please try again.';
      setFormError(errorMessage);
      console.error('Error saving product:', err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        // If the current page is empty, go to the previous page
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          filterProducts({ page: currentPage, limit: 9 });
        }
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg shadow font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-0 font-poppins">Product Management</h1>
        {!editingProduct && (
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 font-poppins"
            onClick={() => openModal()}
          >
            Add Product
          </button>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <p className="text-green-500 text-sm mb-4 font-poppins">{successMessage}</p>
      )}

      {/* Form Section */}
      {isModalOpen && (
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-poppins">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h2>
          {/* Display form error if any */}
          {formError && (
            <p className="text-red-500 text-sm mb-3 font-poppins">{formError}</p>
          )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
  <div className="mb-3 sm:mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Name</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
      required
    />
  </div>
  <div className="mb-3 sm:mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Price</label>
    <input
      type="number"
      name="price"
      value={formData.price || ''} // Use empty string instead of 0
      onChange={handleInputChange}
      className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
      placeholder="Enter price"
      min="0" // Prevent negative values
      step="0.01" // Allow decimals
      required
    />
  </div>
  <div className="mb-3 sm:mb-4 md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
      rows="3"
    />
  </div>
  <div className="mb-3 sm:mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Category</label>
    {categoriesLoading ? (
      <p className="text-gray-600 text-sm font-poppins">Loading categories...</p>
    ) : categoriesError ? (
      <p className="text-red-500 text-sm font-poppins">{categoriesError}</p>
    ) : categories.length === 0 ? (
      <p className="text-gray-600 text-sm font-poppins">No categories available.</p>
    ) : (
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
        required
      >
        <option value="" className="font-poppins">Select category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id} className="font-poppins">
            {category.name}
          </option>
        ))}
      </select>
    )}
  </div>
  <div className="mb-3 sm:mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Stock</label>
    <input
      type="number"
      name="stock"
      value={formData.stock || ''} // Use empty string instead of 0
      onChange={handleInputChange}
      className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
      placeholder="Enter stock"
      min="0" // Prevent negative values
      required
    />
  </div>
  <div className="mb-3 sm:mb-4 md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Sizes</label>
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <input
        type="text"
        name="sizeInput"
        value={sizeInput}
        onChange={handleInputChange}
        placeholder="Enter size"
        className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
      />
      <button
        type="button"
        onClick={addSize}
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 sm:whitespace-nowrap font-poppins"
      >
        Add
      </button>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
      {predefinedSizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => addPredefinedSize(size)}
          className={`px-3 py-1 text-sm border rounded-md font-poppins ${
            formData.sizes.includes(size)
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
    {formData.sizes.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {formData.sizes.map((size, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md"
          >
            <span className="text-sm text-gray-600 font-poppins">{size}</span>
            <button
              type="button"
              onClick={() => removeSize(index)}
              className="text-red-600 hover:text-red-900 font-poppins"
            >
              X
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  <div className="mb-3 sm:mb-4 md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Images</label>
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <input
        type="text"
        name="imageInput"
        value={imageInput}
        onChange={handleInputChange}
        placeholder="Enter image URL"
        className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 font-poppins"
      />
      <button
        type="button"
        onClick={addImage}
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 sm:whitespace-nowrap font-poppins"
      >
        Add
      </button>
    </div>
    {formData.images.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {formData.images.map((image, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md"
          >
            <img
              src={image}
              alt={`Preview ${index}`}
              className="w-10 h-10 object-cover rounded"
              onError={(e) => (e.target.src = 'https://placehold.co/48x48')}
            />
            <span className="text-sm text-gray-600 truncate max-w-[80px] sm:max-w-[150px] font-poppins">
              {image}
            </span>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="text-red-600 hover:text-red-900 font-poppins"
            >
              X
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  <div className="md:col-span-2 flex justify-end space-x-2">
    <button
      type="button"
      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 font-poppins"
      onClick={() => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormError(null);
        setSuccessMessage(null);
      }}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 font-poppins"
    >
      {editingProduct ? 'Update' : 'Create'}
    </button>
  </div>
</form>
        </div>
      )}

      {/* Products List */}
      {productsError && <p className="text-red-500 text-sm mb-4 font-poppins">{productsError}</p>}
      {productsLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-gray-600 font-poppins">No products found.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <div className="min-w-full divide-y divide-gray-200 block md:table">
              {/* Table Header - Hidden on mobile */}
              <div className="bg-gray-50 hidden md:table-header-group">
                <div className="md:table-row">
                  <div className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell font-poppins">
                    Name
                  </div>
                  <div className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell font-poppins">
                    Category
                  </div>
                  <div className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell font-poppins">
                    Price
                  </div>
                  <div className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell font-poppins">
                    Stock
                  </div>
                  <div className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell font-poppins">
                    Actions
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="bg-white divide-y divide-gray-200 block md:table-row-group">
                {products.map((product) => (
                  <div key={product._id} className="block md:table-row hover:bg-gray-50 border-b md:border-b-0 border-gray-200">
                    {/* Mobile Product Header */}
                    <div className="md:hidden bg-gray-100 p-2 flex justify-between items-center">
                      <span className="font-medium text-sm text-gray-800 truncate max-w-[180px] font-poppins">{product.name}</span>
                      <div className="flex space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium font-poppins"
                          onClick={() => openModal(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 text-sm font-medium font-poppins"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="block md:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4">
                      <div className="md:hidden font-medium text-xs text-gray-500 mb-1 font-poppins">Name</div>
                      <div className="text-sm text-gray-900 font-poppins">{product.name}</div>
                    </div>

                    {/* Category */}
                    <div className="block md:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4">
                      <div className="md:hidden font-medium text-xs text-gray-500 mb-1 font-poppins">Category</div>
                      <div className="text-sm text-gray-500 font-poppins">{product.category.name}</div>
                    </div>

                    {/* Price */}
                    <div className="block md:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4">
                      <div className="md:hidden font-medium text-xs text-gray-500 mb-1 font-poppins">Price</div>
                      <div className="text-sm font-medium text-gray-900 font-poppins">{product.price}</div>
                    </div>

                    {/* Stock */}
                    <div className="block md:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4">
                      <div className="md:hidden font-medium text-xs text-gray-500 mb-1 font-poppins">Stock</div>
                      <div className="text-sm text-gray-500 font-poppins">{product.stock}</div>
                    </div>

                    {/* Actions - Hidden on mobile as it's moved to the mobile header */}
                    <div className="hidden md:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4 text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4 font-poppins"
                        onClick={() => openModal(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 font-poppins"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simplified Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <button
                  className={`px-3 py-1 border rounded text-sm font-poppins ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span className="px-3 py-1 border bg-white text-sm font-poppins">
                  {currentPage} / {pagination.totalPages}
                </span>

                <button
                  className={`px-3 py-1 border rounded text-sm font-poppins ${
                    currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;