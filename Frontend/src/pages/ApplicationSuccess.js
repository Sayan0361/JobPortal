import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ApplicationSuccess = ({ isDarkMode }) => {
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
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-100 text-zinc-900'}`}>
            <div className={`shadow-lg rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300 
                ${isDarkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-white text-zinc-900'}`}>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
                <p className="mb-2">You have successfully applied for the position of</p>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="mb-4"><strong>Company:</strong> {company}</p>
                <p className="text-green-500 font-semibold mb-8">We will review your application and get back to you soon!</p>
                <button 
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-200" 
                    onClick={handleBackToJobs}
                >
                    Browse More Jobs
                </button>
            </div>
        </div>
    );
};

export default ApplicationSuccess;
