import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const RegisterPage = () => {
  return (
    <div className="register-page-desktop min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="main flex-1 flex items-center justify-center py-8">
        <div className="main-content bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="h2 text-3xl font-bold mb-6 text-center">Register</h2>
          <div className="form space-y-4">
            <div className="email-input space-y-2">
              <label className="h5 text-sm font-medium">Email</label>
              <input
                className="input w-full p-2 border rounded-md"
                placeholder="example@example.com"
              />
            </div>
            <div className="email-input space-y-2">
              <label className="h5 text-sm font-medium">Password</label>
              <input
                className="input w-full p-2 border rounded-md"
                type="password"
              />
            </div>
            <div className="email-input space-y-2">
              <label className="h5 text-sm font-medium">Password (Again)</label>
              <input
                className="input w-full p-2 border rounded-md"
                type="password"
              />
            </div>
            <button className="continue-btn w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              <div className="text-17">Continue</div>
            </button>
          </div>
          <div className="seperator flex items-center my-6">
            <div className="divabsolute flex-1 h-px bg-gray-300"></div>
            <div className="spanrelative mx-4 text-gray-500">
              <div className="text-18">OR</div>
            </div>
            <div className="divabsolute flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="text-19 text-center">
            <span className="already-a-member">Already a member? </span>
            <Link to="/login" className="login text-blue-600 hover:underline">Login</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegisterPage;