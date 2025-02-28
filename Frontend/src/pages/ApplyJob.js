import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyJobSuccess = ({ isDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, company } = location.state || {
        title: "Undefined",
        company: "Undefined",
    };
    
    const handleBackToJobs = () => {
        navigate('/all-jobs');
    }


    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
            <div className={`shadow-lg rounded-2xl p-6 w-full max-w-md text-center transition-all duration-300 
                ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
                <h1 className="text-2xl font-bold mb-4">Application Submitted</h1>
                <p>You have successfully applied for the position of</p>
                <h2 className="text-xl font-semibold mt-2">{title}</h2>
                <p><strong>Company:</strong> {company}</p>
                <p className="text-green-600 font-semibold mt-4">We will review your application and get back to you soon!</p>
                <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition" onClick={handleBackToJobs}>Return to Jobs</button>
            </div>
        </div>
    );
};

export default ApplyJobSuccess;
