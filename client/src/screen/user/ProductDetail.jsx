'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { productsUtils, transformProductData } from '../../utils/products';
import { CartContext } from '../../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = await productsUtils.getProductById(id);
        setProduct(productData);
        setSelectedSize(productData.sizes?.[0] || 'S');
        const recommendedData = await productsUtils.getRecommendedProducts(productData.category._id, { limit: 4 });
        setRecommendedProducts(recommendedData.products || []);
      } catch (err) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    try {
      const item = {
        productId: product._id,
        quantity,
        size: selectedSize,
      };
      console.log('Adding to Cart:', item); // Debug log
      await addToCart(item);
      alert('Item added to cart successfully');
    } catch (err) {
      console.error('Add to Cart Error:', err); // Debug log
      alert('Failed to add item to cart');
    }
  };

  const setMainImage = (index) => {
    setActiveImage(index);
  };

  if (loading) {
    return (
      <div className="w-full py-10 flex justify-center items-center font-poppins">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 flex justify-center items-center font-poppins">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full py-10 flex justify-center items-center font-poppins">
        <div className="text-gray-600 text-lg">Product not found</div>
      </div>
    );
  }

  const currentPrice = product.price || 169.99;
  const originalPrice = product.price * 1.2 || 199.99;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-10 flex justify-center font-poppins">
      <div className="w-full max-w-7xl">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 md:mb-24">
          {/* Left Column - Images & Details */}
          <div className="w-full lg:w-3/5 flex flex-col gap-8">
            {/* Image Gallery - Mobile Version (Swipe Gallery) */}
            <div className="block lg:hidden relative w-full">
              <div className="relative w-full h-[350px] sm:h-[450px] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={(product.images && product.images[activeImage]) || 'https://placehold.co/640x678'}
                  alt={product.name}
                />
                <div className="px-3 py-1.5 left-3 top-3 absolute bg-white rounded-full shadow-md">
                  <div className="text-gray-600 text-xs font-normal">New in</div>
                </div>
              </div>
              
              {/* Thumbnail Navigation - Mobile */}
              <div className="flex justify-center mt-4 gap-2">
                {(product.images || []).slice(0, 4).map((img, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-sky-500' : 'bg-gray-300'}`}
                    onClick={() => setMainImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Image Gallery - Desktop Version */}
            <div className="hidden lg:flex gap-6">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {(product.images || []).slice(0, 4).map((img, index) => (
                  <div 
                    key={index} 
                    className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-24 lg:h-24 xl:w-32 xl:h-32 rounded-xl overflow-hidden cursor-pointer ${activeImage === index ? 'ring-2 ring-sky-500' : ''}`}
                    onClick={() => setMainImage(index)}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={img || 'https://placehold.co/140x157'}
                      alt={`${product.name} thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1 relative h-[500px] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={(product.images && product.images[activeImage]) || 'https://placehold.co/640x678'}
                  alt={product.name}
                />
                <div className="px-3.5 py-2 left-4 top-4 absolute bg-white rounded-full shadow-lg">
                  <div className="text-gray-600 text-xs font-normal">New in</div>
                </div>
                <div className="p-2.5 right-4 top-4 absolute bg-white rounded-full shadow-lg">
                  <div className="w-4 h-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details - Desktop */}
            <div className="hidden lg:block">
              <div className="w-full h-px bg-gray-200 mb-8"></div>
              
              <div className="space-y-8">
                <div>
                  <h1 className="text-gray-900 text-3xl md:text-4xl font-semibold mb-3">{product.name}</h1>
                  <p className="text-gray-600">{product.description || 'No description available.'}</p>
                </div>
                
                <div>
                  <h2 className="text-gray-900 text-xl font-semibold mb-2">Fabric + Care</h2>
                  <p className="text-gray-600">Material: Not specified</p>
                  <p className="text-gray-600">Color: Not specified</p>
                </div>
                
                <div>
                  <h2 className="text-gray-900 text-xl font-semibold mb-2">Sale performance</h2>
                  <p className="text-gray-600">Sales: 0</p>
                  <p className="text-gray-600">Review Count: -</p>
                  <p className="text-gray-600">Review Average: -</p>
                </div>
                
                <div>
                  <h2 className="text-gray-900 text-xl font-semibold mb-2">Keywords</h2>
                  <div className="flex flex-wrap gap-2">
                    {['men\'s fashion', 'accessory'].map((keyword, index) => (
                      <div key={index} className="px-3 py-1.5 bg-white rounded-full border border-gray-200">
                        <span className="text-gray-600 text-xs">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Section */}
          <div className="w-full lg:w-2/5">
            <div className="w-full p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200">
              {/* Price and Reviews */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-amber-400"></div>
                  <span className="text-gray-600 font-semibold">4.9</span>
                  <span className="text-gray-600 font-semibold">·</span>
                  <span className="text-gray-600 underline">142 reviews</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 text-xl md:text-2xl font-semibold">${currentPrice.toFixed(2)}</div>
                  <div className="text-gray-600 text-sm line-through">${originalPrice.toFixed(2)}</div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="text-gray-900 font-semibold mb-2">Size: {selectedSize}</div>
                <div className="grid grid-cols-4 gap-2">
                  {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
                    <button
                      key={size}
                      className={`py-2.5 rounded-xl border ${
                        selectedSize === size ? 'bg-sky-500 border-sky-500 text-white' : 'border-gray-200 text-gray-600'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="font-semibold">{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="px-3 py-2 bg-stone-50 rounded-full flex items-center gap-4">
                  <button
                    className={`w-6 h-6 ${quantity === 1 ? 'opacity-50' : ''} bg-white rounded-full border border-gray-200 flex items-center justify-center`}
                    onClick={decreaseQuantity}
                  >
                    <div className="w-2.5 h-px bg-gray-900"></div>
                  </button>
                  <span className="text-gray-600 font-medium w-6 text-center">{quantity}</span>
                  <button
                    className="w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center"
                    onClick={increaseQuantity}
                  >
                    <div className="w-2.5 h-2.5 bg-gray-900"></div>
                  </button>
                </div>
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-gray-900 rounded-full shadow-lg text-white font-medium flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to cart
                </button>
              </div>

              {/* Price Calculation */}
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-gray-600">${currentPrice.toFixed(2)} x {quantity}</span>
                    <span className="text-gray-600">${(currentPrice * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax estimate</span>
                    <span className="text-gray-600">$0</span>
                  </div>
                </div>
                <div className="w-full h-px border-b border-gray-200"></div>
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${(currentPrice * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Product Details - Mobile */}
            <div className="block lg:hidden mt-8 space-y-6">
              <div>
                <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold mb-2">{product.name}</h1>
                <p className="text-gray-600 text-sm sm:text-base">{product.description || 'No description available.'}</p>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-gray-900 text-lg font-semibold">Fabric + Care</h2>
                <p className="text-gray-600 text-sm">Material: Not specified</p>
                <p className="text-gray-600 text-sm">Color: Not specified</p>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-gray-900 text-lg font-semibold">Sale performance</h2>
                <p className="text-gray-600 text-sm">Sales: 0</p>
                <p className="text-gray-600 text-sm">Review Count: -</p>
                <p className="text-gray-600 text-sm">Review Average: -</p>
              </div>
              
              <div>
                <h2 className="text-gray-900 text-lg font-semibold mb-2">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {['men\'s fashion', 'accessory'].map((keyword, index) => (
                    <div key={index} className="px-3 py-1.5 bg-white rounded-full border border-gray-200">
                      <span className="text-gray-600 text-xs">{keyword}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="w-full mt-8 md:mt-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-10">
            <span className="text-gray-900">Recommended products. </span>
            <span className="text-gray-600/80 hidden sm:inline">Best matching products for you</span>
          </h2>

          {loading && <div className="text-gray-600 text-lg">Loading recommendations...</div>}
          
          {error && <div className="text-red-600 text-lg">Error: {error}</div>}
          
          {!loading && !error && (
            <div className="w-full">
              {recommendedProducts.length === 0 ? (
                <div className="text-gray-600 text-lg">No recommended products available</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                  {transformProductData(recommendedProducts).slice(0, 4).map((item) => (
                    <div key={item.id}>
                      <ProductCard
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        category={item.category}
                        currentPrice={item.currentPrice}
                        originalPrice={item.originalPrice}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;