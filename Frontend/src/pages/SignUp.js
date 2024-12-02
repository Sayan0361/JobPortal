import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../ConfigAPI"; // Ensure this is correctly imported

const SignUp = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
        profileImage: null,
        resume: null,
    });
    const [error, setError] = useState(""); // For displaying error messages
    const [success, setSuccess] = useState(false); // To indicate successful signup

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: e.target.files[0],
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setSuccess(false); // Reset success state

        console.log("Form data", formData);
        

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await signup(formData);
            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "user",
                profileImage: null,
                resume: null,
            }); // Reset form
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during signup");
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="max-w-md w-full space-y-8">
                {/* Title Section */}
                <div>
                    <h2
                        className={`mt-6 text-center text-3xl font-extrabold ${isDarkMode ? "text-blue-500" : "text-blue-600"
                            }`}
                    >
                        Create Your JobConnect Account
                    </h2>
                </div>

                {/* Form Section */}
                <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${isDarkMode
                            ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-blue-400 focus:border-blue-400"
                            : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${isDarkMode
                            ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-blue-400 focus:border-blue-400"
                            : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${isDarkMode
                            ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-blue-400 focus:border-blue-400"
                            : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${isDarkMode
                            ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200 focus:ring-blue-400 focus:border-blue-400"
                            : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />

                    {/* Role Selection - Radio Buttons */}
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === "user"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            User
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="employer"
                                checked={formData.role === "employer"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Employer
                        </label>
                    </div>


                    <input
                        type="file"
                        name="profileImage"
                        required
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    <input
                        type="file"
                        name="resume"
                        required
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    <button
                        type="submit"
                        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${isDarkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                            : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                            }`}
                    >
                        Sign Up
                    </button>
                </form>

                {/* Display error/success messages */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {success && (
                    <p className="text-green-500 text-center mt-4">
                        Account created successfully!
                    </p>
                )}

                {/* Footer Section */}
                <div className="text-center">
                    <p>
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className={`transition-colors ${isDarkMode
                                ? "text-blue-400 hover:text-blue-300"
                                : "text-blue-600 hover:underline"
                                }`}
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
