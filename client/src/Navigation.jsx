import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import RegisterPage from './screen/user/RegisterPage';
import LoginPage from './screen/user/LoginPage';
import AboutPage from './screen/user/AboutPage';
import Layout from './Layout';
import Home from './screen/user/HomePage';
import ProductDetail from './screen/user/ProductDetail';
import ShopPage from './screen/user/ShopPage';
import Cart from './screen/user/Cart';
import Admin from './screen/admin/Admin';

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
        <Route
          path="/about"
          element={isLoggedIn ? <AboutPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/*" element={<Admin/>}
        />
      </Routes>
    </Layout>
  );
};

export default Navigation;