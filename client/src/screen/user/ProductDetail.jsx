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
        const recommendedData = await productsUtils.getRecommendedProducts(productData.category._id);
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

  if (loading) {
    return (
      <div className="w-full pt-10 pb-16 flex justify-center items-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pt-10 pb-16 flex justify-center items-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full pt-10 pb-16 flex justify-center items-center">
        <div className="text-gray-600 text-lg">Product not found</div>
      </div>
    );
  }

  const currentPrice = product.price || 169.99;
  const originalPrice = product.price * 1.2 || 199.99;

  return (
    <div className="w-full pt-10 pb-16 flex justify-center items-center">
      <div className="pb-6 flex flex-col justify-start items-start gap-24 overflow-hidden max-w-7xl">
        {/* Product Section */}
        <div className="flex justify-start items-start gap-8 w-full flex-col lg:flex-row">
          {/* Left Column - Images & Details */}
          <div className="flex-1 flex flex-col justify-center items-start gap-12">
            {/* Image Gallery */}
            <div className="pb-3 flex justify-start items-start gap-6 flex-col md:flex-row">
              <div className="flex flex-row md:flex-col justify-start items-start gap-4 overflow-x-auto md:overflow-x-visible">
                {(product.images || []).slice(0, 4).map((img, index) => (
                  <img
                    key={index}
                    className="w-36 h-40 rounded-2xl"
                    src={img || 'https://placehold.co/140x157'}
                    alt={`${product.name} thumbnail ${index + 1}`}
                  />
                ))}
              </div>
              <div className="w-full md:w-[640px] h-full md:h-[678px] max-w-[640px] max-h-[678px] relative rounded-2xl flex justify-start items-start overflow-hidden">
                <img
                  className="w-full md:w-[640px] h-full object-cover"
                  src={product.images?.[0] || 'https://placehold.co/640x678'}
                  alt={product.name}
                />
                <div className="px-3.5 py-2 left-4 top-4 absolute bg-white rounded-full shadow-lg flex items-center gap-1">
                  <div className="w-3 h-3 outline outline-1 outline-offset-[-0.44px] outline-gray-600" />
                  <div className="text-gray-600 text-xs font-normal leading-none">New in</div>
                </div>
                <div className="p-2.5 right-4 top-4 absolute bg-white rounded-full shadow-lg flex justify-center items-center">
                  <div className="w-4 h-4 relative overflow-hidden">
                    <div className="w-1.5 h-1 left-[4.67px] top-[7.33px] absolute bg-gray-600" />
                    <div className="w-3.5 h-3.5 left-[0.86px] top-[0.67px] absolute bg-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200" />
            <div className="w-full flex flex-col justify-center items-start gap-14">
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <div className="pb-3">
                  <h1 className="text-gray-900 text-4xl font-semibold leading-10">{product.name}</h1>
                </div>
                <div>
                  <p className="text-gray-600 text-base font-normal leading-normal">
                    {product.description || 'No description available.'}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <div>
                  <h2 className="text-gray-900 text-2xl font-semibold leading-loose">Fabric + Care</h2>
                </div>
                <div className="w-full flex flex-col justify-center items-start">
                  <div>
                    <p className="text-gray-600 text-base font-normal leading-normal">Material: Not specified</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-base font-normal leading-normal">Color: Not specified</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <div>
                  <h2 className="text-gray-900 text-2xl font-semibold leading-loose">Sale performance</h2>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <div>
                    <p className="text-gray-600 text-base font-normal leading-normal">Sales: 0</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-base font-normal leading-normal">Review Count: -</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-base font-normal leading-normal">Review Average: -</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-2">
                <div>
                  <h2 className="text-gray-900 text-2xl font-semibold leading-loose">Keywords</h2>
                </div>
                <div className="w-full flex flex-wrap justify-start items-center gap-2">
                  {['men\'s fashion', 'accessory'].map((keyword, index) => (
                    <div
                      key={index}
                      className="px-3.5 py-2 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center gap-1"
                    >
                      <div className="w-3 h-3 outline outline-1 outline-offset-[-0.44px] outline-gray-600" />
                      <span className="text-gray-600 text-xs font-normal leading-none">{keyword}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Section */}
          <div className="w-full lg:w-[460px] relative overflow-hidden mt-8 lg:mt-0">
            <div className="w-full lg:w-[460px] pt-8 lg:pt-36 relative">
              <div className="w-full p-8 bg-white rounded-2xl shadow-lg outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-8 overflow-hidden">
                <div className="w-full flex justify-between items-start">
                  <div className="flex justify-center items-center gap-1.5">
                    <div className="w-4 h-4 bg-amber-400" />
                    <span className="text-gray-600 text-base font-semibold leading-normal">4.9</span>
                    <span className="text-gray-600 text-base font-semibold leading-normal">·</span>
                    <span className="text-gray-600 text-base font-medium underline leading-normal">142 reviews</span>
                  </div>
                  <div className="flex flex-col justify-center items-end gap-0.5">
                    <div>
                      <span className="text-gray-900 text-2xl font-semibold leading-loose">
                        ${currentPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm font-medium line-through leading-tight">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <div>
                    <span className="text-gray-900 text-base font-semibold leading-normal">
                      Size: {selectedSize}
                    </span>
                  </div>
                  <div className="w-full flex flex-wrap justify-between items-start gap-2">
                    {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
                      <button
                        key={size}
                        className={`w-16 py-2.5 rounded-xl outline outline-1 outline-offset-[-1px] 
                          ${selectedSize === size ? 'bg-sky-500 outline-sky-500' : 'outline-gray-200'} 
                          flex justify-center items-center overflow-hidden`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <span
                          className={`text-base font-semibold leading-normal ${
                            selectedSize === size ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          {size}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full flex justify-between items-center flex-wrap gap-4">
                  <div className="px-3 py-2 bg-stone-50 rounded-full flex justify-start items-center gap-4">
                    <button
                      className={`w-6 h-6 ${quantity === 1 ? 'opacity-50' : ''} bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-center`}
                      onClick={decreaseQuantity}
                    >
                      <div className="w-2.5 h-px bg-gray-900 mx-auto" />
                    </button>
                    <div className="flex justify-center items-center">
                      <span className="text-gray-600 text-base font-medium leading-normal">{quantity}</span>
                    </div>
                    <button
                      className="w-6 h-6 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-center items-center"
                      onClick={increaseQuantity}
                    >
                      <div className="w-2.5 h-2.5 bg-gray-900" />
                    </button>
                  </div>
                  <button
                    className="px-8 py-3.5 bg-gray-900 rounded-full shadow-xl flex justify-start items-center gap-2 overflow-hidden"
                    onClick={handleAddToCart}
                  >
                    <div className="w-4 h-4 relative overflow-hidden">
                      <div className="w-1.5 h-1 left-[4.67px] top-[7.33px] absolute bg-slate-50" />
                      <div className="w-3.5 h-3.5 left-[0.86px] top-[0.67px] absolute bg-slate-50" />
                    </div>
                    <span className="text-white text-base font-medium leading-normal">Add to cart</span>
                  </button>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <div className="w-full flex flex-col justify-start items-start gap-2.5">
                    <div className="w-full flex justify-between items-start">
                      <span className="text-gray-600 text-base font-normal leading-normal">
                        ${currentPrice.toFixed(2)} x {quantity}
                      </span>
                      <span className="text-gray-600 text-base font-normal leading-normal">
                        ${(currentPrice * quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full flex justify-between items-start">
                      <span className="text-gray-600 text-base font-normal leading-normal">Tax estimate</span>
                      <span className="text-gray-600 text-base font-normal leading-normal">$0</span>
                    </div>
                  </div>
                  <div className="w-full h-px border-b border-gray-200" />
                  <div className="w-full flex justify-between items-start">
                    <span className="text-gray-900 text-base font-semibold leading-normal">Total</span>
                    <span className="text-gray-900 text-base font-semibold leading-normal">
                      ${(currentPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="w-full flex flex-col justify-center items-start overflow-hidden">
          <div className="w-full flex flex-col justify-center items-start gap-10 overflow-hidden">
            <h2 className="text-gray-900 text-4xl font-semibold leading-10">Recommended products</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-hidden">
              {recommendedProducts.length === 0 ? (
                <div className="col-span-full text-gray-600 text-lg">No recommended products available</div>
              ) : (
                transformProductData(recommendedProducts).map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    currentPrice={item.currentPrice}
                    originalPrice={item.originalPrice}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;