import React from "react";

const PopularCategories = ({ categories, isDarkMode }) => {
  return (
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-center text-4xl font-bold mb-10 tracking-wide">
        Popular <span className="text-blue-500">Categories</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative px-6 py-3 rounded-full text-lg font-semibold cursor-pointer transition-all transform hover:scale-110 hover:shadow-2xl
              ${isDarkMode
                ? "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-blue-400 hover:bg-zinc-900 shadow-blue-900/40"
                : "bg-white text-zinc-900 border border-zinc-300 hover:border-blue-500 hover:bg-blue-50 shadow-blue-200/70"
              }`}
          >
            {category}

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-20 rounded-full blur-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
