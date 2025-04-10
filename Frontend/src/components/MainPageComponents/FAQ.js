import { useState } from "react";

const FAQ = ({ faqs = [], isDarkMode }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-center text-4xl font-bold mb-8">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-6 mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl shadow-lg border transition-all ${
              isDarkMode
                ? "bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-blue-400"
                : "bg-white text-zinc-900 border-zinc-300 hover:border-blue-500"
            }`}
          >
            {/* Question Button */}
            <button
              className="w-full flex justify-between items-center text-lg font-semibold transition-all px-2 py-2 rounded-md"
              onClick={() => handleToggle(index)}
            >
              <span
                className={`transition-all ${
                  expandedIndex === index ? "text-blue-400" : ""
                }`}
              >
                {faq.question}
              </span>

              {/* Expand/Collapse Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  expandedIndex === index ? "rotate-180 text-blue-400" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Animated Answer Section */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedIndex === index ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p
                className={`text-sm leading-relaxed px-2 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
