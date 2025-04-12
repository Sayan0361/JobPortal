import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, Laptop, BadgeCheck, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobListings = ({ jobListings, isDarkMode, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleApply = (jobId) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (user?.userType === 'employer') {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    navigate(`/apply-job/${jobId}`);
  };

  return (
    <div className="space-y-4">
      {/* Toggle Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center cursor-pointer px-4 py-3 rounded-xl font-bold text-xl bg-green-100/10 hover:bg-green-200/10 transition"
      >
        <span className="text-green-400 text-3xl font-bold">
          Job Listings
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform ${
            expanded ? "rotate-180 text-green-400" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Animated Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Error Message */}
            {showError && (
              <div className={`mb-4 p-3 rounded-xl text-center text-white bg-red-500/90 backdrop-blur-xl transition-all duration-300`}>
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  <span>Employers cannot apply for jobs</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {jobListings.map((job) => (
                <div
                  key={job._id || job.id}
                  className={`p-4 rounded-xl ${
                    isDarkMode
                      ? "bg-zinc-800/50 hover:bg-zinc-800"
                      : "bg-white hover:bg-zinc-50"
                  } transition-all duration-300`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-green-400">
                      {job.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDarkMode
                          ? "bg-green-400/10 text-green-400"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm gap-2">
                      <Building2 size={16} className="text-zinc-400" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                      <MapPin size={16} className="text-zinc-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                      <Laptop size={16} className="text-zinc-400" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <BadgeCheck size={16} />
                      <span>Actively hiring</span>
                    </div>
                    <button
                      onClick={() => handleApply(job._id || job.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                        ${isDarkMode
                          ? "bg-green-400/10 text-green-400 hover:bg-green-400/20"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                        } ${!user ? "" : user?.userType === 'employer' ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {!user ? "Sign in to Apply" : "Apply Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobListings;
