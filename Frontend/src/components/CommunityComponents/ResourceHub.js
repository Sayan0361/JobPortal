import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, Search } from "lucide-react";

const ResourceHub = ({ resources, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [expanded, setExpanded] = useState(true);

  const allTags = [
    "All",
    ...Array.from(new Set(resources.map((r) => r.tag).filter(Boolean)))
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || resource.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-4">
      {/* Toggle Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center cursor-pointer px-4 py-3 rounded-xl font-bold text-xl bg-pink-100/10 hover:bg-pink-200/10 transition"
      >
        <span className="text-purple-500 text-3xl font-bold">Resource Hub</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform ${
            expanded ? "rotate-180 text-blue-400" : ""
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

      {/* Animate content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 overflow-hidden"
          >
            {/* Search + Tag filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-3 top-3 text-zinc-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${
                    isDarkMode
                      ? "bg-zinc-800 text-gray-200 border-zinc-600"
                      : "bg-white text-gray-900 border-zinc-300"
                  }`}
                />
              </div>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className={`px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${
                  isDarkMode
                    ? "bg-zinc-800 text-gray-200 border-zinc-600"
                    : "bg-white text-gray-900 border-zinc-300"
                }`}
              >
                {allTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Resources */}
            <div className="space-y-5">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-6 rounded-2xl shadow-xl border backdrop-blur-md transition duration-300 group ${
                      isDarkMode
                        ? "bg-gradient-to-br from-[#1e1e1e] to-[#2c2c2c] border-zinc-700 text-gray-100"
                        : "bg-gradient-to-br from-white to-zinc-100 border-zinc-300 text-gray-800"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold hover:text-purple-500 transition underline flex items-center gap-2"
                      >
                        <Link2 className="w-4 h-4" />
                        {resource.title}
                      </a>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-purple-800 text-purple-300"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {resource.tag || "Link"}
                      </span>
                    </div>

                    {/* Description */}
                    {resource.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                        {resource.description}
                      </p>
                    )}

                    {/* Topics */}
                    {resource.topics && (
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {resource.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-full ${
                              isDarkMode
                                ? "bg-zinc-700 text-gray-100"
                                : "bg-zinc-200 text-gray-800"
                            }`}
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 italic text-sm">
                  No resources found.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourceHub;
