// src/pages/AllJobs.js
import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; // Import the Card component
import { getJobs } from '../ConfigAPI.js';


const AllJobs = ({ isDarkMode }) => {
    // const jobs = [
    //     { id: 1, title: 'Software Engineer', description: 'Join our development team and work on cutting-edge software solutions.', link: '/job-details/1' },
    //     { id: 2, title: 'Product Manager', description: 'Lead product development from concept to launch.', link: '/job-details/2' },
    //     { id: 3, title: 'UI/UX Designer', description: 'Design beautiful user interfaces and provide an exceptional user experience.', link: '/job-details/3' },
    //     { id: 4, title: 'Data Scientist', description: 'Analyze and interpret complex data to help shape business decisions.', link: '/job-details/4' },
    //     { id: 5, title: 'Backend Developer', description: 'Develop the server-side logic and APIs for our web applications.', link: '/job-details/5' },
    //     { id: 6, title: 'Frontend Developer', description: 'Create interactive user interfaces using modern web technologies.', link: '/job-details/6' },
    //     { id: 7, title: 'Full Stack Developer', description: 'Build both the front-end and back-end of web applications.', link: '/job-details/7' },
    //     { id: 8, title: 'Product Designer', description: 'Design products that improve user experiences and solve problems.', link: '/job-details/8' },
    //     { id: 9, title: 'Quality Assurance Engineer', description: 'Ensure our products meet the highest standards of quality and performance.', link: '/job-details/9' },
    //     { id: 10, title: 'DevOps Engineer', description: 'Manage and optimize the deployment of software applications.', link: '/job-details/10' },
    //     { id: 11, title: 'HR Manager', description: 'Oversee the hiring process and manage employee relations.', link: '/job-details/11' },
    //     { id: 12, title: 'Marketing Specialist', description: 'Create and execute marketing strategies to drive brand awareness.', link: '/job-details/12' },
    //     { id: 13, title: 'Sales Executive', description: 'Build relationships with clients and help close sales deals.', link: '/job-details/13' },
    //     { id: 14, title: 'Customer Support Specialist', description: 'Provide assistance to customers and resolve their issues.', link: '/job-details/14' },
    //     { id: 15, title: 'Business Analyst', description: 'Analyze business processes and provide insights to improve efficiency.', link: '/job-details/15' },
    //   ];

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
