import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize2, Minimize2, MessageSquare, User, Bot, Paperclip, Mic, Image, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

const Chatbot = ({ isDarkMode, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm JobBot, your AI assistant. How can I help you with your job search today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    jobType: null,
    location: null,
    skills: []
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Common job search questions for quick suggestions
  const quickSuggestions = [
    "How do I create a good resume?",
    "What are common interview questions?",
    "Find jobs in software development",
    "Tips for salary negotiation",
    "How to prepare for a job interview?",
    "What jobs match my skills?"
  ];

  // Predefined responses for demo purposes
  const botResponses = {
    'hello': "Hi there! How can I help with your job search today?",
    'hi': "Hello! What kind of job are you looking for?",
    'job': "I can help you find jobs based on your skills and preferences. What industry are you interested in?",
    'resume': "Having a strong resume is important! Would you like some tips on improving your resume?",
    'interview': "Preparing for interviews is crucial. I can share some common interview questions and tips if you'd like.",
    'salary': "Salary negotiations can be tricky. It's good to research industry standards and be prepared to discuss your value.",
    'skills': "Continuous learning is important in today's job market. What skills are you looking to develop?",
    'remote': "Remote work opportunities have increased significantly. Are you specifically looking for remote positions?",
    'help': "I can help with job searches, resume tips, interview preparation, and career advice. What do you need assistance with?",
    'thanks': "You're welcome! Is there anything else I can help you with?",
    'thank you': "You're welcome! Is there anything else I can help you with?",
    'bye': "Goodbye! Good luck with your job search. Feel free to chat again if you need more help!"
  };

  // More detailed responses for specific job-related queries
  const detailedResponses = [
    {
      keywords: ['find', 'job', 'search'],
      response: "I can help you find relevant jobs! Try using specific keywords like 'software engineer' or 'marketing manager' along with your preferred location in the search bar above.",
      action: "suggestJobSearch"
    },
    {
      keywords: ['resume', 'cv', 'curriculum'],
      response: "For a standout resume, focus on quantifiable achievements rather than just listing duties. Use action verbs, keep it concise, and tailor it to each job application. Would you like more specific resume tips?",
      action: null
    },
    {
      keywords: ['interview', 'prepare', 'question'],
      response: "To prepare for interviews: 1) Research the company thoroughly, 2) Practice common questions, 3) Prepare your own questions, 4) Use the STAR method for behavioral questions, and 5) Dress professionally and arrive early.",
      action: null
    },
    {
      keywords: ['salary', 'negotiate', 'compensation', 'pay'],
      response: "When negotiating salary, research industry standards, highlight your value with specific achievements, consider the entire package (benefits, work-life balance), and practice your negotiation beforehand.",
      action: null
    },
    {
      keywords: ['remote', 'work from home', 'wfh'],
      response: "For remote jobs, highlight relevant skills like self-discipline, communication, and tech-savviness. Our platform has a filter for remote positions - just select 'Remote' in the location field when searching.",
      action: "suggestRemoteJobs"
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Load chat history from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 1) { // Only save if we have more than the initial greeting
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    handleSubmit({ preventDefault: () => {} }, suggestion);
  };

  const extractJobPreferences = (text) => {
    const preferences = {...userPreferences};
    
    // Extract job type
    const jobTypePatterns = [
      { pattern: /full[ -]?time/i, value: 'Full-time' },
      { pattern: /part[ -]?time/i, value: 'Part-time' },
      { pattern: /contract/i, value: 'Contract' },
      { pattern: /freelance/i, value: 'Freelance' },
      { pattern: /remote/i, value: 'Remote' },
      { pattern: /intern/i, value: 'Internship' }
    ];
    
    for (const { pattern, value } of jobTypePatterns) {
      if (pattern.test(text)) {
        preferences.jobType = value;
        break;
      }
    }
    
    // Extract location
    const locationMatch = text.match(/in\s+([A-Za-z\s,]+)(?:,|\s|$)/i);
    if (locationMatch && locationMatch[1]) {
      preferences.location = locationMatch[1].trim();
    }
    
    // Extract skills
    const commonSkills = [
      'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node',
      'sql', 'nosql', 'mongodb', 'aws', 'azure', 'docker', 'kubernetes',
      'marketing', 'sales', 'management', 'leadership', 'communication'
    ];
    
    const skills = [...preferences.skills || []];
    for (const skill of commonSkills) {
      if (text.toLowerCase().includes(skill) && !skills.includes(skill)) {
        skills.push(skill);
      }
    }
    
    if (skills.length > 0) {
      preferences.skills = skills;
    }
    
    return preferences;
  };

  const handleSubmit = (e, suggestionText = null) => {
    e.preventDefault();
    const userInput = suggestionText || message;
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setSuggestions([]);
    
    // Update user preferences based on message
    const newPreferences = extractJobPreferences(userInput);
    setUserPreferences(newPreferences);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      const responseData = generateResponse(userInput, newPreferences);
      const botMessage = {
        id: Date.now() + 1,
        text: responseData.text,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        action: responseData.action
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Generate new suggestions based on the conversation
      generateSuggestions(userInput, newPreferences);
      
      // Handle any actions
      if (responseData.action) {
        handleBotAction(responseData.action, newPreferences);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleBotAction = (action, preferences) => {
    switch (action) {
      case 'suggestJobSearch':
        // Prepare a search URL with the user's preferences
        const searchParams = new URLSearchParams();
        if (preferences.jobType) searchParams.append('type', preferences.jobType);
        if (preferences.location) searchParams.append('location', preferences.location);
        
        // Add a message suggesting to search
        setTimeout(() => {
          const actionMessage = {
            id: Date.now(),
            text: `Would you like me to search for ${preferences.jobType || ''} jobs ${preferences.location ? 'in ' + preferences.location : ''}?`,
            sender: 'bot',
            timestamp: new Date().toISOString(),
            buttons: [
              {
                text: 'Search Jobs',
                action: () => navigate(`/all-jobs?${searchParams.toString()}`)
              }
            ]
          };
          setMessages(prev => [...prev, actionMessage]);
        }, 1000);
        break;
        
      case 'suggestRemoteJobs':
        setTimeout(() => {
          const actionMessage = {
            id: Date.now(),
            text: "I can help you find remote jobs. Would you like to see available remote positions?",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            buttons: [
              {
                text: 'View Remote Jobs',
                action: () => navigate('/all-jobs?type=Remote')
              }
            ]
          };
          setMessages(prev => [...prev, actionMessage]);
        }, 1000);
        break;
        
      default:
        break;
    }
  };

  const generateSuggestions = (userInput, preferences) => {
    // Generate contextual suggestions based on the conversation
    const lowercaseInput = userInput.toLowerCase();
    let newSuggestions = [];
    
    if (lowercaseInput.includes('resume') || lowercaseInput.includes('cv')) {
      newSuggestions = [
        "How to highlight skills on my resume?",
        "Resume templates for my industry",
        "Common resume mistakes to avoid"
      ];
    } else if (lowercaseInput.includes('interview')) {
      newSuggestions = [
        "How to answer 'tell me about yourself'?",
        "Questions to ask the interviewer",
        "How to prepare for a technical interview?"
      ];
    } else if (lowercaseInput.includes('salary') || lowercaseInput.includes('pay')) {
      newSuggestions = [
        "What's a good salary for my role?",
        "How to negotiate a higher offer?",
        "Should I discuss salary expectations?"
      ];
    } else if (preferences.jobType || preferences.location || (preferences.skills && preferences.skills.length > 0)) {
      // Job search related suggestions based on extracted preferences
      newSuggestions = [
        `Find ${preferences.jobType || ''} jobs ${preferences.location ? 'in ' + preferences.location : ''}`,
        "What skills are in demand for this role?",
        "How to stand out in my application?"
      ];
    } else {
      // Default suggestions if we couldn't determine context
      newSuggestions = quickSuggestions.slice(0, 3);
    }
    
    setSuggestions(newSuggestions);
  };

  const generateResponse = (userInput, preferences) => {
    const input = userInput.toLowerCase();
    let responseAction = null;
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        return { text: response, action: null };
      }
    }
    
    // Check for keyword matches in detailed responses
    for (const item of detailedResponses) {
      if (item.keywords.some(keyword => input.includes(keyword))) {
        return { text: item.response, action: item.action };
      }
    }
    
    // If we have preferences, generate a personalized response
    if (preferences.jobType || preferences.location || (preferences.skills && preferences.skills.length > 0)) {
      let personalizedResponse = "Based on our conversation, ";
      
      if (preferences.jobType) {
        personalizedResponse += `you're looking for ${preferences.jobType} positions. `;
        responseAction = 'suggestJobSearch';
      }
      
      if (preferences.location) {
        personalizedResponse += `You're interested in jobs in ${preferences.location}. `;
        responseAction = 'suggestJobSearch';
      }
      
      if (preferences.skills && preferences.skills.length > 0) {
        personalizedResponse += `Your skills in ${preferences.skills.join(', ')} are valuable in today's job market. `;
      }
      
      personalizedResponse += "How else can I help with your job search?";
      
      return { text: personalizedResponse, action: responseAction };
    }
    
    // Default responses if no match
    const defaultResponses = [
      "I'm not sure I understand. Could you please rephrase that?",
      "That's an interesting question. Could you provide more details so I can help better?",
      "I'm still learning about that topic. Can I help you with job searching, resume tips, or interview preparation instead?",
      "I don't have enough information to answer that properly. Could you be more specific?",
      "Let me redirect you to something I can help with - are you looking for job search assistance, resume help, or interview tips?"
    ];
    
    return { 
      text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      action: null
    };
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat history cleared. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
    setUserPreferences({
      jobType: null,
      location: null,
      skills: []
    });
    localStorage.removeItem('chatbotMessages');
  };

  const handleButtonAction = (action) => {
    if (typeof action === 'function') {
      action();
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button
        onClick={toggleChatbot}
        className={`chatbot-toggle ${isDarkMode ? 'dark' : ''}`}
        aria-label="Toggle chatbot"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className={`chatbot-container ${isDarkMode ? 'dark' : ''} ${isMinimized ? 'minimized' : ''}`}>
          {/* Chatbot header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={20} />
              <h3>JobBot Assistant</h3>
            </div>
            <div className="chatbot-controls">
              <button onClick={clearChat} aria-label="Clear chat" title="Clear chat history">
                <X size={16} />
              </button>
              <button onClick={toggleMinimize} aria-label={isMinimized ? 'Maximize' : 'Minimize'}>
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button onClick={toggleChatbot} aria-label="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chatbot body */}
          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <div className="message-avatar">
                      {msg.sender === 'bot' ? (
                        <Bot size={20} />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{msg.text}</div>
                      {msg.buttons && (
                        <div className="message-buttons">
                          {msg.buttons.map((button, index) => (
                            <button 
                              key={index} 
                              onClick={() => handleButtonAction(button.action)}
                              className="action-button"
                            >
                              {button.text === 'Search Jobs' || button.text === 'View Remote Jobs' ? (
                                <>
                                  <Search size={14} />
                                  <span>{button.text}</span>
                                </>
                              ) : (
                                button.text
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="message-time">{formatTime(msg.timestamp)}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && !isTyping && (
                <div className="chatbot-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Chatbot input */}
              <form onSubmit={handleSubmit} className="chatbot-input">
                <div className="input-actions">
                  <button type="button" aria-label="Attach file">
                    <Paperclip size={18} />
                  </button>
                  <button type="button" aria-label="Voice input">
                    <Mic size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  ref={inputRef}
                />
                <button type="submit" aria-label="Send message">
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
