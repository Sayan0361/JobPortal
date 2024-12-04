import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../ConfigAPI.js';

const SignIn = ({ isDarkMode, onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('user'); // Toggle between 'user' and 'employer'

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Both fields are required');
            return;
        }

        console.log('Signing in:', { email, password, userType });

        setErrorMessage('');
        try {
            const response = await login({ email, password }, userType); // Assuming 'login' returns a promise

            console.log("Data:", response.data.data.user);
            

            if (response.status === 200) {
                // Login successful
                setShowSuccessDialog(true);
                console.log('User data:', response.data.data.user);
                
                const {email,name} = response.data.data.user;
                console.log("Email:",email);
                console.log("Name:",name);                
                
                setName(name);

                onLogin({email,name}); // Pass user data to parent if needed
            } else {
                // Handle unexpected status codes
                setErrorMessage('Unexpected response. Please try again.');
            }
        } catch (error) {
            // Handle errors (e.g., incorrect credentials, server issues)
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const handleContinue = () => {
        setShowSuccessDialog(false);
        navigate('/'); // Redirect to home or dashboard
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'
            }`}
        >
            {showSuccessDialog ? (
                <div
                    className={`p-6 rounded-lg shadow-lg text-center transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
                    }`}
                >
                    <h2
                        className={`text-xl font-semibold mb-4 ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                    >
                        Sign-In Successful!
                    </h2>
                    <p>Welcome back, {name}!</p>
                    <button
                        onClick={handleContinue}
                        className={`mt-4 px-4 py-2 rounded-md transition-colors ${
                            isDarkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        Continue
                    </button>
                </div>
            ) : (
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

                    {/* Toggle Section */}
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                userType === 'user'
                                    ? isDarkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-600 text-white'
                                    : isDarkMode
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => setUserType('user')}
                        >
                            User
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                userType === 'employer'
                                    ? isDarkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-600 text-white'
                                    : isDarkMode
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => setUserType('employer')}
                        >
                            Employer
                        </button>
                    </div>

                    {/* Form Section */}
                    <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                        {errorMessage && (
                            <div className="text-red-500 text-center">{errorMessage}</div>
                        )}
                        <input
                            type="text"
                            required
                            placeholder="Email"
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
                            Sign In as {userType === 'user' ? 'User' : 'Employer'}
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
            )}
        </div>
    );
};

export default SignIn;
