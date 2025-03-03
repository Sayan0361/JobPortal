import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaBuilding, FaStar, FaHeart, FaShareAlt } from "react-icons/fa";

const Card = ({ id, title, description, company, location, salary, isDarkMode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1200, easing: "ease-in-out", once: true });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [isDarkMode]);

    const handleApply = () => {
        console.log("Applying for job:", title);
        navigate('/apply-job', { state: { title, company, id } });
    };

    return (
        <div
            className={`group relative p-6 rounded-3xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl 
                ${isDarkMode ? 
                    "bg-gray-800 text-gray-200 border border-gray-700 hover:border-blue-400 hover:bg-gray-900 shadow-blue-900/40" 
                    : 
                    "bg-white text-gray-900 border border-gray-300 hover:border-blue-500 hover:bg-blue-50 shadow-blue-200/50"
                }`}
            data-aos="fade-up"
        >
            {/* Decorative Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent opacity-0 rounded-3xl blur-xl transition-all group-hover:opacity-10" />

            {/* Share Button */}
            <button
                className={`absolute top-4 left-4 p-2 rounded-full transition-all ${
                    isDarkMode
                        ? "text-gray-400 hover:text-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                }`}
            >
                <FaShareAlt className="text-xl" />
            </button>

            {/* Save Button */}
            <button
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                    isDarkMode
                        ? "text-gray-400 hover:text-red-500"
                        : "text-gray-500 hover:text-red-500"
                }`}
            >
                <FaHeart className="text-xl" />
            </button>

            {/* Company Logo */}
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                    <FaBuilding className="text-blue-500 text-4xl" />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-2">{title}</h2>

            {/* Description */}
            <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{description}</p>

            {/* Job Details */}
            <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                    <FaBriefcase className="text-blue-400 text-xl" />
                    <p className="text-lg font-medium">{company}</p>
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-400 text-xl" />
                    <p className="text-lg font-medium">{location}</p>
                </div>
                <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-400 text-xl" />
                    <p className="text-lg font-medium">${salary}</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-400 text-lg" />
                    ))}
                </div>
                <p className="text-gray-500">4.5/5</p>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleApply}
                    className={`relative px-6 py-3 text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden
                        ${isDarkMode ? 
                            "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/50" 
                            : 
                            "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-300/50"
                        }`}
                >
                    <span className="relative z-10">Apply Now</span>
                    {/* Glow Effect */}
                    <span className="absolute inset-0 bg-blue-500 opacity-20 blur-lg transition-all duration-500 hover:opacity-30"></span>
                </button>
            </div>
        </div>
    );
};

export default Card;