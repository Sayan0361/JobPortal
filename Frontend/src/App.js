import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindJobs from './pages/FindJobs';
import Companies from './pages/Companies';
import AllJobs from './pages/AllJobs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Routes>
        <Route path="/" element={<FindJobs isDarkMode={isDarkMode} />} /> {/*renamed as home in webpage */}
        <Route path="/companies" element={<Companies isDarkMode={isDarkMode} />} />
        <Route path="/all-jobs" element={<AllJobs isDarkMode={isDarkMode} />} />
        <Route path="/signin" element={<SignIn isDarkMode={isDarkMode} />} />
        <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;