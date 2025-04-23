import React from 'react';
import Svg4 from '../assets/svg4.svg';

const SearchBar = ({ placeholder = 'Search in products...' }) => {
  return (
    <>
      <div className="md:hidden w-48 h-9 px-4 bg-stone-50 rounded-full flex justify-start items-center gap-1.5">
        <div className="w-3.5 h-3.5 relative overflow-hidden">
          <div className="w-3 h-3 left-[1.17px] top-[1.17px] absolute  outline-[1.25px] outline-offset-[-0.62px] outline-gray-600" />
          <div className="w-px h-px left-[11.67px] top-[11.67px] absolute outline-[1.25px] outline-offset-[-0.62px] outline-gray-600" />
        </div>
        <div className="flex justify-start items-center">
          <div className="text-justify justify-center text-gray-600 text-xs font-normal font-['Poppins'] leading-none">{placeholder}</div>
        </div>
      </div>
      <div className="hidden md:flex w-96 h-12 px-6 bg-stone-50 rounded-full justify-start items-center gap-2.5">
        <img src={Svg4} className="w-5 h-5" alt="Search" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-gray-600 text-sm font-normal font-['Poppins'] leading-tight"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SearchBar;