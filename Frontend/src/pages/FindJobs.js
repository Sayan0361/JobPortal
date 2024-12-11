import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Search, MapPin, Briefcase, Users, TrendingUp, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const FindJobs = ({ isDarkMode }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [filteredJobSuggestions, setFilteredJobSuggestions] = useState([]);
  const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const faqs = [
    {
      question: 'How do I create a JobConnect account?',
      answer: 'Creating an account is easy! Click on the "Sign Up" button on the homepage and fill in your details.',
    },
    {
      question: 'Is JobConnect free to use?',
      answer: 'Yes, JobConnect is completely free for job seekers.',
    },
    {
      question: 'How can I apply for jobs?',
      answer: 'Once you find a job listing that matches your skills, click on the "Apply Now" button and follow the instructions.',
    },
    {
      question: 'Can I connect directly with employers?',
      answer: 'Yes, our platform allows you to connect and network with employers.',
    },
    {
      question: 'How do I search for jobs by location?',
      answer: 'Use the search bar to enter your desired location and find jobs nearby.',
    },
  ];

  const jobTitles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
    'Full Stack Developer',
    'Backend Engineer',
    'ML Engineer',
    'Frontend Developer',
    'Java Developer',
    'Mechanical Engineer',
    'Electrical Engineer',
    'Marketing Manager',
  ];

  const cities = [
    'New York',
    'Los Angeles',
    'Denver',
    'Kolkata',
    'Barrackpore',
    'Bangalore',
    'Delhi',
    'Mumbai',
    'Chennai',
    'San Franciso',
    'Pune',
  ];

  const features = [
    {
      icon: <Briefcase className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
      title: 'Thousands of Jobs',
      description: 'Access thousands of job listings from top companies across industries.',
    },
    {
      icon: <Users className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
      title: 'Expert Network',
      description: 'Connect with industry professionals and grow your network.',
    },
    {
      icon: <TrendingUp className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
      title: 'Career Growth',
      description: 'Get insights and resources to advance your career.',
    },
  ];

  const testimonials = [
    {
      feedback: "JobConnect has been an amazing platform to find the best job opportunities!",
      name: "Arjun Sharma",
      job: "Software Engineer",
    },
    {
      feedback: "I found my dream job through JobConnect. Highly recommend it!",
      name: "Priya Patel",
      job: "Data Scientist",
    },
    {
      feedback: "JobConnect made my job search so much easier! A great platform to connect with employers.",
      name: "Ravi Kumar",
      job: "Mechanical Engineer",
    },
    {
      feedback: "Thanks to JobConnect, I was able to land an amazing job in just a few weeks!",
      name: "Anjali Reddy",
      job: "Digital Marketer",
    },
    {
      feedback: "The platform is easy to use and helped me find a job that fits my skills perfectly.",
      name: "Vikram Singh",
      job: "Web Developer",
    },
  ];

  const categories = ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Design'];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [isDarkMode]);

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  

  const handleJobTitleChange = (e) => {
    const value = e.target.value;
    setJobTitle(value);

    if (value) {
      const filtered = jobTitles.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobSuggestions(filtered);
    } else {
      setFilteredJobSuggestions([]);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCitySuggestions(filtered);
    } else {
      setFilteredCitySuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for jobs:', { jobTitle, location });
  };

  const handleJobSuggestionClick = (suggestion) => {
    setJobTitle(suggestion);
    setFilteredJobSuggestions([]);
  };

  const handleCitySuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setFilteredCitySuggestions([]);
  };

  const highlightMatch = (text, match) => {
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <span key={index} className="bg-blue-500">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`container mx-auto px-4 py-12 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Section */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-400 to-indigo-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-400 to-indigo-800'}`}>
          Find Your Dream Job
        </h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Discover exciting job opportunities across various industries and locations.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden flex mb-12 flex-col md:flex-row`} data-aos="fade-up">
        <div className="flex-1 flex items-center border border-gray-300 rounded-l-lg mb-4 md:mb-0 md:mr-2">
          <Search className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="Job Title, Keywords"
            value={jobTitle}
            onChange={handleJobTitleChange}
            className={`w-full p-4 focus:outline-none rounded-l-lg ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
          />
        </div>
        <div className="flex-1 flex items-center border border-gray-300 mb-4 md:mb-0 md:mr-2">
          <MapPin className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="City, State, Country"
            value={location}
            onChange={handleLocationChange}
            className={`w-full p-4 focus:outline-none ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-3 rounded-r-lg ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} hover:bg-blue-700 transition-transform transform hover:scale-105 hover:shadow-md`}
        >
          Search Jobs
        </button>
      </form>

      {/* Job Title Suggestions */}
      {jobTitle && filteredJobSuggestions.length > 0 && (
        <ul className="mt-4">
          {filteredJobSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md cursor-pointer`}
              onClick={() => handleJobSuggestionClick(suggestion)}
            >
              {highlightMatch(suggestion, jobTitle)}
            </li>
          ))}
        </ul>
      )}

      {/* City Suggestions */}
      {location && filteredCitySuggestions.length > 0 && (
        <ul className="mt-4">
          {filteredCitySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md cursor-pointer`}
              onClick={() => handleCitySuggestionClick(suggestion)}
            >
              {highlightMatch(suggestion, location)}
            </li>
          ))}
        </ul>
      )}

      {/* Why Choose Us Section */}
      <div className="mb-16" data-aos="fade-up">
        <h2 className="text-center text-3xl font-bold mb-8">Why Choose JobConnect?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 text-center ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 hover:border-blue-400 hover:shadow-blue-900/50' : 'bg-white text-gray-900 border-gray-300 hover:bg-gradient-to-r hover:from-white hover:via-blue-50 hover:to-blue-100 hover:border-blue-500 hover:shadow-blue-200/70'} border rounded-md shadow-md hover:scale-105 transition-all duration-300 ease-in-out transform`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="mb-16" data-aos="fade-up">
        <h2 className="text-center text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`px-6 py-3 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'} shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:${isDarkMode ? 'bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-900' : 'bg-gradient-to-r hover:from-white hover:via-blue-50 hover:to-blue-100'}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

     {/* Featured Companies Section */}
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-center text-3xl font-bold mb-8">Top Companies Hiring</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          "Tata Consultancy Services",
          "Infosys",
          "Wipro",
          "HCL Technologies",
          "Accenture",
          "Cognizant",
          "Amazon",
          "Google",
        ].map((company, index) => (
          <div
            key={index}
            className={`p-4 text-center ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 hover:border-blue-400 hover:shadow-blue-900/50' : 'bg-white text-gray-900 border-gray-300 hover:bg-gradient-to-r hover:from-white hover:via-blue-50 hover:to-blue-100 hover:border-blue-500 hover:shadow-blue-200/70'} border rounded-md shadow-md hover:scale-105 transition-all duration-300 ease-in-out transform`}
          >
            <Building className="text-4xl mb-4 text-blue-600" />
            <p className="text-lg font-semibold">{company}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-center text-3xl font-bold mb-8">What Our Users Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-6 ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 hover:border-blue-400 hover:shadow-blue-900/50' : 'bg-white text-gray-900 border-gray-300 hover:bg-gradient-to-r hover:from-white hover:via-blue-50 hover:to-blue-100 hover:border-blue-500 hover:shadow-blue-200/70'} shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105  w-full sm:w-96`}
          >
            <p className="text-lg italic mb-4">"{testimonial.feedback}"</p>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.job}</p>
          </div>
        ))}
      </div>
    </div>

    {/* FAQ Section */}
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-center text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
            }`}
          >
            <button
              className="w-full flex justify-between items-center text-xl font-bold mb-2 focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              {faq.question}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  expandedIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedIndex === index && (
              <p
                className={`mt-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>


      {/* Call to Action Section */}
      <div className="text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
        <p className="mb-6 text-lg">
          Join JobConnect today and start your journey toward an amazing career.
        </p>
        <Link
          to="/signup"
          className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </Link>
      </div>

    </div>
  );
};

export default FindJobs;
