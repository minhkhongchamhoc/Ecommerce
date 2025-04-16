import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './screen/RegisterPage.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<div className="text-center p-8">Login Page (To be implemented)</div>} />
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;