import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MapPin, Building2, DollarSign, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { saveJobToUser } from '../ConfigAPI';

const Card = ({ id, title, description, company, location, salary, jobType = "Full-time", postedDate = "2 days ago", isDarkMode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1200, easing: "ease-in-out", once: true });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [isDarkMode]);

    const handleApplications = () => {
        console.log("Applying for job:", title);  
        console.log("ID:", id);   
        saveJobToUser(id);           
        navigate('/apply-job', { state: { title, company } });
    }

    return (
        <div
            data-aos="fade-up"
            className={`group relative p-6 rounded-2xl transition-all duration-300
                ${isDarkMode 
                    ? "bg-gradient-to-br from-zinc-900/40 to-zinc-900/60 border border-white/5 hover:border-blue-500/20" 
                    : "bg-gradient-to-br from-white/60 to-white/80 border border-white/20 hover:border-blue-500/20"} 
                backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1`}
        >
            {/* Job Type Badge */}
            <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full
                    ${isDarkMode 
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-blue-500/10 text-blue-600"}`}
                >
                    {jobType}
                </span>
                <span className={`flex items-center text-sm
                    ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
                >
                    <Clock size={14} className="mr-1" />
                    {postedDate}
                </span>
            </div>

            {/* Title and Company */}
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300
                ${isDarkMode 
                    ? "text-zinc-200 group-hover:text-blue-400" 
                    : "text-zinc-800 group-hover:text-blue-600"}`}
            >
                {title}
            </h3>

            {/* Company Info */}
            <div className="flex items-center mb-3">
                <Building2 size={16} className={`mr-1.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`} />
                <span className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    {company}
                </span>
            </div>

            {/* Location and Salary */}
            <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                    <MapPin size={16} className={`mr-1.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                        {location}
                    </span>
                </div>
                <div className="flex items-center">
                    <DollarSign size={16} className={`mr-1.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                        {salary}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className={`text-sm mb-6 line-clamp-2 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                {description}
            </p>

            {/* Apply Button */}
            <button
                onClick={handleApplications}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                    ${isDarkMode 
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400" 
                        : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400"}`}
            >
                <Briefcase size={16} />
                <span>Apply Now</span>
                <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    );
};

export default Card;