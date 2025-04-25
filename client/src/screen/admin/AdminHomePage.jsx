import React from 'react';
import { FiBox, FiLayers, FiShoppingBag, FiUsers } from 'react-icons/fi';

const AdminHomePage = () => {
  // Sample stats for dashboard
  const stats = [
    { title: 'Total Products', value: '254', icon: <FiBox className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Categories', value: '12', icon: <FiLayers className="w-8 h-8" />, color: 'bg-green-100 text-green-600' },
    { title: 'New Orders', value: '24', icon: <FiShoppingBag className="w-8 h-8" />, color: 'bg-orange-100 text-orange-600' },
    { title: 'Customers', value: '1,254', icon: <FiUsers className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
          <div className="border-t border-gray-200 pt-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">#1234</td>
                  <td className="px-4 py-3 text-sm text-gray-600">John Doe</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$120.00</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Delivered</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">#1235</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Jane Smith</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$85.50</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Processing</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Products</h2>
          <div className="border-t border-gray-200 pt-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Black Automatic Watch</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$169.99</td>
                  <td className="px-4 py-3 text-sm text-gray-600">145</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Leather Wristwatch</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$149.99</td>
                  <td className="px-4 py-3 text-sm text-gray-600">98</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;