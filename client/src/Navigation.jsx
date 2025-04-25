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
import ShopPage from './screen/user/ShopPage';
import ProductDetail from './screen/user/ProductDetail';
import Cart from './screen/user/Cart';
import CheckoutPage from './screen/user/CheckoutPage';
import Orders from './screen/user/Orders';
// import ProfilePage from './screen/user/ProfilePage';

// PrivateRoute component to protect routes that require login
const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const Navigation = () => {
  useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Protected Routes */}
        {/* <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} /> */}
        <Route path="/checkout" element={<PrivateRoute element={<CheckoutPage />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default Navigation;