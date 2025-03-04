const WhyChooseUs = ({ features = [], isDarkMode }) => {
    return (
      <div className="mb-16" data-aos="fade-up">
        <h2 className="text-center text-4xl font-bold mb-10 tracking-wide">
          Why Choose <span className="text-blue-500">JobConnect?</span>
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 text-center rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl 
                ${isDarkMode ? 
                  "bg-gray-800 text-gray-200 border border-gray-700 hover:border-blue-400 hover:bg-gray-900" 
                  : 
                  "bg-white text-gray-900 border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-blue-400">
                {feature.icon}
              </div>
  
              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3 tracking-wide">
                {feature.title}
              </h3>
  
              {/* Description */}
              <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {feature.description}
              </p>
  
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-10 rounded-2xl blur-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WhyChooseUs;
  