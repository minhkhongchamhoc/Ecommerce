import React from 'react';
import Svg4 from '../assets/svg4.svg';
import Userbtn from '../assets/userbtn.svg';
import Svg5 from '../assets/svg5.svg';

const Header = () => {
  return (
    <div className="w-full max-w-[1536px] mx-auto h-24 bg-white border-b border-gray-200 inline-flex flex-col justify-start items-start">
      <div className="self-stretch h-24 px-28 inline-flex justify-between items-center">
        <div className="pt-[3px] inline-flex flex-col justify-start items-end gap-0.5 overflow-hidden">
          <div className="justify-center text-gray-900 text-4xl font-semibold font-['Poppins'] leading-loose">NEXTON</div>
          <div className="justify-center text-gray-900 text-sm font-normal font-['Poppins'] leading-[9px]">eCommerce</div>
        </div>
        <div className="w-96 h-12 px-6 bg-stone-50 rounded-full flex justify-start items-center gap-2.5">
          <img src={Svg4} className="w-5 h-5" alt="Search" />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-gray-600 text-sm font-normal font-['Poppins'] leading-tight"
            placeholder="Search in products..."
          />
        </div>
        <div className="w-20 h-7 flex justify-between items-center">
          <img src={Userbtn} className="w-6 h-6" alt="User" />
          <div className="self-stretch inline-flex flex-col justify-between items-end">
            <div className="w-8 relative inline-flex justify-start items-end">
              <img src={Svg5} className="w-6 h-6" alt="Cart" />
              <div className="w-5 h-5 px-[5px] left-[14px] top-[-10px] absolute bg-sky-500 rounded-full inline-flex flex-col justify-center items-center gap-2.5">
                <div className="w-1.5 h-2.5 text-center justify-center text-white text-xs font-medium font-['Poppins'] leading-none">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;