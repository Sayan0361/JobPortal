import { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard.js';
import { getJobs } from '../ConfigAPI.js';

const Companies = ({ isDarkMode }) => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const displayCompanies = async () => {
        try {
            const jobsData = await getJobs();
            setJobs(jobsData);
        } catch (error) {
            console.log("Error:", error);
            setError("Failed to load jobs. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        displayCompanies();
    }, []);

    return (
        <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
            <h1 className="text-4xl font-bold mb-6">Top Companies</h1>

            {isLoading ? (
                // Loading State
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                // Error State
                <div className="text-center py-10">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button
                        onClick={displayCompanies}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    >
                        Retry
                    </button>
                </div>
            ) : jobs.length === 0 ? (
                // Empty State
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No companies found.</p>
                    <p className="text-gray-400">Check back later for new opportunities!</p>
                </div>
            ) : (
                // Success State
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {jobs.map((job) => (
                        <CompanyCard
                            key={job._id}
                            company={job.company}
                            location={job.location}
                            salary={job.salary}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Companies;