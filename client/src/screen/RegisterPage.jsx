// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateConfirmPassword } from '../utils/validationUtils';
import  registerUser  from '../utils/authUtils';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, general: '' }));

    // Frontend validation
    const isEmailValid = validateEmail(email, setErrors, setIsValid);
    const isPasswordValid = validatePassword(password, setErrors, setIsValid, confirmPassword, (value, currentPassword) =>
      validateConfirmPassword(value, currentPassword, setErrors, setIsValid)
    );
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword, password, setErrors, setIsValid);

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      setErrors((prev) => ({ ...prev, general: 'Please fix the errors above' }));
      return;
    }

    const result = await registerUser(email, password);

    if (result.success) {
      // Navigate to login without updating auth state
      navigate('/login');
    } else {
      setErrors((prev) => ({ ...prev, general: result.error }));
    }
  };

  return (
    <div className=" bg-gray-100 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-16 inline-flex justify-center items-start">
          <div className="flex-1 w-full max-w-sm sm:max-w-md inline-flex flex-col justify-start items-center gap-6 sm:gap-10 md:gap-14">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-8 sm:leading-10">Register</div>
            </div>
            {errors.general && (
              <div className="text-red-500 text-xs sm:text-sm text-center">{errors.general}</div>
            )}
            <div className="self-stretch flex flex-col justify-start items-center gap-4 sm:gap-5 md:gap-6">
              <form onSubmit={handleRegister} className="self-stretch w-full pb-2 flex flex-col justify-start items-center gap-4 sm:gap-5 md:gap-6">
                {/* Email field */}
                <div className="self-stretch w-full flex flex-col justify-start items-start gap-1 sm:gap-2">
                  <div className="inline-flex justify-start items-start">
                    <div className="justify-center text-gray-900 text-sm sm:text-base font-semibold font-poppins leading-normal">Email</div>
                  </div>
                  <div className="self-stretch w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center relative">
                    <input
                      type="email"
                      className="w-full h-5 bg-transparent border-none outline-none text-gray-600 text-xs sm:text-sm font-normal font-poppins"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value, setErrors, setIsValid);
                      }}
                      required
                    />
                    {email && (
                      <span>
                        {isValid.email ? (
                          <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                  )}
                </div>
                
                {/* Password field */}
                <div className="self-stretch w-full flex flex-col justify-start items-start gap-1 sm:gap-2">
                  <div className="inline-flex justify-start items-start">
                    <div className="justify-center text-gray-900 text-sm sm:text-base font-semibold font-poppins leading-normal">Password</div>
                  </div>
                  <div className="self-stretch w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center relative">
                    <input
                      type="password"
                      className="w-full h-5 bg-transparent border-none outline-none text-gray-600 text-xs sm:text-sm font-normal font-poppins"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value, setErrors, setIsValid, confirmPassword, (value, currentPassword) =>
                          validateConfirmPassword(value, currentPassword, setErrors, setIsValid)
                        );
                      }}
                      required
                    />
                    {password && (
                      <span>
                        {isValid.password ? (
                          <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                  {errors.password && (
                    <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                  )}
                </div>
                
                {/* Confirm Password field */}
                <div className="self-stretch w-full flex flex-col justify-start items-start gap-1 sm:gap-2">
                  <div className="inline-flex justify-start items-start">
                    <div className="justify-center text-gray-900 text-sm sm:text-base font-semibold font-poppins leading-normal">Password (Again)</div>
                  </div>
                  <div className="self-stretch w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center relative">
                    <input
                      type="password"
                      className="w-full h-5 bg-transparent border-none outline-none text-gray-600 text-xs sm:text-sm font-normal font-poppins"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        validateConfirmPassword(e.target.value, password, setErrors, setIsValid);
                      }}
                      required
                    />
                    {confirmPassword && (
                      <span>
                        {isValid.confirmPassword ? (
                          <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>
                  )}
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  className="self-stretch py-2.5 sm:py-3 md:py-3.5 bg-gray-900 rounded-full shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] shadow-xl inline-flex justify-center items-center overflow-hidden hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-start items-center">
                    <div className="justify-center text-white text-sm sm:text-base font-medium font-poppins leading-normal">Continue</div>
                  </div>
                </button>
              </form>
              
              {/* Divider */}
              <div className="w-full h-[1.60px] border border-gray-100" />
              <div className="relative">
                <div className="w-12 h-5 bg-gray-100 flex justify-center items-center">
                  <div className="justify-center text-gray-600 text-xs sm:text-sm font-medium font-poppins leading-tight">OR</div>
                </div>
              </div>
              
              {/* Login link */}
              <div className="justify-center">
                <span className="text-gray-600 text-sm sm:text-base font-normal font-poppins leading-normal">Already a member? </span>
                <Link to="/login" className="text-sky-500 text-sm sm:text-base font-normal font-poppins leading-normal hover:underline">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;