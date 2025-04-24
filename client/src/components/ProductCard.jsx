import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaStar } from 'react-icons/fa';

const ProductCard = ({
  id,
  image = "/api/placeholder/320/360",
  name = 'Black Automatic Watch',
  category = 'Accessories',
  currentPrice = 169.99,
  originalPrice = 199.99,
}) => {
  return (
    <Link
      to={`/products/${id}`}
      className="self-stretch inline-flex flex-col justify-start items-start gap-5 no-underline"
    >
      <div
        className="w-80 h-80 relative bg-slate-50 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="w-80 h-96 absolute top-[-6px] left-[-6px]"
          src={image}
          alt={name}
        />
        <div
          className="p-2.5 absolute top-[12px] right-4 bg-white rounded-full inline-flex flex-col justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add wishlist functionality here if needed
            console.log('Wishlist clicked');
          }}
        >
          <FaRegHeart className="w-4 h-4 text-gray-600" />
        </div>
      </div>
      
      <div className="w-80 px-4 inline-flex justify-start items-start gap-5">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-3.5 overflow-hidden">
          <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
            <div className="self-stretch inline-flex justify-start items-start">
              <div className="flex-1 justify-center text-gray-900 text-base font-semibold font-poppins leading-normal">
                {name}
              </div>
            </div>
            <div className="inline-flex justify-start items-center">
              <div className="justify-center text-gray-600 text-sm font-normal font-poppins leading-tight">
                {category}
              </div>
            </div>
          </div>
          <div className="inline-flex justify-start items-start gap-1">
            <FaStar className="w-5 h-5 text-amber-400" />
            <div className="flex justify-start items-center">
              <div className="justify-center text-gray-600 text-sm font-normal font-poppins leading-tight">
                4.9 (98)
              </div>
            </div>
          </div>
        </div>
        
        <div className="inline-flex flex-col justify-center items-end gap-0.5">
          <div className="inline-flex justify-start items-start">
            <div className="justify-center text-gray-900 text-base font-semibold font-poppins leading-normal">
              ${currentPrice.toFixed(2)}
            </div>
          </div>
          <div className="inline-flex justify-start items-center">
            <div className="justify-center text-gray-600 text-sm font-normal font-poppins line-through leading-tight">
              ${originalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;