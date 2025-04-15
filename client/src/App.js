// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Thêm import Router
import './App.css';
import RegisterPage from './RegisterPage';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          {/* Trang login sẽ được thêm sau */}
          <Route path="/login" element={<div>Login Page (To be implemented)</div>} />
          <Route path="/" element={<RegisterPage />} /> {/* Trang mặc định */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;