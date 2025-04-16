import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RegisterPage from './screen/RegisterPage.jsx';
import LoginPage from './screen/LoginPage.jsx';
import AboutPage from './screen/AboutPage.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Hàm này sẽ được truyền cho LoginPage để cập nhật trạng thái đăng nhập
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
          <Route 
            path="/about" 
            element={isLoggedIn ? <AboutPage /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/about" : "/register"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;