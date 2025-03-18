import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindJobs from './pages/FindJobs';
import Companies from './pages/Companies';
import CommunityPage from './pages/CommunityPage';
import AllJobs from './pages/AllJobs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import JobPostingPage from './pages/JobPostingPage';
import Loading from './components/Loading';
import ApplyJob from './pages/ApplyJob';
import { logout } from './ConfigAPI';

function App() {

    const storedTheme = localStorage.getItem('isDarkMode');
    const initialTheme = storedTheme ? JSON.parse(storedTheme) : false;
    const [isDarkMode, setIsDarkMode] = useState(initialTheme);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    // const [jobs, setJobs] = useState([]);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[])


    const handleLogin = (userData) => {
        console.log("User data: ", userData); 
        setUser(userData);
        setUserType(userData.userType);
    };

    const handleLogout = async (userType) => {
        try {
            if (!userType) {
                console.error("No user type provided for logout");
                return;
            }
            console.log("User type in logout: ", userType);
            const response = await logout(userType);
            if (response && response.status === 200) {
                // Clear local storage and state
                localStorage.removeItem('user');
                setUser(null);
                setUserType(null);
            } else {
                console.error("Logout failed:", response);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // const handleShowJobs = (jobList) => {
    //     setJobs(jobList);
    // }

    return (
        <Router>
            <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
                {loading && <Loading isDarkMode={isDarkMode} />} {/* Show the Loading component while loading */}
                <Navbar
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    user={user}
                    userType={userType}
                    logout={handleLogout}
                />
                <Routes>
                    <Route path="/" element={<FindJobs isDarkMode={isDarkMode} user={user} />} />
                    <Route path="/companies" element={<Companies isDarkMode={isDarkMode} />} />
                    <Route path="/community-page" element={<CommunityPage isDarkMode={isDarkMode} />} />
                    <Route path="/job-posting-page" element={<JobPostingPage isDarkMode={isDarkMode} />} />
                    <Route path="/all-jobs" element={<AllJobs isDarkMode={isDarkMode}/>} />
                    <Route path="/signin" element={<SignIn isDarkMode={isDarkMode} onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
                    <Route path="/apply-job" element={<ApplyJob isDarkMode={isDarkMode} />} />

                </Routes>
                <Footer isDarkMode={isDarkMode} />
            </div>
        </Router>
    );
}

export default App;
