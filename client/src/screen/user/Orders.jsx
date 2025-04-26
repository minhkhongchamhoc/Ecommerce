import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { OrdersContext } from '../../contexts/OrderContext';

const Orders = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { orders, loading, error, fetchOrders, cancelOrder } = useContext(OrdersContext);
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    fetchOrders(); // Trigger fetchOrders from context
  }, [isLoggedIn, navigate, fetchOrders]);

  const handleRetry = () => {
    fetchOrders();
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    try {
      await cancelOrder(orderId);
    } catch (err) {
      console.error('Error canceling order:', err);
      // Error is set in OrdersContext
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Filter out invalid orders (e.g., no items or missing critical fields)
  const validOrders = orders.filter(
    (order) => order && Array.isArray(order.items) && order.items.length > 0
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex justify-center items-center font-poppins">
        <div className="text-gray-600 text-lg animate-pulse font-poppins">Loading your orders...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex justify-center items-center font-poppins">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4 font-poppins">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 font-poppins"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 flex justify-center font-poppins">
      <div className="w-full max-w-6xl px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 font-poppins">My Orders</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm text-gray-900 hover:text-gray-700 font-poppins"
          >
            Continue Shopping
          </button>
        </div>
        {validOrders.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg mb-4 font-poppins">No orders found.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 font-poppins"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {validOrders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-6 bg-white shadow-sm transition-all font-poppins"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-600 font-poppins">
                      Placed on: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 font-poppins">
                      ${order.orderSummary?.total?.toFixed(2) || '0.00'}
                    </p>
                    <p
                      className={`text-sm font-medium capitalize px-2 py-1 rounded-full inline-block font-poppins ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2 font-poppins">Items</h4>
                  {order.items.map((item) => (
                    <div key={item._id} className="flex gap-4 mb-4 items-start">
                      <img
                        src={item.product?.images?.[0] || 'https://placehold.co/80x80'}
                        alt={item.product?.name || 'Product'}
                        className="w-20 h-20 object-cover rounded-md"
                        onError={(e) => (e.target.src = 'https://placehold.co/80x80')}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 font-poppins">
                          {item.product?.name || 'Unknown Product'}
                        </p>
                        <p className="text-sm text-gray-600 font-poppins">Size: {item.size || 'N/A'}</p>
                        <p className="text-sm text-gray-600 font-poppins">Quantity: {item.quantity || 1}</p>
                        <p className="text-sm font-semibold text-gray-900 font-poppins">
                          ${(item.price || 0).toFixed(2)}
                        </p>
                        {item.product?._id && (
                          <button
                            onClick={() => navigate(`/products/${item.product._id}`)}
                            className="mt-2 text-sm text-gray-900 hover:text-gray-700 font-medium underline font-poppins"
                            aria-label={`View details for ${item.product?.name || 'product'}`}
                          >
                            View Product
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="space-x-2">
                    <button
                      onClick={() => toggleOrderDetails(order._id)}
                      className="text-gray-900 hover:text-gray-700 text-sm font-medium font-poppins"
                      aria-expanded={expandedOrder === order._id}
                      aria-controls={`order-details-${order._id}`}
                    >
                      {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                    </button>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium font-poppins"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
                {expandedOrder === order._id && (
                  <div
                    id={`order-details-${order._id}`}
                    className="mt-4 border-t pt-4 text-sm text-gray-600 font-poppins"
                  >
                    <h4 className="text-sm font-medium text-gray-900 mb-2 font-poppins">Order Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium font-poppins">Shipping Address</p>
                        <p className="font-poppins">
                          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                        </p>
                        <p className="font-poppins">{order.shippingAddress?.addressLine1}</p>
                        {order.shippingAddress?.addressLine2 && (
                          <p className="font-poppins">{order.shippingAddress?.addressLine2}</p>
                        )}
                        <p className="font-poppins">
                          {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                          {order.shippingAddress?.postalCode}
                        </p>
                        <p className="font-poppins">{order.shippingAddress?.country}</p>
                      </div>
                      <div>
                        <p className="font-medium font-poppins">Contact Information</p>
                        <p className="font-poppins">Email: {order.contactInfo?.email || 'N/A'}</p>
                        <p className="font-poppins">Phone: {order.contactInfo?.phoneNumber || 'N/A'}</p>
                        <p className="mt-2 font-medium font-poppins">Order Summary</p>
                        <p className="font-poppins">Subtotal: ${(order.orderSummary?.subtotal || 0).toFixed(2)}</p>
                        <p className="font-poppins">Shipping: ${(order.orderSummary?.shippingEstimate || 0).toFixed(2)}</p>
                        <p className="font-poppins">Tax: ${(order.orderSummary?.taxEstimate || 0).toFixed(2)}</p>
                        <p className="font-semibold font-poppins">
                          Total: ${(order.orderSummary?.total || 0).toFixed(2)}
                        </p>
                        <p className="mt-2 font-medium font-poppins">Payment Information</p>
                        <p className="font-poppins">
                          Method:{' '}
                          {order.paymentInfo?.paymentMethod?.replace('_', ' ') || 'N/A'}
                        </p>
                        <p className="font-poppins">Status: {order.paymentStatus || 'N/A'}</p>
                        {order.paymentInfo?.cardNumber && (
                          <p className="font-poppins">
                            Card: {order.paymentInfo.cardNumber.slice(-4).padStart(16, '**** ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;