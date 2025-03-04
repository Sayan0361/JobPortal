import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Testimonials = ({ testimonials, isDarkMode }) => {
  return (
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-center text-4xl font-bold mb-10 tracking-wide">
        What Our <span className="text-blue-500">Users Say</span>
      </h2>

      {/* Swiper for Small Screens */}
      <div className="sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full px-4"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative p-8 text-center rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl 
                  ${isDarkMode ? 
                    "bg-gray-800 text-gray-200 border border-gray-700 hover:border-blue-400 hover:bg-gray-900" 
                    : 
                    "bg-white text-gray-900 border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                  }`}
              >
                <p className="text-lg italic text-gray-300 mb-4">"{testimonial.feedback}"</p>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.job}</p>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-10 rounded-2xl blur-xl" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid Layout for Larger Screens */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`relative p-8 text-center rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl 
              ${isDarkMode ? 
                "bg-gray-800 text-gray-200 border border-gray-700 hover:border-blue-400 hover:bg-gray-900" 
                : 
                "bg-white text-gray-900 border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
          >
            <p className="text-lg italic text-gray-300 mb-4">"{testimonial.feedback}"</p>
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-gray-400">{testimonial.job}</p>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-10 rounded-2xl blur-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
