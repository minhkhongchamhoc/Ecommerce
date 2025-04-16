import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ở đây bạn sẽ thêm logic xác thực người dùng
    // Đây chỉ là mô phỏng đơn giản
    if (email && password) {
      onLoginSuccess();
      navigate('/about');
    }
  };

  return (
    <div className="login-page-desktop min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="main flex-1 flex items-center justify-center py-8">
        <div className="main-content bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="h2 text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="form space-y-4">
            <div className="email-input space-y-2">
              <label className="h5 text-sm font-medium">Email</label>
              <input
                className="input w-full p-2 border rounded-md"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="email-input space-y-2">
              <label className="h5 text-sm font-medium">Password</label>
              <input
                className="input w-full p-2 border rounded-md"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="continue-btn w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              <div className="text-17">Continue</div>
            </button>
          </form>
          <div className="seperator flex items-center my-6">
            <div className="divabsolute flex-1 h-px bg-gray-300"></div>
            <div className="spanrelative mx-4 text-gray-500">
              <div className="text-18">OR</div>
            </div>
            <div className="divabsolute flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="text-19 text-center">
            <span className="new-user">New user? </span>
            <Link to="/register" className="register text-blue-600 hover:underline">Create an account</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;