import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { FaShoppingCart, FaTrashAlt, FaMinus, FaPlus, FaArrowRight, FaShoppingBag } from 'react-icons/fa';

const Cart = () => {
  const { cart, loading: cartLoading, error: cartError, removeCartItem, updateCartItem, fetchCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  // Fetch cart on mount to ensure fresh data
  useEffect(() => {
    const refreshCart = async () => {
      try {
        await fetchCart();
      } catch (err) {
        console.error('Fetch Cart Error:', err.message);
      }
    };
    refreshCart();
  }, [fetchCart]);

  // Handle quantity update
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, { quantity: newQuantity });
      await fetchCart(); // Refresh cart after update
    } catch (err) {
      console.error('Update Quantity Error:', err);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      await fetchCart(); // Refresh cart after removal
    } catch (err) {
      console.error('Remove Item Error:', err);
    }
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Handle shop navigation
  const handleShopNow = () => {
    navigate('/shop');
  };

  // Calculate total locally to ensure consistency
  const calculatedTotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  if (cartLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-xl font-medium font-poppins">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="bg-white p-6 sm:p-8 md:p-10 max-w-md w-full border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6">
            <FaShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700" />
          </div>
          <h2 className="text-center text-xl sm:text-2xl font-semibold font-poppins text-gray-800 mb-4">Error Loading Cart</h2>
          <p className="text-center text-gray-600 font-poppins mb-6 sm:mb-8">{cartError}</p>
          <button
            onClick={handleShopNow}
            className="w-full px-6 py-3 sm:px-8 sm:py-3.5 bg-gray-800 flex justify-center items-center text-white text-base font-medium font-poppins hover:bg-gray-700 transition-colors duration-300 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-20">
        <div className="bg-white p-6 sm:p-8 md:p-10 max-w-md w-full border border-gray-200 text-center rounded-lg shadow-sm">
          <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 sm:mb-8 text-gray-300 flex justify-center">
            <FaShoppingCart className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-gray-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold font-poppins text-gray-800 mb-3 sm:mb-4">Your cart is empty</h2>
          <p className="text-gray-600 text-base sm:text-lg font-poppins mb-6 sm:mb-8 md:mb-10">Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={handleShopNow}
            className="px-6 py-3 sm:px-8 sm:py-4 md:px-9 md:py-5 bg-gray-800 flex justify-center items-center text-white text-base font-medium font-poppins mx-auto hover:bg-gray-700 transition-colors duration-300 rounded-md"
          >
            <span>Explore now</span>
            <div className="ml-2">
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
        <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
          <FaShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800 mr-3 md:mr-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins text-gray-800">Your Cart</h1>
        </div>

        {/* Mobile Cart View */}
        <div className="md:hidden mb-6">
          {cart.items.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
              <div className="flex p-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.product.images && item.product.images[0] ? item.product.images[0] : 'https://via.placeholder.com/80'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80';
                    }}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <Link
                    to={`/products/${item.product._id}`}
                    className="text-gray-800 hover:text-gray-600 font-medium text-base font-poppins block mb-1"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-gray-600 text-sm mb-2">Size: {item.size}</div>
                  <div className="text-gray-800 font-medium">${item.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-8 text-center text-gray-800">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:text-gray-800"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-800 font-medium mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-gray-600 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Cart Table */}
        <div className="hidden md:block mb-6 md:mb-10 border border-gray-200 bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 lg:px-6 xl:px-10 py-4 text-left text-gray-800 text-base lg:text-lg font-semibold font-poppins">Product</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-gray-800 text-base lg:text-lg font-semibold font-poppins">Size</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-gray-800 text-base lg:text-lg font-semibold font-poppins">Quantity</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-gray-800 text-base lg:text-lg font-semibold font-poppins">Price</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-gray-800 text-base lg:text-lg font-semibold font-poppins">Total</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-gray-800 text-base lg:text-lg font-semibold font-poppins">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 lg:px-6 xl:px-10 py-4 lg:py-6">
                      <div className="flex items-center space-x-3 lg:space-x-5">
                        <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden">
                          <img
                            src={item.product.images && item.product.images[0] ? item.product.images[0] : 'https://via.placeholder.com/80'}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80';
                            }}
                          />
                        </div>
                        <div>
                          <Link
                            to={`/products/${item.product._id}`}
                            className="text-gray-800 hover:text-gray-600 font-medium text-base font-poppins"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 lg:py-6 text-gray-600 text-base font-poppins">{item.size}</td>
                    <td className="px-4 lg:px-6 py-4 lg:py-6">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <button 
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaMinus size={14} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                          className="w-12 lg:w-14 p-1 text-center border border-gray-200 bg-white text-gray-800 font-poppins"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 lg:py-6 text-gray-600 text-base font-poppins">${item.price.toFixed(2)}</td>
                    <td className="px-4 lg:px-6 py-4 lg:py-6 text-gray-800 font-medium text-base font-poppins">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-4 lg:px-6 py-4 lg:py-6">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="flex items-center text-gray-600 hover:text-red-500 font-medium text-sm font-poppins transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <FaTrashAlt size={16} className="mr-2" />
                        <span className="hidden lg:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white border border-gray-200 p-5 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
            <div className="mb-4 md:mb-0">
              <div className="text-gray-600 text-lg md:text-xl font-medium font-poppins mb-1 md:mb-2">Cart Total</div>
              <div className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins">${calculatedTotal.toFixed(2)}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleShopNow}
                className="px-6 sm:px-8 py-3 bg-white border border-gray-300 text-gray-800 font-medium font-poppins hover:bg-gray-50 transition-colors duration-300 rounded-md order-2 sm:order-1"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                className="px-6 sm:px-8 py-3 bg-gray-800 text-white font-medium font-poppins hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center rounded-md order-1 sm:order-2"
              >
                <span>Proceed to Checkout</span>
                <div className="ml-2">
                  <FaArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;