import React from "react";
import HeaderSection from "../components/CommunityComponents/HeaderSection";
import JobListings from "../components/CommunityComponents/JobListings";
import ResourceHub from "../components/CommunityComponents/ResourceHub";
import PollsQA from "../components/CommunityComponents/PollsQA";
import PinnedPosts from "../components/CommunityComponents/PinnedPosts";
import CommunityFeed from "../components/CommunityComponents/CommunityFeed";

const CommunityPage = ({ isDarkMode }) => {
  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechVerse",
      location: "Remote",
      type: "Full-time",
      salary: "6–10 LPA",
      experience: "1–3 yrs"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Microsoft",
      location: "Bangalore",
      type: "Full-time",
      salary: "12–18 LPA",
      experience: "2–4 yrs"
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Google",
      location: "Remote",
      type: "Full-time",
      salary: "10–16 LPA",
      experience: "3–5 yrs"
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Figma",
      location: "San Francisco",
      type: "Contract",
      salary: "8–12 LPA",
      experience: "2–3 yrs"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "React Official Docs",
      link: "https://reactjs.org",
      description: "Comprehensive guide to learn React.js fundamentals and advanced patterns.",
      tag: "Docs",
      topics: ["react", "hooks", "components"]
    },
    {
      id: 2,
      title: "JavaScript Roadmap 2025",
      link: "https://roadmap.sh/javascript",
      description: "A structured path to master modern JavaScript.",
      tag: "Roadmap",
      topics: ["javascript", "frontend"]
    },
    {
      id: 3,
      title: "Intro to DSA - Video Course",
      link: "https://youtube.com/...",
      tag: "Video",
      topics: ["dsa", "beginner", "interview prep"]
    }
  ];

  const trendingTopics = [
    { id: 1, title: "#RemoteWork", posts: 120 },
    { id: 2, title: "#CareerGrowth", posts: 98 },
    { id: 3, title: "#TechTrends", posts: 85 },
    { id: 4, title: "#LearnPython", posts: 72 },
  ];

  const leaderboard = [
    { id: 1, name: "Raj Malhotra", points: 1500 },
    { id: 2, name: "Neha Verma", points: 1350 },
    { id: 3, name: "Vikram Singh", points: 1200 },
  ];

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-all duration-300 ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-900"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`relative flex flex-col items-center justify-center py-20 md:py-32 px-4 text-center rounded-[40px] shadow-xl overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-zinc-800 to-zinc-900"
            : "bg-gradient-to-br from-blue-100 to-purple-100"
        }`}
      >
        <HeaderSection/>  
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 px-4 sm:px-6">
        {/* Left Column: Community Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pinned Posts */}
          <PinnedPosts isDarkMode={isDarkMode} />

          {/* Community Feed */}
          <CommunityFeed 
            trendingTopics={trendingTopics}
            leaderboard={leaderboard}
            isDarkMode={isDarkMode} 
          />
        </div>

        {/* Right Column: Job Listings, Resource Hub, Polls & Q&A */}
        <div className="space-y-8 sticky top-10">
          {/* Job Listings */}
          <JobListings
            jobListings={jobListings}
            isDarkMode={isDarkMode}
          />

          {/* Resource Hub */}
          <ResourceHub
            resources={resources}
            isDarkMode={isDarkMode}
          />

          {/* Polls & Q&A */}
          <PollsQA isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;