import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindJobs from './pages/FindJobs';
import Companies from './pages/Companies';
import AllJobs from './pages/AllJobs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import JobPostingPage from './pages/JobPostingPage';
import Loading from './components/Loading';

function App() {
  
  const storedTheme = localStorage.getItem('isDarkMode');
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : false;
  const [isDarkMode, setIsDarkMode] = useState(initialTheme);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); 

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

  
  const handleLogin = (userData) => {
    setUser(userData); 
  };

  const handleLogout = () => {
    setUser(null); 
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
        {loading && <Loading isDarkMode={isDarkMode} />} {/* Show the Loading component while loading */}
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          user={user} 
          logout={handleLogout} 
        />
        <Routes>
          <Route path="/" element={<FindJobs isDarkMode={isDarkMode} user={user} />} />
          <Route path="/companies" element={<Companies isDarkMode={isDarkMode} />} />
          <Route path="/job-posting-page" element={<JobPostingPage isDarkMode={isDarkMode} />} />
          <Route path="/all-jobs" element={<AllJobs isDarkMode={isDarkMode} />} />
          <Route path="/signin" element={<SignIn isDarkMode={isDarkMode} onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;
