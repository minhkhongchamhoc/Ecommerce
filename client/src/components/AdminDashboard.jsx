// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { FiHome, FiBox, FiLayers, FiShoppingBag, FiChevronDown, FiChevronRight } from 'react-icons/fi';

import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsedSections, setCollapsedSections] = useState({});

  // Toggle section collapse
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Check if the current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Navigation items
  const navItems = [
    {
      title: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      path: "/admin",
    },
    {
      title: "Quản lí Sản phẩm",
      icon: <FiBox className="w-5 h-5" />,
      path: "/admin/products",
    },
    {
      title: "Quản lí Danh mục",
      icon: <FiLayers className="w-5 h-5" />,
      path: "/admin/categories",
    },
    {
      title: "Quản lí Đơn hàng",
      icon: <FiShoppingBag className="w-5 h-5" />,
      path: "/admin/orders",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)]">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative inline-flex flex-col justify-start items-end gap-0.5 overflow-hidden">
                <div className="w-8 h-8 left-0 top-0 absolute bg-gray-900 rounded-full" />
                <div className="w-5 h-5 left-[6px] top-[6px] absolute bg-white rounded-full" />
                <div className="w-2 h-2 left-[12px] top-[12px] absolute bg-gray-900 rounded-full" />
              </div>
              <div className="text-xl font-semibold text-gray-900">Admin Panel</div>
            </div>
          </div>
          <nav className="mt-4">
            {navItems.map((item, index) => (
              <div key={index}>
                <div
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                    isActive(item.path) ? 'bg-gray-100 border-l-4 border-gray-900' : ''
                  }`}
                  onClick={() => {
                    if (item.subItems) {
                      toggleSection(item.title);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{item.icon}</span>
                    <span className={`${isActive(item.path) ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {item.title}
                    </span>
                  </div>
                  {item.subItems && (
                    <span>
                      {collapsedSections[item.title] ? <FiChevronDown /> : <FiChevronRight />}
                    </span>
                  )}
                </div>
                {item.subItems && collapsedSections[item.title] && (
                  <div className="pl-12 bg-gray-50">
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ${
                          isActive(subItem.path) ? 'text-gray-900 font-medium' : 'text-gray-600'
                        }`}
                        onClick={() => navigate(subItem.path)}
                      >
                        {subItem.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-auto">
          <div className="p-6 min-h-[calc(100vh-4rem-16rem)] md:min-h-[calc(100vh-6rem-16rem)]">
            <Outlet />
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default AdminDashboard;