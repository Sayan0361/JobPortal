// src/pages/Companies.js
import React from 'react';
import Card from '../components/Card'; // Import the Card component

const Companies = ({ isDarkMode }) => {
    const companies = [
        { id: 1, title: 'Tech Corp', description: 'A leading tech company specializing in AI solutions.', link: '/company-details/1' },
        { id: 2, title: 'Design Studios', description: 'An innovative design studio focused on user-centered design.', link: '/company-details/2' },
        { id: 3, title: 'Green Solutions', description: 'A sustainability company focused on eco-friendly technologies.', link: '/company-details/3' },
        { id: 4, title: 'Cloud Tech', description: 'Providing cloud solutions for businesses worldwide.', link: '/company-details/4' },
        { id: 5, title: 'Digital Innovations', description: 'Pioneering new digital technologies for the modern world.', link: '/company-details/5' },
        { id: 6, title: 'Smart Devices', description: 'Manufacturers of cutting-edge consumer electronics and smart devices.', link: '/company-details/6' },
        { id: 7, title: 'HealthTech Solutions', description: 'Using technology to improve healthcare systems and patient outcomes.', link: '/company-details/7' },
        { id: 8, title: 'FinTech Group', description: 'A financial technology company revolutionizing banking and payments.', link: '/company-details/8' },
        { id: 9, title: 'EcoPower', description: 'A renewable energy company providing sustainable energy solutions.', link: '/company-details/9' },
        { id: 10, title: 'AgriTech Innovations', description: 'Bringing modern technology to agriculture to improve productivity.', link: '/company-details/10' },
        { id: 11, title: 'EduTech Solutions', description: 'Creating online platforms for education and e-learning.', link: '/company-details/11' },
        { id: 12, title: 'Logistics Global', description: 'A logistics and supply chain management company operating worldwide.', link: '/company-details/12' },
        { id: 13, title: 'Retail Ventures', description: 'Building the future of retail with innovative shopping experiences.', link: '/company-details/13' },
        { id: 14, title: 'AI Innovations', description: 'Developing AI-based solutions for various industries.', link: '/company-details/14' },
        { id: 15, title: 'CyberSecure', description: 'Providing cybersecurity services to protect businesses from threats.', link: '/company-details/15' },
      ];

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-4xl font-bold mb-6">Top Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <Card
            key={company.id}
            title={company.title}
            description={company.description}
            link={company.link}
            isDarkMode={isDarkMode} // Pass isDarkMode to Card
          />
        ))}
      </div>
    </div>
  );
};

export default Companies;
