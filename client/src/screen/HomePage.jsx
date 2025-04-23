import React from 'react';
import ProductCard from '../components/ProductCard';
import { FaArrowRight, FaShippingFast, FaUndo, FaGlobe, FaMoneyCheckAlt } from 'react-icons/fa';

const Home = () => {
  // Sample product data
  const products = [
    {
      image: "https://placehold.co/600x400",
      name: "Black Automatic Watch",
      category: "Accessories",
      rating: 4.9,
      reviewCount: 98,
      currentPrice: 169.99,
      originalPrice: 199.99
    },
    {
      image: "https://placehold.co/600x400",
      name: "Leather Wristwatch",
      category: "Accessories",
      rating: 4.7,
      reviewCount: 76,
      currentPrice: 149.99,
      originalPrice: 179.99
    },
    {
      image: "https://placehold.co/600x400",
      name: "Sport Smartwatch",
      category: "Accessories",
      rating: 4.8,
      reviewCount: 112,
      currentPrice: 189.99,
      originalPrice: 219.99
    },
    {
      image: "https://placehold.co/600x400",
      name: "Gold Luxury Watch",
      category: "Accessories",
      rating: 5.0,
      reviewCount: 64,
      currentPrice: 249.99,
      originalPrice: 299.99
    }
  ];

  return (
    <div className="flex flex-col justify-start items-start">
      {/* Hero Section */}
      <div className="w-full relative flex flex-col justify-start items-center overflow-hidden">
        <img className="w-full h-[600px] left-0 top-0 absolute" src="https://placehold.co/600x400" alt="Hero Banner" />
        <div className="self-stretch h-[600px] px-28 py-5 relative flex flex-col justify-center items-start overflow-hidden">
          <div className="pb-5 flex flex-col justify-center items-start gap-6">
            <div className="flex justify-start items-center">
              <div className="text-gray-600 text-xl font-medium font-poppins leading-7">Starting from: $49.99</div>
            </div>
            <div className="flex justify-start items-start">
              <div className="text-gray-900 text-6xl font-semibold font-poppins leading-[72px]">Exclusive collection<br/>for everyone</div>
            </div>
            <div className="px-9 py-5 bg-gray-900 rounded-full shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] shadow-xl flex justify-center items-center overflow-hidden">
              <div className="flex justify-start items-center">
                <div className="text-white text-base font-medium font-poppins leading-normal">Explore now</div>
              </div>
              <div className="w-7 h-5 relative">
                <FaArrowRight className="w-5 h-5 left-[10px] top-0 absolute text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-28 pt-12 pb-8 flex justify-center items-center">
        <div className="flex-1 px-10 py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-center">
          <div className="flex-1 flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaShippingFast className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="flex justify-start items-start">
                <div className="text-gray-900 text-lg font-semibold font-poppins leading-7">Free shipping</div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">On orders over $50.00</div>
              </div>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="flex-1 px-8 flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaUndo className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="flex justify-start items-start">
                <div className="text-gray-900 text-lg font-semibold font-poppins leading-7">Very easy to return</div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">Just phone number</div>
              </div>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="flex-1 px-8 flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaGlobe className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="flex justify-start items-start">
                <div className="text-gray-900 text-lg font-semibold font-poppins leading-7">Worldwide delivery</div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">Fast delivery worldwide</div>
              </div>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="flex-1 px-8 flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <FaMoneyCheckAlt className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex flex-col justify-start items-start gap-0.5">
              <div className="flex justify-start items-start">
                <div className="text-gray-900 text-lg font-semibold font-poppins leading-7">Refunds policy</div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">60 days return for any reason</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-full px-28 py-20 flex flex-col justify-center items-start overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-start gap-10">
          <div className="flex justify-start items-start">
            <div className="justify-center">
              <span className="text-gray-900 text-4xl font-semibold font-poppins leading-10">Start exploring. </span>
              <span className="text-gray-600/80 text-4xl font-semibold font-poppins leading-10">Good things are waiting for you</span>
            </div>
          </div>
          <div className="self-stretch flex justify-center items-start gap-5">
            <div className="flex-1 self-stretch p-10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="flex justify-start items-start">
                    <div className="text-gray-900 text-2xl font-semibold font-poppins leading-loose">For Men's</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">Starting at $24</div>
                  </div>
                </div>
                <div className="pl-3 py-2 border-l-[3px] border-gray-200 flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center">
                    <div className="text-gray-600 text-sm font-medium font-poppins uppercase leading-tight">Shop Now</div>
                  </div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <FaArrowRight className="w-3 h-2 left-[0.01px] top-[3.81px] absolute text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="flex justify-start items-start">
                    <div className="text-gray-900 text-2xl font-semibold font-poppins leading-loose">For Women's</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">Starting at $19</div>
                  </div>
                </div>
                <div className="pl-3 py-2 border-l-[3px] border-gray-200 flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center">
                    <div className="text-gray-600 text-sm font-medium font-poppins uppercase leading-tight">Shop Now</div>
                  </div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <FaArrowRight className="w-3 h-2 left-[0.01px] top-[3.81px] absolute text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="flex justify-start items-start">
                    <div className="text-gray-900 text-2xl font-semibold font-poppins leading-loose">Accessories</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <div className="text-gray-600 text-sm font-normal font-poppins leading-tight">Explore accessories</div>
                  </div>
                </div>
                <div className="pl-3 py-2 border-l-[3px] border-gray-200 flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center">
                    <div className="text-gray-600 text-sm font-medium font-poppins uppercase leading-tight">Shop Now</div>
                  </div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <FaArrowRight className="w-3 h-2 left-[0.01px] top-[3.81px] absolute text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="self-stretch px-28 py-20 flex flex-col justify-center items-start overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-start gap-10 overflow-hidden">
          <div className="flex justify-start items-start">
            <div className="justify-center">
              <span className="text-gray-900 text-4xl font-semibold font-poppins leading-10">Recommendations. </span>
              <span className="text-gray-600/80 text-4xl font-semibold font-poppins leading-10">Best matching products for you</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-16">
            <div className="w-full flex justify-start items-start gap-5 overflow-hidden">
              {products.map((product, index) => (
                <div className="flex-1" key={index}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    category={product.category}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    currentPrice={product.currentPrice}
                    originalPrice={product.originalPrice}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="self-stretch px-28 py-20 flex flex-col justify-center items-start overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-start gap-10 overflow-hidden">
          <div className="flex justify-start items-start">
            <div className="justify-center">
              <span className="text-gray-900 text-4xl font-semibold font-poppins leading-10">Best Sellers. </span>
              <span className="text-gray-500 text-4xl font-semibold font-poppins leading-10">Best selling of the month</span>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-center gap-16">
            <div className="self-stretch flex justify-start items-start gap-5 overflow-hidden">
              {products.map((product, index) => (
                <div className="flex-1" key={index}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    category={product.category}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    currentPrice={product.currentPrice}
                    originalPrice={product.originalPrice}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="w-full px-28 py-12 flex flex-col justify-start items-center overflow-hidden">
        <div className="self-stretch relative bg-neutral-100 rounded-3xl flex flex-col justify-start items-start overflow-hidden">
          <img className="w-full h-[593px] left-[552px] top-[-0.44px] absolute" src="https://placehold.co/600x400" alt="Fashion Collection" />
          <div className="w-[971px] h-96 pl-28 pr-24 py-12 flex flex-col justify-center items-start gap-2.5 overflow-hidden">
            <div className="w-[552px] flex flex-col justify-start items-start gap-6">
              <div className="flex flex-col justify-start items-start gap-3.5">
                <div className="flex justify-start items-center">
                  <div className="text-gray-600 text-xl font-medium font-poppins leading-7">100% Original Products</div>
                </div>
                <div className="flex justify-start items-start">
                  <div className="text-gray-900 text-4xl font-semibold font-poppins leading-10">The All New Fashion<br/>Collection Items</div>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-gray-600 text-xl font-medium font-poppins leading-7">Starting from: $59.99</div>
              </div>
              <div className="px-8 py-3.5 bg-gray-900 rounded-full shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] shadow-xl flex justify-center items-center overflow-hidden">
                <div className="flex justify-start items-center">
                  <div className="text-white text-base font-medium font-poppins leading-normal">Shop now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;