import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, User } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`w-full py-4 px-6 flex justify-between items-center shadow-md transition-colors sticky top-0 z-50 ${
        isDarkMode
          ? 'bg-gray-900 text-white' // Dark theme navbar color
          : 'bg-white text-black' // Light theme navbar color
      }`}
    >
      {/* Logo with Lucide Icon */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
          <User size={32} /> {/* User icon */}
          <span>JobConnect</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/"
          className="transition-all duration-200 transform hover:text-blue-600 hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/companies"
          className="transition-all duration-200 transform hover:text-blue-600 hover:scale-105"
        >
          Companies
        </Link>
        <Link
          to="/all-jobs"
          className="transition-all duration-200 transform hover:text-blue-600 hover:scale-105"
        >
          All Jobs
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-in-out"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Sign In / Sign Up */}
        <div className="flex space-x-3">
          <Link
            to="/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:scale-105 transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={handleMenuToggle}
          className="text-blue-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-in-out"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute top-16 left-0 w-full p-6 space-y-4 transition-all duration-200 ${
          isDarkMode
            ? 'bg-gray-800 text-white' // Dark theme mobile menu color
            : 'bg-white text-black' // Light theme mobile menu color
        }`}
      >
        <Link
          to="/"
          className="block text-blue-600 hover:text-blue-800 hover:scale-105 transition-all duration-200"
        >
          Home
        </Link>
        <Link
          to="/companies"
          className="block text-blue-600 hover:text-blue-800 hover:scale-105 transition-all duration-200"
        >
          Companies
        </Link>
        <Link
          to="/all-jobs"
          className="block text-blue-600 hover:text-blue-800 hover:scale-105 transition-all duration-200"
        >
          All Jobs
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="block w-full text-left hover:bg-gray-100 p-2 rounded-md transition-all duration-200"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Sign In / Sign Up Links */}
        <div className="flex flex-col space-y-2">
          <Link
            to="/signin"
            className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block text-center border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:scale-105 transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
