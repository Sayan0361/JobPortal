import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ isDarkMode }) => {
    const [userType, setUserType] = useState("jobseeker");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        company: "",
        resume: null,
        profilePic: null,
    });
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("signUpData"));
        if (savedData) {
            setFormData(savedData.formData);
            setUserType(savedData.userType);
            setProfilePicPreview(savedData.profilePicPreview);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        setFormData((prev) => ({
            ...prev,
            [name]: file,
        }));

        if (name === "profilePic" && file) {
            const reader = new FileReader();
            reader.onload = () => setProfilePicPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            setPasswordError(
                "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
            );
        } else {
            setPasswordError("");
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (passwordError) {
            alert("Please fix the password error before submitting.");
            return;
        }

        const { resume, profilePic, ...formDataWithoutFiles } = formData;
        localStorage.setItem(
            "signUpData",
            JSON.stringify({
                formData: formDataWithoutFiles,
                userType,
                profilePicPreview,
            })
        );

        console.log(`${userType} SignUp Data:`, formDataWithoutFiles);

        setShowSuccessDialog(true);
    };

    const handleSuccessDialogClose = () => {
        setShowSuccessDialog(false);
        if (userType === "employer") {
            navigate("/job-posting-page"); // Redirect to the Job Posting page for Employers
        } else {
            navigate("/"); // Redirect to the homepage for Jobseekers
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="max-w-lg w-full space-y-8">
                <h2
                    className={`text-center text-3xl font-extrabold ${isDarkMode ? "text-blue-500" : "text-blue-600"
                        }`}
                >
                    Create Your Account
                </h2>

                <form className="space-y-6" onSubmit={handleSignUp}>
                    {/* User Type Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Select User Type
                        </label>
                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                onClick={() => setUserType("jobseeker")}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${userType === "jobseeker"
                                        ? isDarkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-500 text-white"
                                        : isDarkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Jobseeker
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType("employer")}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${userType === "employer"
                                        ? isDarkMode
                                            ? "bg-green-600 text-white"
                                            : "bg-green-500 text-white"
                                        : isDarkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Employer
                            </button>
                        </div>
                    </div>

                    {/* Profile Picture Upload */}
                    <label className="block text-sm font-medium mb-1">
                        Upload Profile Picture
                    </label>
                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <img
                                src={
                                    profilePicPreview ||
                                    "https://via.placeholder.com/100?text=Profile+Pic"
                                }
                                alt="Profile Preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                            />
                            <input
                                type="file"
                                name="profilePic"
                                onChange={handleFileChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Common Fields */}
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />
                    {passwordError && (
                        <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                    )}
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />

                    {/* Conditional Fields */}
                    {userType === "jobseeker" && (
                        <>
                            <label className="block text-sm font-medium mb-1">
                                Upload Your Resume
                            </label>
                            <input
                                type="file"
                                name="resume"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="block w-full px-3 py-2 rounded-md border"
                            />
                        </>
                    )}
                    {userType === "employer" && (
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                    ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                                    : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                        />
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md font-medium text-white ${isDarkMode
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

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

                {/* Success Dialog */}
                {showSuccessDialog && (
                    <div
                        className={`fixed inset-0 flex items-center justify-center bg-opacity-75 ${isDarkMode ? "bg-gray-800" : "bg-gray-500"
                            }`}
                        onClick={handleSuccessDialogClose}
                    >
                        <div
                            className={`bg-${isDarkMode ? "gray-800" : "white"
                                } p-8 rounded-lg shadow-lg`}
                        >
                            <h3
                                className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Account Created Successfully!
                            </h3>
                            <button
                                className={`mt-4 px-4 py-2 rounded-md ${isDarkMode
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                onClick={handleSuccessDialogClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
