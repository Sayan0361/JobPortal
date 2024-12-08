import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';


const CompanyCard = ({ company, location, salary, isDarkMode }) => {

    useEffect(()=>{
        AOS.init({duration: 1000, once: true});
    },[])

    return(
        <div
    className={`${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
    } 
    border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 max-w-sm w-full
    transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl`}
    data-aos="fade-up">

    <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">{company}</h2>
    
    <div className="flex justify-between items-center mb-4">
        <div>
            <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Location:</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{location}</p>
        </div>
        
        <div>
            <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Salary:</p>
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>${salary}</p>
        </div>
    </div>

</div>




    )
}
export default CompanyCard;