import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`py-6 px-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Brand Section */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-400">JobConnect</h3>
          <p>Your gateway to exciting career opportunities across industries.</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                className={`transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                to="/all-jobs"
                className={`transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                All Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div>
          <h4 className="font-semibold mb-2">Connect With Us</h4>
          <div className="flex space-x-3">
            <a
              href="https://www.linkedin.com/in/subhradeep-basu-786aab209?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BkLdho5srQLWnqZCin%2F9jpw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/SubhradeepBasu5"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/subhradeepbasu12/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-4 border-t pt-4 border-gray-300">
        <p>&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
