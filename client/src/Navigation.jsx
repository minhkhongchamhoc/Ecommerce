import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import RegisterPage from './screen/RegisterPage';
import LoginPage from './screen/LoginPage';
import AboutPage from './screen/AboutPage';
import Layout from './Layout';
import Home from './screen/HomePage';

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/about"
          element={isLoggedIn ? <AboutPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/about" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Layout>
  );
};

export default Navigation;