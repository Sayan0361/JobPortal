import React, { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share,
  Plus,
} from "lucide-react";

const CommunityPage = ({ isDarkMode }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Aarav Sharma",
      avatar: "https://via.placeholder.com/40",
      content: "Just got an internship at Google! 🎉",
      timestamp: "1 hour ago",
      likes: 25,
      comments: 10,
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*3L7BJpqvR6Z07rEAG7M9OA.png",
    },
    {
      id: 2,
      user: "Ishita Patel",
      avatar: "https://via.placeholder.com/40",
      content: "Looking for JavaScript resources. Any recommendations?",
      timestamp: "3 hours ago",
      likes: 69,
      comments: 156,
    },
    {
      id: 3,
      user: "Rohan Gupta",
      avatar: "https://via.placeholder.com/40",
      content: "Excited to join this community! 🚀",
      timestamp: "5 hours ago",
      likes: 12,
      comments: 3,
    },
    {
      id: 4,
      user: "Ananya Singh",
      avatar: "https://via.placeholder.com/40",
      content: "Just started learning Python. Any tips for beginners?",
      timestamp: "7 hours ago",
      likes: 108,
      comments: 256,
    },
    {
      id: 5,
      user: "Vikram Singh",
      avatar: "https://via.placeholder.com/40",
      content: "Sharing my journey into AI and Machine Learning. Check out my blog!",
      timestamp: "9 hours ago",
      likes: 45,
      comments: 20,
      image: "https://www.springboard.com/blog/wp-content/uploads/2018/12/image2-4-1024x571.png",
    },
    {
      id: 6,
      user: "Neha Verma",
      avatar: "https://via.placeholder.com/40",
      content: "Just got my first job as a Web Developer! 🎉",
      timestamp: "11 hours ago",
      likes: 309,
      comments: 145,
    },
  ]);

  const leaderboard = [
    { id: 1, name: "Raj Malhotra", points: 1500 },
    { id: 2, name: "Neha Verma", points: 1350 },
    { id: 3, name: "Vikram Singh", points: 1200 },
  ];

  const jobListings = [
    { id: 1, title: "Frontend Developer", company: "Amazon", location: "Remote" },
    { id: 2, title: "Data Scientist", company: "Microsoft", location: "Bangalore" },
    { id: 3, title: "Backend Engineer", company: "Google", location: "Remote" },
    { id: 4, title: "UI/UX Designer", company: "Figma", location: "San Francisco" },
  ];

  const resources = [
    { id: 1, title: "Mastering React.js", link: "#" },
    { id: 2, title: "DSA for Interviews", link: "#" },
    { id: 3, title: "Python for Beginners", link: "#" },
    { id: 4, title: "Advanced JavaScript Concepts", link: "#" },
  ];

  const trendingTopics = [
    { id: 1, title: "#RemoteWork", posts: 120 },
    { id: 2, title: "#CareerGrowth", posts: 98 },
    { id: 3, title: "#TechTrends", posts: 85 },
    { id: 4, title: "#LearnPython", posts: 72 },
  ];

  // State to track which posts the user has liked
  const [likedPostIds, setLikedPostIds] = useState([]);

  // Function to handle like button click
  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPostIds.includes(postId)
                ? post.likes - 1 // Decrease likes if already liked
                : post.likes + 1, // Increase likes if not liked
            }
          : post
      )
    );

    // Toggle the liked state for the post
    setLikedPostIds((prevLikedPostIds) =>
      likedPostIds.includes(postId)
        ? prevLikedPostIds.filter((id) => id !== postId) // Remove post ID if already liked
        : [...prevLikedPostIds, postId] // Add post ID if not liked
    );
  };

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`relative flex flex-col items-center justify-center py-32 px-6 shadow-2xl rounded-[60px] overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white"
            : "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-gray-900"
        }`}
      >
        <div className="relative z-10 text-center px-6">
          <h1
            className={`text-6xl md:text-8xl font-bold leading-tight tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)] ${
              isDarkMode ? "text-white" : "text-blue-500"
            }`}
          >
            Welcome to the{" "}
            <span
              className={`${
                isDarkMode ? "text-yellow-400" : "text-blue-700"
              } glow`}
            >
              Community
            </span>
          </h1>
          <p
            className={`text-xl md:text-2xl mt-4 opacity-95 font-semibold tracking-wider ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Connect, Share, and Grow Together 🚀
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Left Column: Community Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pinned Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-500"> Pinned Posts</h2>
            <div
              className={`p-6 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md border transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-300"
              }`}
            >
              <p className="font-semibold">Community Meetup: Next Saturday at 6 PM</p>
            </div>
          </div>

          {/* Community Feed */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-500">Community Feed</h2>
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className={`mb-6 p-6 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md border transition-all hover:scale-[1.02] ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-300"
                }`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-md"
                  />
                  <div className="ml-4">
                    <p className="font-bold text-lg">{post.user}</p>
                    <p className="text-sm text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                <p className="mb-4 text-lg font-medium">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-auto rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center space-x-6 text-gray-400">
                  <button
                    onClick={() => handleLikeClick(post.id)} // Add onClick handler here
                    className={`flex items-center space-x-2 transition ${
                      likedPostIds.includes(post.id)
                        ? "text-blue-500" // Filled blue when liked
                        : "hover:text-blue-400" // Default state
                    }`}
                  >
                    <ThumbsUp
                      className={`w-5 h-5 ${
                        likedPostIds.includes(post.id) ? "fill-current" : "" // Fill icon when liked
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-400 transition">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-purple-400 transition">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition`}
              >
                Previous
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Job Listings, Resource Hub, Polls & Q&A */}
        <div className="space-y-8 sticky top-10">
          {/* Job Listings */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-500">Job Listings</h2>
            <div className="space-y-4">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className={`p-4 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md border transition-all hover:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                      : "bg-gradient-to-br from-white to-gray-50 border-gray-300"
                  }`}
                >
                  <p className="font-semibold">
                    {job.title} at {job.company}
                  </p>
                  <p className="text-sm text-gray-400">{job.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Hub */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-500">Resource Hub</h2>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className={`p-4 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md border transition-all hover:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                      : "bg-gradient-to-br from-white to-gray-50 border-gray-300"
                  }`}
                >
                  <a
                    href={resource.link}
                    className="text-lg font-semibold underline hover:text-purple-400 transition"
                  >
                    {resource.title}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Polls & Q&A */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-pink-500">Polls & Q&A</h2>
            <div
              className={`p-6 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md border transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-300"
              }`}
            >
              <p className="font-semibold mb-4">
                What's your favorite programming language?
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Vote Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
          isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
        }`}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CommunityPage;