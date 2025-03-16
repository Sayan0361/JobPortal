import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, User } from "lucide-react";

const Navbar = ({ isDarkMode, toggleTheme, user, logout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        setIsLogoutConfirmOpen(true);
        if(user) logout(user.userType);

    };
    
    const handleConfirmLogout = () => {
        console.log("User type in logout: ", user);
        
        if(user) logout(user.userType); // Perform logout only when confirmed
        setIsLogoutConfirmOpen(false);
    };
    
    const handleCancelLogout = () => {
        setIsLogoutConfirmOpen(false); // Close the confirmation dialog without logging out
    };

    const getInitials = (name) => {
        const nameParts = name.split(" ");
        const initials =
            nameParts[0].charAt(0) + (nameParts.length > 1 ? nameParts[1].charAt(0) : "");

        console.log("Navbar user:", user);
        console.log("Navbar userType:", user.userType);
            
        return initials.toUpperCase();
    };

    return (
        <nav
            className={`w-full py-4 px-6 flex justify-between items-center shadow-lg backdrop-blur-lg transition-colors sticky top-0 z-50 $${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"}`}
        >
            {/* Logo */}
            <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                    <User size={32} />
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

                {/* Conditionally show "Post Job" link for employers */}
                {user && user.userType === 'employer' && (
                    <Link
                        to="/job-posting-page"
                        className="transition-all duration-200 transform hover:text-blue-600 hover:scale-105"
                    >
                        Post Job
                    </Link>
                )}

                <Link
                    to="/all-jobs"
                    className="transition-all duration-200 transform hover:text-blue-600 hover:scale-105"
                >
                    All Jobs
                </Link>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="hover:bg-gray-400 p-2 rounded-full transition-all duration-200 ease-in-out"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* User Info or Sign In/Sign Up */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={handleDropdownToggle}
                            className="flex items-center space-x-2"
                        >
                            {user.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                    {getInitials(user.name)}
                                </div>
                            )}
                            <span>{user.name}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className={`absolute top-12 right-0 w-48 rounded-md shadow-lg p-2 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                                    }`}
                            >
                                <button
                                    onClick={handleLogoutClick}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-500 rounded-md transition"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-500 rounded-md transition"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
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
                )}
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`absolute top-16 left-0 w-full p-6 space-y-4 transition-all duration-200 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
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

                    {/* Conditionally show "Post Job" link for employers in mobile */}
                    {user && user.userType === 'employer' && (
                        <Link
                            to="/job-posting-page"
                            className="block text-blue-600 hover:text-blue-800 hover:scale-105 transition-all duration-200"
                        >
                            Post Job
                        </Link>
                    )}

                    <Link
                        to="/all-jobs"
                        className="block text-blue-600 hover:text-blue-800 hover:scale-105 transition-all duration-200"
                    >
                        All Jobs
                    </Link>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="block w-full text-left hover:bg-gray-200 p-2 rounded-md transition-all duration-200"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* User Info or Sign In/Sign Up in Mobile */}
                    {user ? (
                        <div className="flex items-center space-x-3 border-t pt-4">
                            <button
                                onClick={handleDropdownToggle}
                                className="flex items-center space-x-2 w-full text-left"
                            >
                                {user.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                                <span className="text-sm font-medium">{user.name}</span>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className={`absolute top-20 right-4 w-48 rounded-md shadow-lg p-2 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                                        }`}
                                >
                                    <button
                                        onClick={handleLogoutClick}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-500 rounded-md transition"
                                    >
                                        Logout
                                    </button>
                                    <button
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-500 rounded-md transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2 border-t pt-4">
                            <Link
                                to="/signin"
                                className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="block text-center border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}

        {isLogoutConfirmOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
                <div
                    className={`p-6 rounded-xl shadow-2xl w-96 transition-transform transform scale-95 hover:scale-100 ${
                        isDarkMode
                            ? "bg-gray-800 text-white border border-gray-700"
                            : "bg-white text-black border border-gray-300"
                    }`}
                >
                    <h2 className="text-xl font-semibold mb-4 text-center">Confirm Logout</h2>
                    <p className="mb-6 text-center text-gray-400">Are you sure you want to log out?</p>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleCancelLogout}
                            className="px-5 py-2 rounded-lg border border-gray-500 text-gray-500 hover:bg-gray-600 hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmLogout}
                            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        )}


        </nav>
    );
};

export default Navbar;