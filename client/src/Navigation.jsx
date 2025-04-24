import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import RegisterPage from './screen/RegisterPage';
import LoginPage from './screen/LoginPage';
import AboutPage from './screen/AboutPage';
import Layout from './Layout';
import Home from './screen/HomePage';
import AdminDashboard from './components/AdminDashboard';
import AdminHomePage from './screen/admin/AdminHomePage';
import ProductsPage from './screen/admin/ProductsPage';
import CategoriesPage from './screen/admin/CategoriesPage';
import OrdersPage from './screen/admin/OrdersPage';

const Navigation = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  
  // Check if the user is an admin
  const isAdmin = isLoggedIn && user?.role === 'admin';

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route
        path="/about"
        element={isLoggedIn ? <Layout><AboutPage /></Layout> : <Navigate to="/login" />}
      />
      
      {/* Admin routes */}
      <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
      >
        <Route index element={<AdminHomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Navigation;