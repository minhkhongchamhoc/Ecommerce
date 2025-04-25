import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { validateEmail, validatePassword } from '../../utils/validationUtils.js';
import authUtils from '../../utils/authUtils.js';
import { auth, googleProvider } from '../../config/firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { setToken } from '../../utils/tokenStorage.js';

const { loginUser } = authUtils;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, general: '' }));

    // Frontend validation
    const isEmailValid = validateEmail(email, setErrors, setIsValid);
    const isPasswordValid = validatePassword(password, setErrors, setIsValid);

    if (!isEmailValid || !isPasswordValid) {
      setErrors((prev) => ({ ...prev, general: 'Please fix the errors above' }));
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      // Update auth state with user { id, email, role } and navigate to /about
      login(result.data.user, result.data.token);
    } else {
      setErrors((prev) => ({ ...prev, general: result.error }));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Starting Google login...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google auth successful:', result.user);

      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.user.email,
          googleId: result.user.uid,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
        console.log('Backend response:', data);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('Invalid response from server');
      }
      
      if (data && data.success) {
        console.log('Logging in with data:', data.user);
        setToken(data.token);
        login(data.user, data.token);
        navigate('/');
      } else {
        throw new Error(data?.message || 'Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setErrors((prev) => ({ 
        ...prev, 
        general: `Google login failed: ${error.message}. Please try again.` 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-16 inline-flex justify-center items-start">
          <div className="flex-1 w-full max-w-sm sm:max-w-md inline-flex flex-col justify-start items-center gap-6 sm:gap-10 md:gap-14">
            <div className="inline-flex justify-start items-start">
              <div className="justify-center text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins leading-8 sm:leading-10">Login</div>
            </div>
            {errors.general && (
              <div className="text-red-500 text-xs sm:text-sm text-center">{errors.general}</div>
            )}
            <div className="self-stretch flex flex-col justify-start items-center gap-4 sm:gap-5 md:gap-6">
              <form onSubmit={handleSubmit} className="self-stretch w-full pb-2 flex flex-col justify-start items-center gap-4 sm:gap-5 md:gap-6">
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
                        validatePassword(e.target.value, setErrors, setIsValid);
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

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="self-stretch py-2.5 sm:py-3 md:py-3.5 bg-white border border-gray-300 rounded-full shadow-sm inline-flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <span className="text-gray-600 text-sm sm:text-base font-medium font-poppins">Login with Google</span>
              </button>

              {/* Divider */}
              <div className="w-full h-[1.60px] border border-gray-100" />

              {/* OR text */}
              <div className="w-12 h-5 relative bg-gray-100">
                <div className="left-[16px] top-0 absolute inline-flex justify-start items-center">
                  <div className="justify-center text-gray-600 text-xs sm:text-sm font-medium font-poppins leading-tight">OR</div>
                </div>
              </div>

              {/* Register link */}
              <div className="justify-center">
                <span className="text-gray-600 text-sm sm:text-base font-normal font-poppins leading-normal">New user? </span>
                <Link to="/register" className="text-sky-500 text-sm sm:text-base font-normal Geometry Sans leading-normal hover:underline">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    
    </div>
  );
};

export default LoginPage;