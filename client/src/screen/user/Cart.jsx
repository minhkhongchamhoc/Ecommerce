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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-xl font-medium font-poppins">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-28">
        <div className="bg-white p-10 max-w-md w-full border border-gray-200">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6">
            <FaShoppingCart className="w-10 h-10 text-gray-700" />
          </div>
          <h2 className="text-center text-2xl font-semibold font-poppins text-gray-800 mb-4">Error Loading Cart</h2>
          <p className="text-center text-gray-600 font-poppins mb-8">{cartError}</p>
          <button
            onClick={handleShopNow}
            className="w-full px-8 py-3.5 bg-gray-800 flex justify-center items-center text-white text-base font-medium font-poppins hover:bg-gray-700 transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-28 py-20">
        <div className="bg-white p-10 max-w-md w-full border border-gray-200 text-center">
          <div className="mx-auto w-32 h-32 mb-8 text-gray-300 flex justify-center">
            <FaShoppingCart className="w-32 h-32 text-gray-300" />
          </div>
          <h2 className="text-3xl font-semibold font-poppins text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 text-lg font-poppins mb-10">Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={handleShopNow}
            className="px-9 py-5 bg-gray-800 flex justify-center items-center text-white text-base font-medium font-poppins mx-auto hover:bg-gray-700 transition-colors duration-300"
          >
            <span>Explore now</span>
            <div className="w-7 h-5 relative ml-2">
              <FaArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-28">
        <div className="flex items-center mb-10">
          <FaShoppingCart className="w-8 h-8 text-gray-800 mr-4" />
          <h1 className="text-4xl font-semibold font-poppins text-gray-800">Your Cart</h1>
        </div>

        <div className="mb-10 border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-10 py-5 text-left text-gray-800 text-lg font-semibold font-poppins">Product</th>
                  <th className="px-6 py-5 text-left text-gray-800 text-lg font-semibold font-poppins">Size</th>
                  <th className="px-6 py-5 text-left text-gray-800 text-lg font-semibold font-poppins">Quantity</th>
                  <th className="px-6 py-5 text-left text-gray-800 text-lg font-semibold font-poppins">Price</th>
                  <th className="px-6 py-5 text-left text-gray-800 text-lg font-semibold font-poppins">Total</th>
                  <th className="px-6 py-5 text-left text-gray-800 text-lg font-semibold font-poppins">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-5">
                        <div className="flex-shrink-0 w-20 h-20 overflow-hidden">
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
                    <td className="px-6 py-6 text-gray-600 text-base font-poppins">{item.size}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-3">
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
                          className="w-14 p-1 text-center border border-gray-200 bg-white text-gray-800 font-poppins"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-600 text-base font-poppins">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-6 text-gray-800 font-medium text-base font-poppins">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-6 py-6">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="flex items-center text-gray-600 hover:text-gray-800 font-medium text-sm font-poppins uppercase transition-colors duration-200"
                      >
                        <FaTrashAlt size={16} className="mr-2" />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="bg-white border border-gray-200 p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="text-gray-600 text-xl font-medium font-poppins mb-2">Cart Total</div>
              <div className="text-gray-800 text-4xl font-semibold font-poppins">${calculatedTotal.toFixed(2)}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShopNow}
                className="px-8 py-3.5 bg-white border border-gray-300 text-gray-800 font-medium font-poppins hover:bg-gray-50 transition-colors duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                className="px-8 py-3.5 bg-gray-800 text-white font-medium font-poppins hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
              >
                <span>Proceed to Checkout</span>
                <div className="w-7 h-5 relative ml-2">
                  <FaArrowRight className="w-5 h-5 text-white" />
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