import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/image.png';
import Image1 from '../../assets/image1.png';

const AboutPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set state to show success message
  };

  return (
    <div className="about-page-desktop min-h-screen bg-white flex flex-col font-poppins">
      <main className="flex-1 py-6 md:py-8 lg:py-10 flex justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-6">
          {/* Heading and intro */}
          <div className="flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">About us</h2>
            <p className="text-gray-600 text-sm md:text-base">
              We not only help you design exceptional products, but also make it easy for you 
              to share your designs with more like-minded people.
            </p>
          </div>

          {/* Page Content */}
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {/* First Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
                <img 
                  src={Image} 
                  alt="People working together" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-3 md:space-y-4 mt-4 md:mt-0">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
                  Provide fashionable and qualified products
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Already millions of people are very satisfied by this page builder and the number is growing more and more. 
                  Technology developing, requirements are increasing. Riode has brought.
                </p>
              </div>
            </div>

            {/* Second Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="w-full md:w-1/2 space-y-3 md:space-y-4 order-2 md:order-1 mt-4 md:mt-0">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
                  Provide fashionable and qualified products
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Already millions of people are very satisfied by this page builder and the number is growing more and more. 
                  Technology developing, requirements are increasing. Riode has brought.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg order-1 md:order-2">
                <img 
                  src={Image1} 
                  alt="Store front" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 md:mb-8 lg:mb-10">Get in touch with us</h3>
              
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
                {/* Contact Info */}
                <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600 text-sm md:text-base">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 text-sm md:text-base">nexton@example.com</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600 text-sm md:text-base">000-123-456-7890</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">Socials</h4>
                    <div className="flex gap-3 md:gap-4">
                      {/* Facebook Icon */}
                      <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                      
                      {/* YouTube Icon */}
                      <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </a>
                      
                      {/* Twitter/X Icon */}
                      <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.676l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      
                      {/* LinkedIn Icon */}
                      <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </a>
                      
                      {/* Instagram Icon */}
                      <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  {isSubmitted ? (
                    <div className="bg-green-100 p-4 rounded-md flex items-center justify-between">
                      <p className="text-green-700 text-sm md:text-base font-poppins">
                        Form submitted successfully!
                      </p>
                      <button
                        className="text-gray-600 hover:text-gray-800 text-sm font-poppins"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="space-y-1 md:space-y-2">
                        <label className="text-sm font-medium text-gray-900">Full name</label>
                        <input type="text" className="w-full p-2 md:p-3 border rounded-md" />
                      </div>
                      
                      <div className="space-y-1 md:space-y-2">
                        <label className="text-sm font-medium text-gray-900">Email address</label>
                        <input type="email" className="w-full p-2 md:p-3 border rounded-md" />
                      </div>
                      
                      <div className="space-y-1 md:space-y-2">
                        <label className="text-sm font-medium text-gray-900">Message</label>
                        <textarea className="w-full p-2 md:p-3 border rounded-md h-24 md:h-32"></textarea>
                      </div>
                      
                      <button 
                        type="submit"
                        className="bg-gray-900 text-white px-5 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors text-sm md:text-base"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;