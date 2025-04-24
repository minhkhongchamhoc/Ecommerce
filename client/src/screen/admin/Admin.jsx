import React from 'react';

const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
        <p className="text-gray-600">
          This is the admin dashboard. You can manage products, users, and orders from here.
        </p>
        <div className="mt-6 space-y-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            Manage Products
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            Manage Users
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;