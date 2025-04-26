import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import RegisterPage from './screen/user/RegisterPage';
import LoginPage from './screen/user/LoginPage';
import AboutPage from './screen/user/AboutPage';
import Layout from '../Layout';
import Home from './screen/user/HomePage';
import ProductsPage from './screen/admin/ProductsPage';
import OrdersPage from './screen/admin/OrdersPage';
import ShopPage from './screen/user/ShopPage';
import ProductDetail from './screen/user/ProductDetail';
import Cart from './screen/user/Cart';
import CheckoutPage from './screen/user/CheckoutPage';
import Orders from './screen/user/Orders';

const Navigation = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/"
          element={
            isLoggedIn && user?.role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
        />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isLoggedIn && user?.role === 'admin' ? (
              <OrdersPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            isLoggedIn && user?.role === 'admin' ? (
              <ProductsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            isLoggedIn && user?.role === 'admin' ? (
              <OrdersPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin" />} />
      </Routes>
    </Layout>
  );
};

export default Navigation;