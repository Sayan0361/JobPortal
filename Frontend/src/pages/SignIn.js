import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signing in:', { email, password });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Title Section */}
        <div>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold ${
              isDarkMode ? 'text-blue-500' : 'text-blue-600'
            }`}
          >
            Sign in to JobConnect
          </h2>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-blue-400 focus:border-blue-400'
                : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-blue-400 focus:border-blue-400'
                : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            }`}
          >
            Sign In
          </button>
        </form>

        {/* Footer Section */}
        <div className="text-center">
          <p>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className={`transition-colors ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:underline'
              }`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
