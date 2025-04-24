import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import RegisterPage from './screen/user/RegisterPage';
import LoginPage from './screen/user/LoginPage';
import AboutPage from './screen/user/AboutPage';
import Layout from '../Layout';
import Home from './screen/user/HomePage';
import AdminDashboard from './components/AdminDashboard';
import AdminHomePage from './screen/admin/AdminHomePage';
import ProductsPage from './screen/admin/ProductsPage';
import CategoriesPage from './screen/admin/CategoriesPage';
import OrdersPage from './screen/admin/OrdersPage';
import ShopPage from './screen/user/ShopPage'; // Assuming this exists based on the original routes
import ProductDetail from './screen/user/ProductDetail'; // Assuming this exists
import Cart from './screen/user/Cart'; // Assuming this exists
import CheckoutPage from './screen/user/CheckoutPage'; // Assuming this exists
import Orders from './screen/user/Orders'; // Assuming this exists
import ProfilePage from './screen/user/ProfilePage'; // Assuming this exists
const Navigation = () => {
  const { isLoggedIn, user } = useContext(AuthContext);



  return (
    <Layout>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/*" element={
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<AdminHomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        } />
      </Routes>
    </Layout>
  );
};

export default Navigation;