'use client';
import React, { useState, useContext } from 'react';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isHamburgerDropdownOpen, setIsHamburgerDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra vai trò admin
  const isAdmin = user?.role === 'admin';

  // Toggle user dropdown (for larger screens)
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
    setIsHamburgerDropdownOpen(false);
  };

  // Toggle hamburger dropdown (for smaller screens)
  const toggleHamburgerDropdown = () => {
    setIsHamburgerDropdownOpen((prev) => !prev);
    setIsUserDropdownOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsHamburgerDropdownOpen(false);
  };

  // Handle cart icon click
  const handleCartClick = () => {
    navigate('/cart');
  };

  // Handle logo click (navigates to home page)
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-full mx-auto h-16 md:h-24 bg-white border-b border-gray-200 flex flex-col justify-start items-start">
      <div className="w-full max-w-[1536px] mx-auto px-4 md:px-28 h-16 md:h-24 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <div
            className="md:hidden pr-2 py-2 flex justify-start items-center gap-2.5 cursor-pointer"
            onClick={handleLogoClick}
            aria-label="Go to home page"
          >
            <div className="w-6 h-6 relative inline-flex flex-col justify-start items-end gap-0.5 overflow-hidden">
              <div className="w-6 h-6 left-0 top-0 absolute bg-gray-900 rounded-full" />
              <div className="w-4 h-4 left-[4px] top-[4px] absolute bg-white rounded-full" />
              <div className="w-2 h-2 left-[8px] top-[8px] absolute bg-gray-900 rounded-full" />
            </div>
          </div>
          <div
            className="hidden md:inline-flex pt-[3px] flex-col justify-start items-end gap-0.5 overflow-hidden cursor-pointer"
            onClick={handleLogoClick}
            aria-label="Go to home page"
          >
            <div className="justify-center text-gray-900 text-4xl font-semibold font-poppins leading-loose">NEXTON</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center">
          <SearchBar />
        </div>

        {/* User/Cart or Hamburger Menu */}
        <div className="flex items-center relative">
          {/* Hamburger Menu (Small Screens) */}
          <div className="md:hidden w-8 p-2 inline-flex flex-col justify-center items-center gap-[3px] cursor-pointer" onClick={toggleHamburgerDropdown}>
            <div className="self-stretch h-0.5 relative bg-gray-600 rounded-full" />
            <div className="self-stretch h-0.5 relative bg-gray-600 rounded-full" />
            <div className="self-stretch h-0.5 relative bg-gray-600 rounded-full" />
          </div>
          {/* Hamburger Dropdown */}
          {isHamburgerDropdownOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {isLoggedIn ? (
                <>
                  <div className="w-full px-4 py-2 text-left text-gray-900 font-poppins text-sm">
                    {isAdmin ? 'Hello, Admin' : 'Hello, User'}
                  </div>
                  {isAdmin ? (
                    <>
                      <button
                        onClick={() => { setIsHamburgerDropdownOpen(false); navigate('/admin/orders'); }}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => { setIsHamburgerDropdownOpen(false); navigate('/admin/products'); }}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        Products
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setIsHamburgerDropdownOpen(false); navigate('/orders'); }}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setIsHamburgerDropdownOpen(false); navigate('/login'); }}
                    className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setIsHamburgerDropdownOpen(false); navigate('/register'); }}
                    className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}

          {/* User and Cart (Large Screens) */}
          <div className="hidden md:flex w-20 h-7 justify-between items-center">
            <div className="relative">
              <FiUser className="w-6 h-6 text-gray-900 cursor-pointer" onClick={toggleUserDropdown} />
              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute top-8 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="w-full px-4 py-2 text-left text-gray-900 font-poppins text-sm">
                        {isAdmin ? 'Hello, Admin' : 'Hello, User'}
                      </div>
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => { setIsUserDropdownOpen(false); navigate('/admin/orders'); }}
                            className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                          >
                            Orders
                          </button>
                          <button
                            onClick={() => { setIsUserDropdownOpen(false); navigate('/admin/products'); }}
                            className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                          >
                            Products
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => { setIsUserDropdownOpen(false); navigate('/orders'); }}
                            className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                          >
                            My Orders
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setIsUserDropdownOpen(false); navigate('/login'); }}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => { setIsUserDropdownOpen(false); navigate('/register'); }}
                        className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-poppins text-sm"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            {/* Chỉ hiển thị icon giỏ hàng nếu không phải admin */}
            {!isAdmin && (
              <div className="self-stretch inline-flex flex-col justify-between items-end">
                <div className="w-8 relative inline-flex justify-start items-end cursor-pointer" onClick={handleCartClick}>
                  <FiShoppingCart className="w-6 h-6 text-gray-900" />
                  {cart?.items?.length > 0 && (
                    <div className="w-5 h-5 px-[5px] left-[14px] top-[-10px] absolute bg-sky-500 rounded-full inline-flex flex-col justify-center items-center gap-2.5">
                      <div className="w-1.5 h-2.5 text-center justify-center text-white text-xs font-medium font-poppins leading-none">
                        {cart.items.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;