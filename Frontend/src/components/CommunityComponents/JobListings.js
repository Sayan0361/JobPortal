import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, Laptop, BadgeCheck } from "lucide-react";

const JobListings = ({ jobListings, isDarkMode }) => {
  const [expanded, setExpanded] = useState(false);

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
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 overflow-hidden"
          >
            {jobListings.map((job) => (
              <div
                key={job.id}
                className={`p-6 rounded-2xl shadow-xl border backdrop-blur-lg transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300 group ${
                  isDarkMode
                    ? "bg-gradient-to-br from-[#1e1e1e] to-[#2c2c2c] border-zinc-700 text-gray-100"
                    : "bg-gradient-to-br from-white to-zinc-100 border-zinc-300 text-gray-800"
                }`}
              >
                {/* Title and Company */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full transition ${
                      isDarkMode
                        ? "bg-green-900 text-green-300 group-hover:bg-green-800"
                        : "bg-green-100 text-green-600 group-hover:bg-green-200"
                    }`}
                  >
                    {job.type || "Remote"}
                  </span>
                </div>

                {/* Company Name */}
                <div className="flex items-center gap-2 text-sm mb-2 text-zinc-400">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm mb-4 text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>

                {/* CTA */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      "Full-time",
                      `₹ ${job.salary || "Negotiable"}`,
                      job.experience || "0–2 yrs exp",
                    ].map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-zinc-700 text-gray-200"
                            : "bg-zinc-200 text-gray-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-sm px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4" />
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobListings;
