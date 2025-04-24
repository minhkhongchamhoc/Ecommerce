import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, loading, error, currentUserId, removeCartItem, updateCartItem, fetchCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  // Debug logs
  useEffect(() => {
    console.log('Cart State:', cart);
    console.log('Current User ID:', currentUserId);
    console.log('Cart User ID:', cart?.user);
    console.log('Cart Items:', cart?.items || []);
    console.log('Is Cart for Current User:', currentUserId && cart?.user === currentUserId);
  }, [cart, currentUserId]);

  // Handle quantity update
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, { quantity: newQuantity });
    } catch (err) {
      console.error('Update Quantity Error:', err);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
    } catch (err) {
      console.error('Remove Item Error:', err);
    }
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Refresh cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg font-medium">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg border border-gray-100">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm font-medium uppercase tracking-wide">
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Size</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.images && item.product.images[0] ? item.product.images[0] : 'https://via.placeholder.com/50'}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <Link
                      to={`/products/${item.product._id}`}
                      className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                    >
                      {item.product.name}
                    </Link>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">{item.size}</td>
                <td className="p-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="w-14 p-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </td>
                <td className="p-4 text-gray-600 text-sm">${item.price.toFixed(2)}</td>
                <td className="p-4 text-gray-600 text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors duration-200"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <p className="text-lg font-semibold text-gray-800">
            Total: ${cart.total.toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;