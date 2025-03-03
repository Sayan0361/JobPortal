import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedCompanies = ({ isDarkMode = false }) => {
  const companies = [
    { name: "Tata Consultancy Services", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1200px-Tata_Consultancy_Services_Logo.svg.png" },
    { name: "Infosys", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png" },
    { name: "Accenture", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png" },
    { name: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" },
    { name: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" },
    { name: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png" },
    { name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png" },
    { name: "IBM", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png" },
    { name: "Wipro", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else if (window.innerWidth < 1280) setItemsToShow(3);
      else setItemsToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [activeSlide]);

  const totalSlides = companies.length - itemsToShow + 1;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className={`w-full py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Top Companies Hiring</h2>
          <div className={`mt-2 h-1 w-24 mx-auto rounded-full bg-gradient-to-r ${isDarkMode ? "from-indigo-500 to-purple-500" : "from-indigo-600 to-purple-600"}`} />
          <p className={`mt-4 text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Explore opportunities with industry leaders</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full 
              ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"} 
              shadow-lg backdrop-blur-sm border ${isDarkMode ? "border-gray-700" : "border-gray-200"} 
              transition-all duration-300 hover:scale-110`}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * (100 / itemsToShow)}%)` }}>
              {companies.map((company, index) => (
                <div key={index} className="flex-none px-3" style={{ width: `${100 / itemsToShow}%` }}>
                  <div className={`h-72 p-6 rounded-xl border 
                      ${isDarkMode ? "border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800" : "border-gray-200 bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-gray-100"} 
                      shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105`}
                  >
                    <div className={`w-full h-40 mb-4 flex items-center justify-center rounded-lg p-3 
                        ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-50/90 hover:bg-gray-100/90"}`}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className={`max-w-full max-h-full object-contain transition-all duration-300 ease-in-out 
                          ${isDarkMode ? "filter brightness-150 contrast-110" : ""}`}
                      />
                    </div>
                    <h3 className={`text-lg font-bold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{company.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full 
              ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"} 
              shadow-lg backdrop-blur-sm border ${isDarkMode ? "border-gray-700" : "border-gray-200"} 
              transition-all duration-300 hover:scale-110`}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ease-out 
                ${activeSlide === index ? `${isDarkMode ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"} w-6` : `${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanies;