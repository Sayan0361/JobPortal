import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBuilding, FaStar, FaHeart } from "react-icons/fa";

const CompanyCard = ({ company, location, salary, isDarkMode }) => {
    useEffect(() => {
        AOS.init({ duration: 1200, easing: "ease-in-out", once: true });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [isDarkMode]);

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

            {/* Company Name */}
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-2">{company}</h2>

            {/* Short Description */}
            <p className="text-center text-gray-500 mb-4">Innovating the future of technology.</p>

            {/* Job Details */}
            <div className="mt-4 space-y-3">
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

            {/* Details button */}
            <button
                className={`mt-6 w-full py-2 rounded-md font-semibold transition-all ${
                    isDarkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-500 text-white hover:bg-green-600"
                }`}
            >
                View Details
            </button>
        </div>
    );
};

export default CompanyCard;