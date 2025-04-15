import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const headlines = [
  "Find Your Dream Job Here",
  "Empowering Careers, Connecting Talent",
  "Remote, Onsite, Hybrid — We’ve Got You",
  "Job Seekers & Employers — Join Us Today!",
];

const HeaderSection = ({ isDarkMode }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    soundRef.current = new Audio("/typing-sound.mp3");

    const handleUserInteraction = () => {
      setSoundEnabled(true);
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  useEffect(() => {
    const current = headlines[index % headlines.length];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBeforeStart = 1000;

    const type = setTimeout(() => {
      if (soundEnabled && soundRef.current) {
        soundRef.current.currentTime = 0;
        soundRef.current.play().catch(() => {});
      }

      if (!isDeleting && text.length < current.length) {
        setText(current.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % headlines.length);
        }
      }
    }, text === "" && !isDeleting ? delayBeforeStart : typingSpeed);

    return () => clearTimeout(type);
  }, [text, isDeleting, index, soundEnabled]);

  return (
    <section
      className="flex flex-col items-center justify-center px-4 py-8 text-center"
      data-aos="zoom-in"
    >
      <motion.h1
        className={`text-3xl sm:text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
          isDarkMode
            ? "from-yellow-400 via-pink-500 to-orange-500"
            : "from-blue-700 via-purple-500 to-indigo-600"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {text}
        <span className="animate-blink ml-1">|</span>
      </motion.h1>

      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
        Your all-in-one platform for jobs, hiring, and connections.
      </p>
    </section>
  );
};

export default HeaderSection;
