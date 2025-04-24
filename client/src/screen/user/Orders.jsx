import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ordersUtils } from '../../utils/orders';

const Orders = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await ordersUtils.fetchOrders();
        console.log('Fetch Orders Raw Data:', data);
        setOrders(Array.isArray(data) ? data : data.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
        setLoading(false);
      }
    };

    loadOrders();
  }, [isLoggedIn, navigate]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    loadOrders();
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex justify-center items-center font-poppins">
        <div className="text-gray-600 text-lg animate-pulse">Loading your orders...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex justify-center items-center font-poppins">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
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
          <h2 className="text-3xl font-semibold text-gray-900">My Orders</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm text-gray-900 hover:text-gray-700"
          >
            Continue Shopping
          </button>
        </div>
        {orders.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg mb-4">No orders found.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-6 bg-white shadow-sm transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.orderSummary?.total?.toFixed(2) || '0.00'}
                    </p>
                    <p
                      className={`text-sm font-medium capitalize px-2 py-1 rounded-full inline-block ${
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
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
                  {order.items?.map((item) => (
                    <div key={item._id} className="flex gap-4 mb-4 items-start">
                      <img
                        src={item.product?.images?.[0] || 'https://placehold.co/80x80'}
                        alt={item.product?.name || 'Product'}
                        className="w-20 h-20 object-cover rounded-md"
                        onError={(e) => (e.target.src = 'https://placehold.co/80x80')}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.product?.name || 'Unknown Product'}
                        </p>
                        <p className="text-sm text-gray-600">Size: {item.size || 'N/A'}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          ${(item.price || 0).toFixed(2)}
                        </p>
                        <button
                          onClick={() => navigate(`/products/${item.product?._id}`)}
                          className="mt-2 text-sm text-gray-900 hover:text-gray-700 font-medium underline"
                          aria-label={`View details for ${item.product?.name || 'product'}`}
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleOrderDetails(order._id)}
                    className="text-gray-900 hover:text-gray-700 text-sm font-medium"
                    aria-expanded={expandedOrder === order._id}
                    aria-controls={`order-details-${order._id}`}
                  >
                    {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {expandedOrder === order._id && (
                  <div
                    id={`order-details-${order._id}`}
                    className="mt-4 border-t pt-4 text-sm text-gray-600"
                  >
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Order Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Shipping Address</p>
                        <p>
                          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                        </p>
                        <p>{order.shippingAddress?.addressLine1}</p>
                        {order.shippingAddress?.addressLine2 && (
                          <p>{order.shippingAddress?.addressLine2}</p>
                        )}
                        <p>
                          {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                          {order.shippingAddress?.postalCode}
                        </p>
                        <p>{order.shippingAddress?.country}</p>
                      </div>
                      <div>
                        <p className="font-medium">Contact Information</p>
                        <p>Email: {order.contactInfo?.email || 'N/A'}</p>
                        <p>Phone: {order.contactInfo?.phoneNumber || 'N/A'}</p>
                        <p className="mt-2 font-medium">Order Summary</p>
                        <p>Subtotal: ${(order.orderSummary?.subtotal || 0).toFixed(2)}</p>
                        <p>Shipping: ${(order.orderSummary?.shippingEstimate || 0).toFixed(2)}</p>
                        <p>Tax: ${(order.orderSummary?.taxEstimate || 0).toFixed(2)}</p>
                        <p className="font-semibold">
                          Total: ${(order.orderSummary?.total || 0).toFixed(2)}
                        </p>
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