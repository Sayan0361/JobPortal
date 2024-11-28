// src/components/Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, link, isDarkMode }) => {
  return (
    <div
      className={`border rounded-md shadow-md p-4 
        ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`
      }
    >
      <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
      <Link
        to={link}
        className="text-blue-500 hover:text-blue-600 mt-4 inline-block"
      >
        {link.includes('job') ? 'View Job Details' : 'View Company Details'}
      </Link>
    </div>
  );
};

export default Card;
