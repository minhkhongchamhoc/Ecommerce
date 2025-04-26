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
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full py-4 sm:py-6 md:py-10 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {/* First column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="w-32 flex flex-col gap-0.5">
                  <div className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-semibold font-poppins leading-loose">NEXTON</div>
                  <div className="text-gray-900 text-xs md:text-sm font-normal font-poppins">eCommerce</div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Svg} className="w-4 md:w-5 h-4 md:h-5" alt="Facebook" />
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Facebook</div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Svg1} className="w-4 md:w-5 h-4 md:h-5" alt="Youtube" />
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Youtube</div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Svg2} className="w-4 md:w-5 h-4 md:h-5" alt="Telegram" />
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Telegram</div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Svg3} className="w-4 md:w-5 h-4 md:h-5" alt="Twitter" />
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Twitter</div>
                </div>
              </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-gray-900 text-sm md:text-base font-semibold font-poppins">Getting started</div>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <div>
                  <Link to="/about" className="text-gray-600 text-sm md:text-base font-semibold font-poppins hover:underline">About us</Link>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Upgrade Guide</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Browser Support</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Dark Mode</div>
                </div>
              </div>
            </div>

            {/* Third column */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-gray-900 text-sm md:text-base font-semibold font-poppins">Explore</div>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Prototyping</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Design systems</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Pricing</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Security</div>
                </div>
              </div>
            </div>

            {/* Fourth column */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-gray-900 text-sm md:text-base font-semibold font-poppins">Community</div>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Discussion Forums</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Code of Conduct</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">Contributing</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm md:text-base font-normal font-poppins">API Reference</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright and payment methods */}
      <div className="border-t border-neutral-200">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-gray-600 text-xs md:text-sm lg:text-base font-normal font-poppins">Nexton eCommerce. © 2024</div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <img src={visaIcon} className="w-10 md:w-12 lg:w-14 h-5 md:h-6 lg:h-8" alt="Visa" />
              <img src={paypalIcon} className="w-10 md:w-12 lg:w-14 h-5 md:h-6 lg:h-8" alt="Paypal" />
              <img src={Stripe} className="w-10 md:w-12 lg:w-14 h-5 md:h-6 lg:h-8" alt="Stripe" />
              <img src={verisignIcon} className="w-10 md:w-12 lg:w-14 h-5 md:h-6 lg:h-8" alt="Verisign" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;