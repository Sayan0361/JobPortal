import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Users, TrendingUp, Building, Globe, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FindJobs = ({ isDarkMode }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for jobs:', { jobTitle, location });
  };

  return (
    <div className={`container mx-auto px-4 py-12 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-blue-600' : 'text-blue-800'}`}>Find Your Dream Job</h1>
        <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} max-w-2xl mx-auto`}>
          Discover exciting job opportunities across various industries and locations.
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden flex mb-12 flex-col md:flex-row`}
      >
        {/* Job Title Input */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-l-lg mb-4 md:mb-0 md:mr-2">
          <Search className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="Job Title, Keywords"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className={`w-full p-4 focus:outline-none rounded-l-lg ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 flex items-center border border-gray-300 mb-4 md:mb-0 md:mr-2">
          <MapPin className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="City, State, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full p-4 focus:outline-none ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className={`px-6 py-3 rounded-r-lg ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} hover:bg-blue-700 transition-colors`}
        >
          Search Jobs
        </button>
      </form>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-center text-3xl font-bold mb-8">Why Choose JobConnect?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[{
            icon: <Briefcase className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
            title: 'Thousands of Jobs',
            description: 'Access thousands of job listings from top companies across industries.'
          },
          {
            icon: <Users className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
            title: 'Expert Network',
            description: 'Connect with industry professionals and grow your network.'
          },
          {
            icon: <TrendingUp className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
            title: 'Career Growth',
            description: 'Get insights and resources to advance your career.'
          }].map((feature, index) => (
            <div key={index} className={`text-center p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg rounded-lg`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="mb-16">
        <h2 className="text-center text-3xl font-bold mb-8">Popular Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {['Technology', 'Healthcare', 'Finance', 'Marketing', 'Education', 'Design'].map((category) => (
            <div
              key={category}
              className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow`}
            >
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{category}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>2,150 jobs</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Companies Section */}
      <div className="mb-16">
        <h2 className="text-center text-3xl font-bold mb-8">Featured Companies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[1, 2, 3, 4, 5, 6].map((company) => (
            <div
              key={company}
              className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} text-center p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow`}
            >
              <div className="text-4xl mb-4">
                <Building className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Company {company}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>New York, USA</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>12 open positions</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-center text-3xl font-bold mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((testimonial) => (
            <div
              key={testimonial}
              className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow`}
            >
              <div className="mb-4 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                "JobConnect helped me find my dream job within weeks. The platform is intuitive and the job matching is spot-on!"
              </p>
              <h4 className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>John Doe</h4>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Software Engineer</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section text-center">
        <div className="section-content">
          <h2 className={`cta-title text-3xl font-bold mb-4 ${isDarkMode ? 'text-blue-600' : 'text-blue-800'}`}>
            Ready to Start Your Journey?
          </h2>
          <p className={`cta-description mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join JobConnect today and unlock a world of opportunities.
          </p>
          <div className="cta-buttons">
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors mr-4"
            >
              Create Account
            </Link>
            <Link
              to="/signin"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
