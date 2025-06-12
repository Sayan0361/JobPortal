import { Briefcase, UserCircle } from 'lucide-react';
import { getJob, getUser, getEmployer } from '../ConfigAPI';
import { useEffect, useState } from 'react';

const Profile = ({ isDarkMode, userType }) => {

    const [user, setUser] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    console.log("UserType in Profile:", userType);
    

    const getUserData = async () => {
        try {
            const userData = await getUser();
            // const jobData = await getJob();
            
            setUser(userData || [])
            setAppliedJobs(userData.appliedJobs || []);
            console.log("User data:", userData);
            // console.log("Applied jobs:", userData.appliedJobs);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const getEmployerData = async () =>{
        try {
            const employerData = await getEmployer()
            setUser(employerData || []);
            setAppliedJobs(employerData.postedJobs || [])
            console.log("Employer data:", employerData);            
        } catch (error) {
            console.error("Error fetching employer data:", error);
            setUser([]);
        }
    }

    useEffect(() => {
        if(userType == "user") getUserData();
        else if(userType == "employer") getEmployerData();
        else console.error("Invalid user type in Profile component");
    },[])

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-50 text-zinc-900'}`}>
    <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
            <p className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {userType ? "Manage your personal information and see your jobs" : "Please log in to view your profile and jobs"}
            </p>
        </div>

        {/* Conditional Content */}
        {userType ? (
            <>
                {/* Profile Card */}
                <div className={`max-w-xl mx-auto mb-12 p-6 rounded-2xl shadow-md ${
                    isDarkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-zinc-200'
                }`}>
                    <div className="flex flex-col items-center gap-4 text-center">
                        {user.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-2 border-zinc-300"
                            />
                        ) : (
                            <UserCircle size={96} className={isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} />
                        )}
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job List */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                        {userType === "user" ? "Jobs you have applied for" : "Jobs you have posted"}
                        {appliedJobs.length === 0 && (
                            <span className="text-sm text-zinc-500"> (No jobs found)</span>
                        )}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {appliedJobs.map((job, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl shadow-sm ${
                                    isDarkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-zinc-200'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Briefcase className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
                                    <h4 className="text-lg font-medium">{job.title}</h4>
                                </div>
                                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    {job.company} — {job.location}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        ) : (
            <div className="text-center text-zinc-500 mt-12 text-lg">
                You must be logged in to view this page.
            </div>
        )}
    </div>
</div>

    );
};

export default Profile;
