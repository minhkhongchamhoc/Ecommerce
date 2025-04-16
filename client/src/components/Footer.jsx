import React from 'react';
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
    <div className="w-full max-w-[1536px] mx-auto inline-flex flex-col justify-start items-center">
      <div className="self-stretch px-28 py-14 border-t border-gray-200 flex flex-col justify-center items-start gap-2.5">
        <div className="self-stretch inline-flex justify-start items-start gap-5">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="flex flex-col justify-start items-start ">
              <div className="w-32 pt-[3px] flex flex-col justify-start items-end gap-0.5 overflow-hidden">
                <div className="justify-center text-gray-900 text-4xl font-semibold font-['Poppins'] leading-loose">NEXTON</div>
                <div className="justify-center text-gray-900 text-sm font-normal font-['Poppins'] leading-[9px]">eCommerce</div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="inline-flex justify-start items-center gap-2">
                <img src={Svg} className="w-5 h-5" alt="Facebook" />
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Facebook</div>
              </div>
              <div className="inline-flex justify-start items-center gap-2">
                <img src={Svg1} className="w-5 h-5" alt="Youtube" />
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Youtube</div>
              </div>
              <div className="inline-flex justify-start items-center gap-2">
                <img src={Svg2} className="w-5 h-5" alt="Telegram" />
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Telegram</div>
              </div>
              <div className="inline-flex justify-start items-center gap-2">
                <img src={Svg3} className="w-5 h-5" alt="Twitter" />
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Twitter</div>
              </div>
            </div>
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-base font-semibold font-['Poppins'] leading-normal">Getting started</div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Release Notes</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Upgrade Guide</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Browser Support</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Dark Mode</div>
              </div>
            </div>
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-base font-semibold font-['Poppins'] leading-normal">Explore</div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Prototyping</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Design systems</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Pricing</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Security</div>
              </div>
            </div>
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-base font-semibold font-['Poppins'] leading-normal">Community</div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Discussion Forums</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Code of Conduct</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Contributing</div>
              </div>
              <div className="inline-flex justify-start items-center">
                <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">API Reference</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch px-28 py-8 border-t border-neutral-200 inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-2.5">
          <div className="flex justify-start items-center">
            <div className="justify-center text-gray-600 text-base font-normal font-['Poppins'] leading-normal">Nexton eCommerce. © 2024</div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-1">
          <img src={visaIcon} className="w-14 h-8" alt="Visa" />
          <img src={paypalIcon} className="w-14 h-8" alt="Paypal" />
          <img src={Stripe} className="w-14 h-8" alt="Stripe" />
          <img src={verisignIcon} className="w-14 h-8" alt="Verisign" />
        </div>
      </div>
    </div>
  );
};

export default Footer;