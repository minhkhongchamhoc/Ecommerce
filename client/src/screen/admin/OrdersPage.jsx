
import React, { useState, useEffect, useContext } from 'react';
import { OrdersContext } from '../../contexts/OrderContext';

const OrdersPage = () => {
  const {
    orders,
    loading,
    error,
    fetchAllOrdersAdmin,
    searchOrdersByStatus,
    updateOrderStatus,
    updatePayment,
  } = useContext(OrdersContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 9, totalPages: 1 });
  const [filterStatus, setFilterStatus] = useState('');
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [formData, setFormData] = useState({ status: '', paymentStatus: '' });
  const [formError, setFormError] = useState('');

  // Status options
  const statusOptions = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
  const paymentStatusOptions = ['pending', 'paid', 'failed'];

  // Debug orders state
  useEffect(() => {
    console.log('Orders State in OrdersPage:', orders);
  }, [orders]);

  // Fetch orders based on filter or pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterStatus) {
          const response = await searchOrdersByStatus(filterStatus);
          const ordersData = response.orders || [];
          console.log('SearchOrdersByStatus Response:', response);
          setPagination({
            total: ordersData.length,
            page: 1,
            limit: ordersData.length,
            totalPages: 1,
          });
        } else {
          const response = await fetchAllOrdersAdmin({ page: currentPage, limit: 9 });
          console.log('FetchAllOrdersAdmin Response:', response);
          setPagination(response.pagination || { total: 0, page: 1, limit: 9, totalPages: 1 });
        }
      } catch (err) {
        console.error('Error fetching orders:', err, { message: err.message, stack: err.stack });
      }
    };
    fetchData();
  }, [fetchAllOrdersAdmin, searchOrdersByStatus, filterStatus, currentPage]);

  // Format currency
  const formatCurrency = (amount) => {
    return amount ? `$${Number(amount).toFixed(2)}` : 'N/A';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(''); // Clear error on input change
  };

  // Handle status filter change
  const handleFilterChange = (e) => {
    const newStatus = e.target.value;
    setFilterStatus(newStatus);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle update form submission
  const handleUpdateSubmit = async (e, orderId) => {
    e.preventDefault();
    setFormError('');
    try {
      const order = orders.find((o) => o._id === orderId);
      // Update payment status if changed
      if (formData.paymentStatus && formData.paymentStatus !== order.paymentStatus) {
        await updatePayment(orderId, { paymentStatus: formData.paymentStatus });
      }
      // Update order status only if paymentStatus is "paid"
      if (formData.status && formData.status !== order.status) {
        const currentPaymentStatus = formData.paymentStatus || order.paymentStatus;
        if (currentPaymentStatus !== 'paid') {
          setFormError('Trạng thái thanh toán phải là "Paid" trước khi thay đổi trạng thái đơn hàng.');
          return;
        }
        await updateOrderStatus(orderId, formData.status);
      }
      setEditingOrderId(null);
      setFormData({ status: '', paymentStatus: '' });
      // Refresh orders
      if (filterStatus) {
        await searchOrdersByStatus(filterStatus);
      } else {
        await fetchAllOrdersAdmin({ page: currentPage, limit: 9 });
      }
    } catch (err) {
      console.error('Error updating order:', err);
      setFormError(err.message || 'Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  // Open update form
  const openUpdateForm = (order) => {
    setEditingOrderId(order._id);
    setFormData({ status: order.status, paymentStatus: order.paymentStatus });
    setSelectedOrderId(null); // Close details if open
    setFormError('');
  };

  // Open details section
  const openDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setEditingOrderId(null); // Close update form if open
  };

  // Filter valid orders
  const validOrders = orders.filter(
    (order) =>
      order &&
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.orderSummary &&
      order.orderSummary.total !== undefined
  );

  return (
    <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Quản lý Đơn hàng</h1>
      </div>
  
      {/* Status Filter */}
      <div className="mb-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo trạng thái</label>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="w-full sm:w-auto sm:max-w-xs border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
        >
          <option value="">Tất cả</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
  
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : validOrders.length === 0 ? (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">Không có đơn hàng nào.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <div className="min-w-full divide-y divide-gray-200 block md:table">
              {/* Table Header */}
              <div className="bg-gray-50 hidden md:table-header-group">
                <div className="md:table-row">
                  <div className="px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                    Mã đơn hàng
                  </div>
                  <div className="px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                    Mã khách hàng
                  </div>
                  <div className="px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                    Tổng tiền
                  </div>
                  <div className="px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                    Trạng thái
                  </div>
                  <div className="px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                    Trạng thái TT
                  </div>
                  <div className="px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                    Hành động
                  </div>
                </div>
              </div>
              
              {/* Table Body */}
              <div className="bg-white divide-y divide-gray-200 block md:table-row-group">
                {validOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    {/* Order Row */}
                    <div className="block md:table-row hover:bg-gray-50 border-b md:border-b-0 border-gray-200">
                      {/* Mobile Order Header */}
                      <div className="md:hidden bg-gray-100 p-2 flex justify-between items-center">
                        <span className="font-medium text-sm text-gray-800">Đơn #{order._id.slice(-6)}</span>
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            onClick={() => openDetails(order._id)}
                          >
                            Chi tiết
                          </button>
                          <button
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            onClick={() => openUpdateForm(order)}
                          >
                            Cập nhật
                          </button>
                        </div>
                      </div>
                      
                      {/* Order ID */}
                      <div className="block md:table-cell px-2 sm:px-3 md:px-4 py-2 md:py-3">
                        <div className="md:hidden font-medium text-xs text-gray-500 mb-1">Mã đơn hàng</div>
                        <div className="text-sm font-medium text-gray-800 truncate max-w-xs">
                          {order._id}
                        </div>
                      </div>
                      
                      {/* Customer ID */}
                      <div className="block md:table-cell px-2 sm:px-3 md:px-4 py-2 md:py-3">
                        <div className="md:hidden font-medium text-xs text-gray-500 mb-1">Mã khách hàng</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {order.user?._id || 'N/A'}
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="block md:table-cell px-2 sm:px-3 md:px-4 py-2 md:py-3">
                        <div className="md:hidden font-medium text-xs text-gray-500 mb-1">Tổng tiền</div>
                        <div className="text-sm font-medium text-green-600">
                          {formatCurrency(order.orderSummary?.total)}
                        </div>
                      </div>
                      
                      {/* Order Status */}
                      <div className="block md:table-cell px-2 sm:px-3 md:px-4 py-2 md:py-3">
                        <div className="md:hidden font-medium text-xs text-gray-500 mb-1">Trạng thái</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipping' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      {/* Payment Status */}
                      <div className="block md:table-cell px-2 sm:px-3 md:px-4 py-2 md:py-3">
                        <div className="md:hidden font-medium text-xs text-gray-500 mb-1">Trạng thái TT</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                          order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.paymentStatus || 'N/A'}
                        </span>
                      </div>
                      
                      {/* Actions - Hidden on mobile as it's moved to the mobile header */}
                      <div className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 md:py-3 text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          onClick={() => openDetails(order._id)}
                        >
                          Chi tiết
                        </button>
                        <button
                          className="text-indigo-600 hover:text-indigo-800"
                          onClick={() => openUpdateForm(order)}
                        >
                          Cập nhật
                        </button>
                      </div>
                    </div>
  
                    {/* Update Form */}
                    {editingOrderId === order._id && (
                      <div className="block md:table-row">
                        <div className="block md:table-cell px-2 sm:px-3 md:px-4 py-4 bg-gray-50 md:border-t md:border-b md:border-gray-200" colSpan="6">
                          <form onSubmit={(e) => handleUpdateSubmit(e, order._id)}>
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Trạng thái đơn hàng
                                </label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  disabled={formData.paymentStatus !== 'paid' && order.paymentStatus !== 'paid'}
                                  className={`w-full border border-gray-300 rounded-md ${
                                    (formData.paymentStatus !== 'paid' && order.paymentStatus !== 'paid')
                                      ? 'bg-gray-100 cursor-not-allowed'
                                      : ''
                                  }`}
                                >
                                  <option value="">Chọn trạng thái</option>
                                  {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                  ))}
                                </select>
                                {(formData.paymentStatus !== 'paid' && order.paymentStatus !== 'paid') && (
                                  <p className="mt-1 text-sm text-red-600">
                                    Vui lòng đặt trạng thái thanh toán thành "Paid" trước.
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Trạng thái thanh toán
                                </label>
                                <select
                                  name="paymentStatus"
                                  value={formData.paymentStatus}
                                  onChange={handleInputChange}
                                  className="w-full border border-gray-300 rounded-md"
                                >
                                  <option value="">Chọn trạng thái</option>
                                  {paymentStatusOptions.map((status) => (
                                    <option key={status} value={status}>
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {formError && (
                              <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                <p className="text-sm text-red-700">{formError}</p>
                              </div>
                            )}
                            <div className="mt-4 flex justify-end space-x-2">
                              <button
                                type="button"
                                className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                                onClick={() => setEditingOrderId(null)}
                              >
                                Hủy
                              </button>
                              <button
                                type="submit"
                                className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                              >
                                Cập nhật
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
  
                    {/* Details Section */}
                    {selectedOrderId === order._id && (
                      <div className="block md:table-row">
                        <div className="block md:table-cell md:p-0">
                          <div className="bg-white border-t border-b border-gray-200 p-3 sm:p-4">
                            {/* Mobile close button at top */}
                            <div className="flex justify-end md:hidden mb-2">
                              <button
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                                onClick={() => setSelectedOrderId(null)}
                              >
                                Đóng
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Order & Customer Info */}
                              <div className="space-y-4">
                                <div className="bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Thông tin đơn hàng</h3>
                                  <div className="space-y-1">
                                    <p className="text-sm"><span className="text-gray-600">Mã đơn hàng:</span> <span className="font-medium break-all">{order._id}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Trạng thái:</span> <span className="font-medium">{order.status}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Ngày tạo:</span> <span className="font-medium">{new Date(order.created_at).toLocaleString()}</span></p>
                                  </div>
                                </div>
                                
                                <div className="bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Khách hàng</h3>
                                  <div className="space-y-1">
                                    <p className="text-sm"><span className="text-gray-600">Mã khách hàng:</span> <span className="font-medium break-all">{order.user?._id || 'N/A'}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Email:</span> <span className="font-medium break-all">{order.user?.email || 'N/A'}</span></p>
                                  </div>
                                </div>
  
                                <div className="bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Thông tin thanh toán</h3>
                                  <div className="space-y-1">
                                    <p className="text-sm"><span className="text-gray-600">Phương thức:</span> <span className="font-medium">{order.paymentInfo?.paymentMethod?.replace('_', ' ') || 'N/A'}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Số thẻ:</span> <span className="font-medium">{order.paymentInfo?.cardNumber ? order.paymentInfo.cardNumber.slice(-4).padStart(16, '**** ') : 'N/A'}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Tên trên thẻ:</span> <span className="font-medium">{order.paymentInfo?.nameOnCard || 'N/A'}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Trạng thái thanh toán:</span> <span className="font-medium">{order.paymentStatus || 'N/A'}</span></p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Products & Shipping Info */}
                              <div className="space-y-4">
                                <div className="bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Sản phẩm</h3>
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Tên</th>
                                          <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Kích thước</th>
                                          <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">SL</th>
                                          <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-gray-500">Giá</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                          <tr key={item._id}>
                                            <td className="px-2 sm:px-3 py-2 text-sm">{item.product?.name || 'N/A'}</td>
                                            <td className="px-2 sm:px-3 py-2 text-sm">{item.size || 'N/A'}</td>
                                            <td className="px-2 sm:px-3 py-2 text-sm">{item.quantity}</td>
                                            <td className="px-2 sm:px-3 py-2 text-sm font-medium text-green-600">{formatCurrency(item.price)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
  
                                <div className="bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Địa chỉ giao hàng</h3>
                                  <div className="space-y-1">
                                    <p className="text-sm"><span className="text-gray-600">Họ tên:</span> <span className="font-medium">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Địa chỉ:</span> <span className="font-medium">{order.shippingAddress?.addressLine1 || 'N/A'}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Thành phố:</span> <span className="font-medium">{order.shippingAddress?.city || 'N/A'}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Quốc gia:</span> <span className="font-medium">{order.shippingAddress?.country || 'N/A'}</span></p>
                                  </div>
                                </div>
  
                                <div className="bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Tổng hợp đơn hàng</h3>
                                  <div className="space-y-1">
                                    <p className="text-sm"><span className="text-gray-600">Tổng phụ:</span> <span className="font-medium">{formatCurrency(order.orderSummary?.subtotal)}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Phí vận chuyển:</span> <span className="font-medium">{formatCurrency(order.orderSummary?.shippingEstimate)}</span></p>
                                    <p className="text-sm"><span className="text-gray-600">Thuế:</span> <span className="font-medium">{formatCurrency(order.orderSummary?.taxEstimate)}</span></p>
                                    <p className="font-bold pt-1 mt-1 border-t border-gray-300 text-sm">
                                      <span className="text-gray-700">Tổng tiền:</span> <span className="text-green-600">{formatCurrency(order.orderSummary?.total)}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Desktop close button at bottom */}
                            <div className="mt-4 flex justify-end">
                              <button
                                className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                                onClick={() => setSelectedOrderId(null)}
                              >
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
  
          {/* Pagination Controls (only when not filtered) */}
          {!filterStatus && pagination.totalPages > 1 && (
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                Hiển thị {validOrders.length} / {pagination.total} đơn hàng
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                <button
                  className={`px-2 sm:px-3 py-1 border rounded text-sm ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                
                {/* Show limited page numbers on small screens */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // On mobile, show current, first, last, and pages +/- 1 from current
                    const isMobile = window.innerWidth < 640;
                    if (!isMobile) return true;
                    
                    return (
                      page === 1 || 
                      page === pagination.totalPages || 
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page) => (
                    <button
                      key={page}
                      className={`px-2 sm:px-3 py-1 border rounded text-sm ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))
                }
                
                <button
                  className={`px-2 sm:px-3 py-1 border rounded text-sm ${
                    currentPage === pagination.totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrdersPage;
