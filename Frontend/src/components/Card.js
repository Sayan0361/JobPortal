import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Card = ({ title, description, company, location, salary, isDarkMode }) => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div
            className={`border rounded-md shadow-md p-4 
        ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} 
        transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl`}
            data-aos="fade-up"
        >
            <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Company: {company}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Location: {location}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Salary: ${salary}</p>
            {/* <p className="text-gray-700 dark:text-gray-300 mt-2">Posted By: {postedBy}</p> */}
            {/* <Link
        to={link}
        className="text-blue-500 hover:text-blue-600 mt-4 inline-block transition-colors duration-200"
      >
        {link.includes('job') ? 'View Job Details' : 'View Company Details'}
      </Link> */}
        </div>
    );
};

export default Card;
