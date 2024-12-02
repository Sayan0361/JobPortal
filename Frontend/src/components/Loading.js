import React, { useEffect, useState } from 'react';

function Loading({ isDarkMode }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
        }
        return Math.min(oldProgress + 10, 100); 
      });
    }, 100); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500'
      }`}
    >
      <div className="w-full max-w-sm px-4 space-y-6">
        <div className="text-center">
          <div className="text-5xl font-extrabold text-blue-600 animate-pulse">JobConnect</div>
        </div>
        <div className="w-full max-w-md mx-auto h-2 bg-transparent rounded-full relative">
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all ease-in-out duration-500 ${
               'bg-blue-600' 
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xl font-light text-center text-white mt-4">Loading...</div>
      </div>
    </div>
  );
}

export default Loading;