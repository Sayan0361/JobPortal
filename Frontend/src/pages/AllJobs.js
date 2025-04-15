// src/pages/AllJobs.js
import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; // Import the Card component
import { getJobs } from '../ConfigAPI.js';


const AllJobs = ({ isDarkMode, user }) => {

    const [jobs, setJobs] = useState([]);

    const displayJobs = async () => {
        try {
            const jobsData = await getJobs();
            console.log("Jobs Data:", jobsData);            
            setJobs(jobsData);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        displayJobs();
    }, []);

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-4xl font-bold mb-6">All Available Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <Card
            key={job._id}
            id={job._id}
            title={job.title}
            description={job.description}
            company={job.company}
            location={job.location}
            salary={job.salary}
            user={user}
            // postedBy={job.email}
            // link={job.link}
            isDarkMode={isDarkMode} // Pass isDarkMode to Card
          />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
