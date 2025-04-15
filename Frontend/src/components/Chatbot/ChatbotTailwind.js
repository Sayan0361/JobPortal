import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobChatbot } from './JobChatbotContext';
import { 
  MessageSquare, X, Maximize2, Minimize2, User, Bot, 
  Send, Paperclip, Mic, Search, Settings, Trash2,
  HelpCircle, Moon, Sun, ChevronDown, ChevronUp, 
  ThumbsUp, ThumbsDown, Share2, Download, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotTailwind = ({ isDarkMode, user }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [feedback, setFeedback] = useState({});
  
  const { 
    chatHistory, 
    isOpen, 
    isMinimized, 
    isTyping,
    jobSuggestions,
    theme,
    expertiseLevel,
    userPreferences,
    addMessage,
    generateBotResponse,
    clearHistory,
    toggleChatbot,
    toggleMinimize,
    setTheme,
    setExpertiseLevel
  } = useJobChatbot();

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
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
    
    addMessage(userMessage);
    setMessage('');
    
    // Generate bot response
    generateBotResponse(userInput);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    handleSubmit({ preventDefault: () => {} }, suggestion);
  };

  const handleFeedback = (messageId, isPositive) => {
    setFeedback(prev => ({
      ...prev,
      [messageId]: isPositive
    }));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeExpertiseLevel = (level) => {
    setExpertiseLevel(level);
  };

  // Animation variants
  const chatbotVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      } 
    }
  };

  // Determine theme classes
  const themeClass = isDarkMode ? 'dark' : '';
  
  return (
    <>
      {/* Chatbot toggle button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-5 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105 z-50 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
        }`}
        aria-label="Toggle chatbot"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-24 right-5 w-[350px] sm:w-[400px] ${
              isMinimized ? 'h-16' : 'h-[500px] sm:h-[550px]'
            } rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 ${themeClass} ${
              isDarkMode 
                ? 'bg-gray-900 text-gray-100 border border-gray-700' 
                : 'bg-white text-gray-800 border border-gray-200'
            }`}
            variants={chatbotVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chatbot header */}
            <div className={`px-4 py-3 flex items-center justify-between ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-700 to-purple-700' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            } text-white`}>
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold text-sm sm:text-base">JobBot Assistant</h3>
                {expertiseLevel === 'expert' && (
                  <span className="bg-yellow-500 text-xs px-1.5 py-0.5 rounded-full text-gray-900 font-medium flex items-center">
                    <Sparkles className="w-3 h-3 mr-0.5" />
                    Expert
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={toggleSettings} 
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button 
                  onClick={toggleMinimize} 
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={toggleChatbot} 
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && !isMinimized && (
                <motion.div 
                  className={`p-4 ${
                    isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'
                  }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Appearance</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Theme</span>
                        <button 
                          onClick={toggleTheme}
                          className={`flex items-center space-x-1 px-2 py-1 rounded ${
                            isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {isDarkMode ? (
                            <>
                              <Moon className="w-3.5 h-3.5" />
                              <span className="text-xs">Dark</span>
                            </>
                          ) : (
                            <>
                              <Sun className="w-3.5 h-3.5" />
                              <span className="text-xs">Light</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">AI Assistant Level</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['beginner', 'intermediate', 'expert'].map((level) => (
                          <button
                            key={level}
                            onClick={() => changeExpertiseLevel(level)}
                            className={`text-xs py-1 px-2 rounded-full capitalize ${
                              expertiseLevel === level
                                ? isDarkMode 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'bg-indigo-500 text-white'
                                : isDarkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={clearHistory}
                        className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                          isDarkMode 
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                        }`}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear History</span>
                      </button>
                      
                      <button 
                        className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Help</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chatbot body */}
            {!isMinimized && (
              <>
                {/* Messages area */}
                <div 
                  className={`flex-1 p-4 overflow-y-auto ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                  } space-y-4`}
                >
                  {chatHistory.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          msg.sender === 'user'
                            ? isDarkMode 
                              ? 'bg-indigo-600' 
                              : 'bg-indigo-500'
                            : isDarkMode
                              ? 'bg-purple-600'
                              : 'bg-purple-500'
                        } text-white`}>
                          {msg.sender === 'user' ? (
                            user?.profileImage ? (
                              <img 
                                src={user.profileImage} 
                                alt="User" 
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-4 h-4" />
                            )
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        
                        {/* Message content */}
                        <div className={`flex flex-col ${msg.sender === 'user' ? 'mr-2 items-end' : 'ml-2 items-start'}`}>
                          <div className={`px-4 py-2 rounded-2xl ${
                            msg.sender === 'user'
                              ? isDarkMode 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-indigo-500 text-white'
                              : isDarkMode
                                ? 'bg-gray-800 text-gray-100'
                                : 'bg-white text-gray-800 border border-gray-200'
                          } ${msg.sender === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            
                            {/* Action buttons if present */}
                            {msg.buttons && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {msg.buttons.map((button, i) => (
                                  <button
                                    key={i}
                                    onClick={() => button.action()}
                                    className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full ${
                                      isDarkMode
                                        ? 'bg-indigo-700 hover:bg-indigo-600 text-white'
                                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                                    } transition-colors`}
                                  >
                                    {button.text.includes('Search') || button.text.includes('View') ? (
                                      <Search className="w-3 h-3 mr-1" />
                                    ) : null}
                                    <span>{button.text}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Message metadata */}
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                            
                            {/* Feedback buttons for bot messages */}
                            {msg.sender === 'bot' && (
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => handleFeedback(msg.id, true)}
                                  className={`p-0.5 rounded ${
                                    feedback[msg.id] === true
                                      ? isDarkMode 
                                        ? 'text-green-400' 
                                        : 'text-green-600'
                                      : 'text-gray-400 hover:text-gray-600'
                                  }`}
                                  aria-label="Helpful"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button 
                                  onClick={() => handleFeedback(msg.id, false)}
                                  className={`p-0.5 rounded ${
                                    feedback[msg.id] === false
                                      ? isDarkMode 
                                        ? 'text-red-400' 
                                        : 'text-red-600'
                                      : 'text-gray-400 hover:text-gray-600'
                                  }`}
                                  aria-label="Not helpful"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                                <button 
                                  className="p-0.5 rounded text-gray-400 hover:text-gray-600"
                                  aria-label="Share"
                                >
                                  <Share2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-row">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
                        } text-white`}>
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="ml-2">
                          <div className={`px-4 py-2 rounded-2xl rounded-tl-sm ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
                          }`}>
                            <div className="flex space-x-1">
                              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '200ms' }}></div>
                              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '400ms' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {jobSuggestions.length > 0 && !isTyping && (
                  <div className={`p-3 flex flex-wrap gap-2 ${
                    isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-200'
                  }`}>
                    {jobSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`text-xs py-1.5 px-3 rounded-full ${
                          isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        } transition-colors`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input area */}
                <form 
                  onSubmit={handleSubmit}
                  className={`p-3 flex items-center space-x-2 ${
                    isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'
                  }`}
                >
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      className={`p-1.5 rounded-full ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label="Attach file"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className={`p-1.5 rounded-full ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label="Voice input"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className={`flex-1 py-2 px-3 rounded-full text-sm focus:outline-none ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                    ref={inputRef}
                  />
                  
                  <button
                    type="submit"
                    className={`p-2 rounded-full ${
                      message.trim()
                        ? isDarkMode 
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-500'
                          : 'bg-gray-200 text-gray-400'
                    } transition-colors`}
                    disabled={!message.trim()}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotTailwind;
