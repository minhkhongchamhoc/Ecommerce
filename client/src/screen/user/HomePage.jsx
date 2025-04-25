import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { FaArrowRight, FaShippingFast, FaUndo, FaGlobe, FaMoneyCheckAlt } from 'react-icons/fa';
import heroBanner from '../../assets/hero-banner.png';
import FashionBanner from '../../assets/fashion-banner.png';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ProductsContext } from '../../contexts/ProductContext';
import { transformProductData } from '../../utils/products';
import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useContext(CategoriesContext);
  const { products, loading: productsLoading, error: productsError, filterProducts } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Fetch products with limit of 4, run once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await filterProducts({ limit: 4 });
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Navigate to shop page with optional category filter
  const navigateToShop = (categoryName = '') => {
    if (categoryName) {
      navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
    } else {
      navigate('/shop');
    }
  };

  // Transform products for consistency
  const displayedProducts = transformProductData(products.slice(0, 4));

  return (
    <div className="flex flex-col justify-start items-start">
      {/* Hero Section */}
      <div className="w-full relative flex flex-col justify-start items-center overflow-hidden">
        <img className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover left-0 top-0 absolute" src={heroBanner} alt="Hero Banner" />
        <div className="self-stretch h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] px-4 sm:px-8 md:px-16 lg:px-28 py-5 relative flex flex-col justify-center items-start overflow-hidden">
          <div className="pb-5 flex flex-col justify-center items-start gap-2 sm:gap-4 md:gap-6">
            <div className="flex justify-start items-center">
              <div className="text-gray-600 text-base sm:text-lg md:text-xl font-medium font-poppins leading-7">Starting from: $49.99</div>
            </div>
            <div className="flex justify-start items-start">
              <div className="text-gray-900 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-poppins leading-tight md:leading-[72px]">
                Exclusive collection<br />for everyone
              </div>
            </div>
            <button 
              onClick={() => navigateToShop()}
              className="px-4 sm:px-6 md:px-9 py-3 md:py-5 bg-gray-900 rounded-full shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] shadow-xl flex justify-center items-center overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex justify-start items-center">
                <div className="text-white text-sm sm:text-base font-medium font-poppins leading-normal">Explore now</div>
              </div>
              <div className="w-5 sm:w-7 h-4 sm:h-5 relative">
                <FaArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - Stacked on mobile */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-28 pt-8 md:pt-12 pb-6 md:pb-8 flex justify-center items-center">
        <div className="flex-1 p-4 md:p-6 lg:px-10 lg:py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col md:flex-row justify-between items-stretch md:items-center">
          {/* Feature 1 */}
          <div className="flex-1 flex justify-start items-center gap-3 py-4 md:py-0">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaShippingFast className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="text-gray-900 text-base md:text-lg font-semibold font-poppins leading-tight md:leading-7">Free shipping</div>
              <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">On orders over $50.00</div>
            </div>
          </div>
          
          <div className="w-full md:w-px h-px md:h-12 bg-gray-200 my-1 md:my-0" />
          
          {/* Feature 2 */}
          <div className="flex-1 flex justify-start items-center gap-3 py-4 md:py-0 md:px-4 lg:px-8">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaUndo className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="text-gray-900 text-base md:text-lg font-semibold font-poppins leading-tight md:leading-7">Very easy to return</div>
              <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">Just phone number</div>
            </div>
          </div>
          
          <div className="w-full md:w-px h-px md:h-12 bg-gray-200 my-1 md:my-0" />
          
          {/* Feature 3 */}
          <div className="flex-1 flex justify-start items-center gap-3 py-4 md:py-0 md:px-4 lg:px-8">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaGlobe className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="text-gray-900 text-base md:text-lg font-semibold font-poppins leading-tight md:leading-7">Worldwide delivery</div>
              <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">Fast delivery worldwide</div>
            </div>
          </div>
          
          <div className="w-full md:w-px h-px md:h-12 bg-gray-200 my-1 md:my-0" />
          
          {/* Feature 4 */}
          <div className="flex-1 flex justify-start items-center gap-3 py-4 md:py-0 md:px-4 lg:px-8">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaMoneyCheckAlt className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="text-gray-900 text-base md:text-lg font-semibold font-poppins leading-tight md:leading-7">Refunds policy</div>
              <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">60 days return for any reason</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section - Stacked vertically on mobile */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-28 py-10 md:py-20 flex flex-col justify-center items-start overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-start gap-6 md:gap-10">
          <div className="flex flex-col sm:flex-row justify-start items-start">
            <div className="justify-center">
              <span className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10">Start exploring. </span>
              <span className="text-gray-600/80 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10">Good things are waiting for you</span>
            </div>
          </div>
          <div className="self-stretch flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-5">
            {/* Category 1 */}
            <div className="w-full md:flex-1 p-6 md:p-10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="text-gray-900 text-xl md:text-2xl font-semibold font-poppins leading-tight md:leading-loose">For Men's</div>
                  <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">Starting at $24</div>
                </div>
                <button 
                  onClick={() => navigateToShop("Men's fashion")}
                  className="pl-3 py-2 border-l-[3px] border-gray-200 flex justify-start items-center gap-2 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer"
                >
                  <div className="text-gray-600 text-xs md:text-sm font-medium font-poppins uppercase leading-tight">Shop Now</div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <FaArrowRight className="w-3 h-2 absolute text-gray-600" />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Category 2 */}
            <div className="w-full md:flex-1 p-6 md:p-10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="text-gray-900 text-xl md:text-2xl font-semibold font-poppins leading-tight md:leading-loose">For Women's</div>
                  <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">Starting at $19</div>
                </div>
                <button 
                  onClick={() => navigateToShop("Women's fashion")}
                  className="pl-3 py-2 border-l-[3px] border-gray-200 flex justify-start items-center gap-2 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer"
                >
                  <div className="text-gray-600 text-xs md:text-sm font-medium font-poppins uppercase leading-tight">Shop Now</div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <FaArrowRight className="w-3 h-2 absolute text-gray-600" />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Category 3 */}
            <div className="w-full md:flex-1 p-6 md:p-10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="text-gray-900 text-xl md:text-2xl font-semibold font-poppins leading-tight md:leading-loose">Accessories</div>
                  <div className="text-gray-600 text-xs md:text-sm font-normal font-poppins leading-tight">Explore accessories</div>
                </div>
                <button 
                  onClick={() => navigateToShop("Accessories")}
                  className="pl-3 py-2 border-l-[3px] border-gray-200 flex justify-start items-center gap-2 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer"
                >
                  <div className="text-gray-600 text-xs md:text-sm font-medium font-poppins uppercase leading-tight">Shop Now</div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <FaArrowRight className="w-3 h-2 absolute text-gray-600" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="self-stretch px-4 sm:px-8 md:px-16 lg:px-28 py-10 md:py-20 flex flex-col justify-center items-start overflow-hidden">
        {/* Content remains the same */}
        <div className="self-stretch flex flex-col justify-center items-start gap-6 md:gap-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-start items-start">
            <div className="justify-center flex flex-col sm:flex-row sm:items-center">
              <span className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10 mr-2">Recommendations. </span>
              <span className="text-gray-600/80 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10">Best matching products for you</span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-5">
            {productsLoading && <div className="text-gray-600">Loading products...</div>}
            {productsError && <div className="text-red-600">Error: {productsError}</div>}
            {!productsLoading && !productsError && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
                {displayedProducts.map((product) => (
                  <div className="w-full" key={product.id}>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      category={product.category}
                      currentPrice={product.currentPrice}
                      originalPrice={product.originalPrice}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Best Sellers Section - Rest of the code remains unchanged */}
      <div className="self-stretch px-4 sm:px-8 md:px-16 lg:px-28 py-10 md:py-20 flex flex-col justify-center items-start overflow-hidden">
        {/* Content remains the same */}
        <div className="self-stretch flex flex-col justify-center items-start gap-6 md:gap-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-start items-start">
            <div className="justify-center flex flex-col sm:flex-row sm:items-center">
              <span className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10 mr-2">Best Sellers. </span>
              <span className="text-gray-500 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10">Best selling of the month</span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-5">
            {productsLoading && <div className="text-gray-600">Loading products...</div>}
            {productsError && <div className="text-red-600">Error: {productsError}</div>}
            {!productsLoading && !productsError && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
                {displayedProducts.map((product) => (
                  <div className="w-full" key={product.id}>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      category={product.category}
                      currentPrice={product.currentPrice}
                      originalPrice={product.originalPrice}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fashion Collection Banner */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-28 py-6 md:py-12 flex flex-col justify-start items-center overflow-hidden">
        <div className="self-stretch relative bg-neutral-100 rounded-xl md:rounded-3xl flex flex-col justify-start items-start overflow-hidden">
          {/* Mobile banner image at top for small screens */}
          <div className="block md:hidden w-full h-48 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={FashionBanner}
              alt="Fashion Collection"
            />
          </div>
          
          {/* Original desktop layout with original styling */}
          <img className="hidden md:block md:w-full md:h-[593px] md:left-[552px] md:top-[-0.44px] md:absolute" src={FashionBanner} alt="Fashion Collection" />
          
          <div className="w-full p-6 md:w-[971px] md:h-96 md:pl-28 md:pr-24 md:py-12 flex flex-col justify-center items-start gap-2.5 overflow-hidden">
            <div className="w-full md:w-[552px] flex flex-col justify-start items-start gap-4 md:gap-6">
              <div className="flex flex-col justify-start items-start gap-2 md:gap-3.5">
                <div className="flex justify-start items-center">
                  <div className="text-gray-600 text-base md:text-xl font-medium font-poppins leading-tight md:leading-7">100% Original Products</div>
                </div>
                <div className="flex justify-start items-start">
                  <div className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-tight md:leading-10">
                    The All New Fashion<br />Collection Items
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-gray-600 text-base md:text-xl font-medium font-poppins leading-tight md:leading-7">Starting from: $59.99</div>
              </div>
              <button 
                onClick={() => navigateToShop()}
                className="px-6 py-2.5 md:px-8 md:py-3.5 bg-gray-900 rounded-full shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] shadow-xl flex justify-center items-center overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex justify-start items-center">
                  <div className="text-white text-sm md:text-base font-medium font-poppins leading-normal">Shop now</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;