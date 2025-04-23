import React from 'react';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';

const ProductCard = ({
  image = "https://placehold.co/320x360",
  name = "Black Automatic Watch",
  category = "Accessories",
  rating = 4.9,
  reviewCount = 98,
  currentPrice = 169.99,
  originalPrice = 199.99,
}) => {
  return (
    <div className="w-full max-w-[384px] inline-flex flex-col justify-start items-start gap-4 sm:gap-5">
      {/* Product Image Container */}
      <div className="w-full xs:w-64 sm:w-80 md:w-96 h-60 xs:h-64 sm:h-80 relative bg-slate-50 rounded-2xl overflow-hidden">
        <img 
          className="w-full xs:w-64 sm:w-80 md:w-96 h-72 xs:h-80 sm:h-96 absolute top-[-6px]" 
          src={image} 
          alt={name} 
        />
        {/* Wishlist Button */}
        <div className="p-1.5 xs:p-2 sm:p-2.5 absolute right-2 xs:right-3 sm:right-4 top-[8px] xs:top-[10px] sm:top-[12px] bg-white rounded-full inline-flex flex-col justify-center items-center">
          <FaRegHeart className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-gray-600" />
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full xs:w-64 sm:w-80 md:w-96 px-1 xs:px-2 sm:px-4 inline-flex justify-start items-start gap-2 xs:gap-3 sm:gap-5">
        {/* Left Side - Product Info */}
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2 xs:gap-3 sm:gap-3.5 overflow-hidden">
          <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
            {/* Product Name */}
            <div className="self-stretch inline-flex justify-start items-start">
              <div className="flex-1 justify-center text-gray-900 text-xs xs:text-sm sm:text-base font-semibold font-poppins leading-normal">
                {name}
              </div>
            </div>
            {/* Product Category */}
            <div className="inline-flex justify-start items-center">
              <div className="justify-center text-gray-600 text-[10px] xs:text-xs sm:text-sm font-normal font-poppins leading-tight">
                {category}
              </div>
            </div>
          </div>
          {/* Product Rating */}
          <div className="inline-flex justify-start items-start gap-0.5 xs:gap-1">
            <div className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5 relative">
              <FaRegStar className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 absolute left-[1.74px] top-[2px] text-amber-400" />
            </div>
            <div className="flex justify-start items-center">
              <div className="justify-center text-gray-600 text-[10px] xs:text-xs sm:text-sm font-normal font-poppins leading-tight">
                {rating} ({reviewCount})
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Price */}
        <div className="outline-offset-[-2px] inline-flex flex-col justify-center items-end gap-0.5">
          <div className="inline-flex justify-start items-start">
            <div className="justify-center text-gray-900 text-xs xs:text-sm sm:text-base font-semibold font-poppins leading-normal">
              ${currentPrice.toFixed(2)}
            </div>
          </div>
          <div className="inline-flex justify-start items-center">
            <div className="justify-center text-gray-600 text-[10px] xs:text-xs sm:text-sm font-normal font-poppins line-through leading-tight">
              ${originalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;