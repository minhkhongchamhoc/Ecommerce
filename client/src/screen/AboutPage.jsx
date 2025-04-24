import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Image from '../assets/image.png';
import Image1 from '../assets/image1.png';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Điều hướng đến trang CheckoutPage
    navigate('/checkout');
  };

  return (
    <div className="about-page-desktop min-h-screen bg-white flex flex-col">

      
      <main className="flex-1 py-10 flex justify-center">
        <div className="w-full max-w-6xl px-6">
          {/* Heading and intro */}
          <div className="flex flex-col gap-4 mb-16">
            <h2 className="text-4xl font-semibold text-gray-900">About us</h2>
            <p className="text-gray-600">
              We not only help you design exceptional products, but also make it easy for you 
              to share your designs with more like-minded people.
            </p>
          </div>

          {/* Page Content */}
          <div className="flex flex-col gap-20">
            {/* First Section */}
            <div className="flex gap-8 items-center">
              <div className="w-1/2 h-96 overflow-hidden rounded-lg">
                <img 
                  src={Image} 
                  alt="People working together" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                  Provide fashionable and<br />qualified products
                </h3>
                <p className="text-gray-600">
                  Already millions of people are very satisfied by this page builder and the number is growing more and more. 
                  Technology developing, requirements are increasing. Riode has brought.
                </p>
              </div>
            </div>

            {/* Second Section */}
            <div className="flex gap-8 items-center">
              <div className="w-1/2 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                  Provide fashionable and<br />qualified products
                </h3>
                <p className="text-gray-600">
                  Already millions of people are very satisfied by this page builder and the number is growing more and more. 
                  Technology developing, requirements are increasing. Riode has brought.
                </p>
              </div>
              <div className="w-1/2 h-96 overflow-hidden rounded-lg">
                <img 
                  src={Image1} 
                  alt="Store front" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-10">Get in touch with us</h3>
              
              <div className="flex gap-24">
                {/* Contact Info */}
                <div className="w-1/2 space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">nexton@example.com</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">000-123-456-7890</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">Socials</h4>
                    <div className="flex gap-2">
                      <a href="#" className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">f</a>
                      <a href="#" className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white">y</a>
                      <a href="#" className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white">t</a>
                      <a href="#" className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">i</a>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="w-1/2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Full name</label>
                    <input type="text" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Email address</label>
                    <input type="email" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Message</label>
                    <textarea className="w-full p-2 border rounded-md h-32"></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
  
 
    </div>
  );
};

export default AboutPage;