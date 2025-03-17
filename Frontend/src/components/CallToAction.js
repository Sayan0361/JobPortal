import React from "react";
import { Link } from "react-router-dom";

const CallToAction = ({ isDarkMode }) => {
  return (
    <div className="text-center py-16 px-6" data-aos="fade-up">
      <h2 className="text-4xl font-bold mb-4">
        Ready to <span className="text-blue-500">Find Your Dream Job?</span>
      </h2>
      <p className={`mb-6 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        Join <span className="font-semibold">HireMe</span> today and start your journey toward an amazing career.
      </p>

      <Link
        to="/signup"
        className={`inline-block px-8 py-3 rounded-full text-lg font-semibold border transition-all transform hover:scale-105 shadow-md
          ${isDarkMode
            ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 hover:border-blue-400 hover:shadow-blue-900/50"
            : "bg-blue-600 text-white border-blue-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/50"
          }`}
      >
        Get Started
      </Link>
    </div>
  );
};

export default CallToAction;
