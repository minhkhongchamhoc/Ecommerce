import React from 'react';
import { Link } from 'react-router-dom';
import Svg from '../assets/svg.svg';
import Svg1 from '../assets/svg1.svg';
import Svg2 from '../assets/svg2.svg';
import Svg3 from '../assets/svg3.svg';
import Stripe from '../assets/stripe.svg';
import visaIcon from '../assets/visa.png';
import paypalIcon from '../assets/paypal.png';
import verisignIcon from '../assets/verisign.png';

const Footer = () => {
  return (
    <div className="w-full max-w-full mx-auto flex flex-col justify-start items-center">
      <div className="w-full px-3 sm:px-4 md:px-8 lg:px-28 py-4 sm:py-6 md:py-10 border-t border-gray-200 flex flex-col justify-center items-start gap-3 sm:gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col justify-start items-start gap-3 sm:gap-4">
            <div className="flex flex-col justify-start items-start">
              <div className="w-28 sm:w-32 pt-[2px] flex flex-col justify-start items-start gap-0.5">
                <div className="justify-center text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-poppins leading-loose">NEXTON</div>
                <div className="justify-center text-gray-900 text-[10px] sm:text-xs md:text-sm font-normal font-poppins leading-[9px]">eCommerce</div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1.5 sm:gap-2">
              <div className="inline-flex justify-start items-center gap-1.5 sm:gap-2">
                <img src={Svg} className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5" alt="Facebook" />
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Facebook</div>
              </div>
              <div className="inline-flex justify-start items-center gap-1.5 sm:gap-2">
                <img src={Svg1} className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5" alt="Youtube" />
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Youtube</div>
              </div>
              <div className="inline-flex justify-start items-center gap-1.5 sm:gap-2">
                <img src={Svg2} className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5" alt="Telegram" />
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Telegram</div>
              </div>
              <div className="inline-flex justify-start items-center gap-1.5 sm:gap-2">
                <img src={Svg3} className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5" alt="Twitter" />
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Twitter</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-3 sm:gap-4">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-xs sm:text-sm md:text-base font-semibold font-poppins leading-normal">Getting started</div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1.5 sm:gap-2 md:gap-4">
              <div className="inline-flex justify-start items-center">
                <Link to="/about" className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-semibold font-poppins leading-normal hover:underline">About us</Link>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Upgrade Guide</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Browser Support</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Dark Mode</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-3 sm:gap-4">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-xs sm:text-sm md:text-base font-semibold font-poppins leading-normal">Explore</div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1.5 sm:gap-2 md:gap-4">
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Prototyping</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Design systems</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Pricing</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Security</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-3 sm:gap-4">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-xs sm:text-sm md:text-base font-semibold font-poppins leading-normal">Community</div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1.5 sm:gap-2 md:gap-4">
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Discussion Forums</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Code of Conduct</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">Contributing</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-xs sm:text-sm md:text-base font-normal font-poppins leading-normal">API Reference</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-3 sm:px-4 md:px-8 lg:px-28 py-3 sm:py-4 md:py-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
        <div className="flex justify-start items-center">
          <div className="justify-center text-gray-600 text-[10px] sm:text-xs md:text-sm lg:text-base font-normal font-poppins leading-normal">Nexton eCommerce. © 2024</div>
        </div>
        <div className="flex justify-start items-center gap-0.5 sm:gap-1 flex-wrap">
          <img src={visaIcon} className="w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 lg:w-14 lg:h-8" alt="Visa" />
          <img src={paypalIcon} className="w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 lg:w-14 lg:h-8" alt="Paypal" />
          <img src={Stripe} className="w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 lg:w-14 lg:h-8" alt="Stripe" />
          <img src={verisignIcon} className="w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 lg:w-14 lg:h-8" alt="Verisign" />
        </div>
      </div>
    </div>
  );
};

export default Footer;