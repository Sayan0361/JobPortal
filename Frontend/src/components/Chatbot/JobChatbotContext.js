import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import { generateAdvancedResponse, jobKnowledgeBase, careerTransitionGuidance } from './JobKnowledgeBase';

// Create context
const JobChatbotContext = createContext();

// Custom hook to use the chatbot context
export const useJobChatbot = () => useContext(JobChatbotContext);

// Action types for reducer
const ACTIONS = {
  SET_CHAT_HISTORY: 'SET_CHAT_HISTORY',
  ADD_MESSAGE: 'ADD_MESSAGE',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  TOGGLE_CHATBOT: 'TOGGLE_CHATBOT',
  TOGGLE_MINIMIZE: 'TOGGLE_MINIMIZE',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  UPDATE_JOB_SUGGESTIONS: 'UPDATE_JOB_SUGGESTIONS',
  SET_TYPING: 'SET_TYPING',
  SET_THEME: 'SET_THEME',
  SET_EXPERTISE_LEVEL: 'SET_EXPERTISE_LEVEL',
  SET_CONVERSATION_CONTEXT: 'SET_CONVERSATION_CONTEXT'
};

// Initial state
const initialState = {
  chatHistory: [],
  isOpen: false,
  isMinimized: false,
  isTyping: false,
  jobSuggestions: [],
  theme: 'light',
  expertiseLevel: 'intermediate', // beginner, intermediate, expert
  conversationContext: null, // current topic being discussed
  userPreferences: {
    jobType: null,
    location: null,
    industry: null,
    experience: null,
    skills: [],
    interests: [],
    education: null,
    salary: null,
    benefits: [],
    workStyle: null // remote, hybrid, in-office
  }
};

// Reducer function
function chatbotReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CHAT_HISTORY:
      return { ...state, chatHistory: action.payload };
    
    case ACTIONS.ADD_MESSAGE:
      return { 
        ...state, 
        chatHistory: [...state.chatHistory, action.payload],
        // Update conversation context based on message content
        conversationContext: detectConversationContext(action.payload.text, state.conversationContext)
      };
    
    case ACTIONS.CLEAR_HISTORY:
      return { 
        ...state, 
        chatHistory: [{
          id: Date.now(),
          text: "Chat history cleared. How can I help with your job search today?",
          sender: 'bot',
          timestamp: new Date().toISOString()
        }],
        conversationContext: null
      };
    
    case ACTIONS.TOGGLE_CHATBOT:
      return { ...state, isOpen: !state.isOpen, isMinimized: state.isOpen ? false : state.isMinimized };
    
    case ACTIONS.TOGGLE_MINIMIZE:
      return { ...state, isMinimized: !state.isMinimized };
    
    case ACTIONS.UPDATE_PREFERENCES:
      return { 
        ...state, 
        userPreferences: { ...state.userPreferences, ...action.payload }
      };
    
    case ACTIONS.UPDATE_JOB_SUGGESTIONS:
      return { ...state, jobSuggestions: action.payload };
    
    case ACTIONS.SET_TYPING:
      return { ...state, isTyping: action.payload };
    
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ACTIONS.SET_EXPERTISE_LEVEL:
      return { ...state, expertiseLevel: action.payload };
    
    case ACTIONS.SET_CONVERSATION_CONTEXT:
      return { ...state, conversationContext: action.payload };
    
    default:
      return state;
  }
}

// Helper function to detect conversation context
function detectConversationContext(message, currentContext) {
  const text = message.toLowerCase();
  
  // Define context keywords
  const contextKeywords = {
    resume: ['resume', 'cv', 'cover letter', 'application'],
    interview: ['interview', 'question', 'prepare', 'hiring manager'],
    jobSearch: ['job search', 'find job', 'looking for', 'opportunity', 'apply'],
    salary: ['salary', 'compensation', 'negotiate', 'offer', 'benefits', 'pay'],
    skills: ['skill', 'learn', 'improve', 'develop', 'training', 'course'],
    career: ['career', 'growth', 'advance', 'promotion', 'path', 'transition'],
    industry: ['industry', 'market', 'trend', 'sector', 'field']
  };
  
  // Check for keywords in the message
  for (const [context, keywords] of Object.entries(contextKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return context;
    }
  }
  
  // If no keywords match, keep the current context
  return currentContext;
}

// Provider component
export const JobChatbotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);
  
  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('jobChatHistory');
    if (savedHistory) {
      try {
        dispatch({ 
          type: ACTIONS.SET_CHAT_HISTORY, 
          payload: JSON.parse(savedHistory)
        });
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    } else {
      // Initialize with welcome message if no history exists
      dispatch({
        type: ACTIONS.ADD_MESSAGE,
        payload: {
          id: Date.now(),
          text: "Hello! I'm JobBot, your AI assistant. How can I help you with your job search today?",
          sender: 'bot',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Load user preferences if available
    const savedPreferences = localStorage.getItem('jobUserPreferences');
    if (savedPreferences) {
      try {
        dispatch({
          type: ACTIONS.UPDATE_PREFERENCES,
          payload: JSON.parse(savedPreferences)
        });
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('jobChatbotTheme');
    if (savedTheme) {
      dispatch({
        type: ACTIONS.SET_THEME,
        payload: savedTheme
      });
    }
    
    // Load expertise level
    const savedExpertise = localStorage.getItem('jobChatbotExpertise');
    if (savedExpertise) {
      dispatch({
        type: ACTIONS.SET_EXPERTISE_LEVEL,
        payload: savedExpertise
      });
    }
  }, []);

  // Save chat history to localStorage when it changes
  useEffect(() => {
    if (state.chatHistory.length > 0) {
      localStorage.setItem('jobChatHistory', JSON.stringify(state.chatHistory));
    }
  }, [state.chatHistory]);
  
  // Save user preferences when they change
  useEffect(() => {
    localStorage.setItem('jobUserPreferences', JSON.stringify(state.userPreferences));
  }, [state.userPreferences]);
  
  // Save theme preference
  useEffect(() => {
    localStorage.setItem('jobChatbotTheme', state.theme);
  }, [state.theme]);
  
  // Save expertise level
  useEffect(() => {
    localStorage.setItem('jobChatbotExpertise', state.expertiseLevel);
  }, [state.expertiseLevel]);

  // Add a message to the chat history
  const addMessage = (message) => {
    dispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: message
    });
  };

  // Generate bot response
  const generateBotResponse = (userMessage) => {
    // Set typing indicator
    dispatch({ type: ACTIONS.SET_TYPING, payload: true });
    
    // Extract preferences from message
    const newPreferences = extractJobPreferences(userMessage);
    if (Object.keys(newPreferences).length > 0) {
      dispatch({
        type: ACTIONS.UPDATE_PREFERENCES,
        payload: newPreferences
      });
    }
    
    // Generate response with delay to simulate thinking
    setTimeout(() => {
      // Generate response using the knowledge base
      const response = generateAdvancedResponse(
        userMessage, 
        state.userPreferences, 
        state.chatHistory
      );
      
      // Add bot response to chat
      addMessage({
        id: Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
      
      // Turn off typing indicator
      dispatch({ type: ACTIONS.SET_TYPING, payload: false });
      
      // Generate suggestions based on the conversation
      generateContextualSuggestions();
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  // Clear chat history
  const clearHistory = () => {
    dispatch({ type: ACTIONS.CLEAR_HISTORY });
    localStorage.removeItem('jobChatHistory');
  };

  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    dispatch({ type: ACTIONS.TOGGLE_CHATBOT });
  };

  // Toggle minimize/maximize
  const toggleMinimize = () => {
    dispatch({ type: ACTIONS.TOGGLE_MINIMIZE });
  };

  // Update user preferences based on conversation
  const updatePreferences = (newPreferences) => {
    dispatch({
      type: ACTIONS.UPDATE_PREFERENCES,
      payload: newPreferences
    });
  };

  // Set job suggestions
  const updateJobSuggestions = (suggestions) => {
    dispatch({
      type: ACTIONS.UPDATE_JOB_SUGGESTIONS,
      payload: suggestions
    });
  };
  
  // Set theme
  const setTheme = (theme) => {
    dispatch({
      type: ACTIONS.SET_THEME,
      payload: theme
    });
  };
  
  // Set expertise level
  const setExpertiseLevel = (level) => {
    dispatch({
      type: ACTIONS.SET_EXPERTISE_LEVEL,
      payload: level
    });
  };

  // Extract job preferences from user message
  const extractJobPreferences = (message) => {
    const preferences = {};
    const text = typeof message === 'string' ? message.toLowerCase() : message.text.toLowerCase();
    
    // Extract job type
    const jobTypePatterns = [
      { pattern: /full[ -]?time/i, value: 'Full-time' },
      { pattern: /part[ -]?time/i, value: 'Part-time' },
      { pattern: /contract/i, value: 'Contract' },
      { pattern: /freelance/i, value: 'Freelance' },
      { pattern: /remote/i, value: 'Remote' },
      { pattern: /hybrid/i, value: 'Hybrid' },
      { pattern: /on[ -]?site/i, value: 'On-site' },
      { pattern: /in[ -]?office/i, value: 'In-office' },
      { pattern: /intern/i, value: 'Internship' }
    ];
    
    for (const { pattern, value } of jobTypePatterns) {
      if (pattern.test(text)) {
        preferences.jobType = value;
        if (value === 'Remote' || value === 'Hybrid' || value === 'In-office') {
          preferences.workStyle = value;
        }
        break;
      }
    }
    
    // Extract location
    const locationMatch = text.match(/in\s+([A-Za-z\s,]+)(?:,|\s|$)/i);
    if (locationMatch && locationMatch[1]) {
      preferences.location = locationMatch[1].trim();
    }
    
    // Extract industry
    const industries = [
      'technology', 'healthcare', 'finance', 'education', 'marketing',
      'retail', 'manufacturing', 'hospitality', 'construction', 'media',
      'entertainment', 'automotive', 'aerospace', 'agriculture', 'energy',
      'pharmaceutical', 'telecommunications', 'transportation', 'logistics'
    ];
    
    for (const industry of industries) {
      if (text.includes(industry)) {
        preferences.industry = industry.charAt(0).toUpperCase() + industry.slice(1);
        break;
      }
    }
    
    // Extract experience level
    const experienceMatch = text.match(/(\d+)(?:\+)?\s+years?(?:\s+of)?\s+experience/i);
    if (experienceMatch && experienceMatch[1]) {
      const years = parseInt(experienceMatch[1]);
      if (years < 2) {
        preferences.experience = 'entry-level';
      } else if (years < 5) {
        preferences.experience = 'mid-level';
      } else {
        preferences.experience = 'senior';
      }
    } else if (text.includes('entry level') || text.includes('junior') || text.includes('beginner')) {
      preferences.experience = 'entry-level';
    } else if (text.includes('senior') || text.includes('experienced') || text.includes('expert')) {
      preferences.experience = 'senior';
    } else if (text.includes('mid level') || text.includes('intermediate')) {
      preferences.experience = 'mid-level';
    }
    
    // Extract education
    const educationPatterns = [
      { pattern: /bachelor/i, value: "Bachelor's Degree" },
      { pattern: /master/i, value: "Master's Degree" },
      { pattern: /phd|doctorate/i, value: "PhD" },
      { pattern: /associate/i, value: "Associate's Degree" },
      { pattern: /high school/i, value: "High School" },
      { pattern: /certificate/i, value: "Certificate" }
    ];
    
    for (const { pattern, value } of educationPatterns) {
      if (pattern.test(text)) {
        preferences.education = value;
        break;
      }
    }
    
    // Extract salary expectations
    const salaryMatch = text.match(/(\$\d+[k]?|\d+[k]|\d+,\d{3}|\d+ thousand|\d+ million)(?:\s*-\s*(\$\d+[k]?|\d+[k]|\d+,\d{3}|\d+ thousand|\d+ million))?/i);
    if (salaryMatch) {
      preferences.salary = salaryMatch[0];
    }
    
    // Extract skills
    const commonSkills = [
      'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node',
      'sql', 'nosql', 'mongodb', 'aws', 'azure', 'docker', 'kubernetes',
      'marketing', 'sales', 'management', 'leadership', 'communication',
      'project management', 'agile', 'scrum', 'data analysis', 'machine learning',
      'artificial intelligence', 'ui/ux', 'design', 'customer service',
      'accounting', 'finance', 'hr', 'recruiting', 'public speaking',
      'writing', 'editing', 'research', 'analysis', 'strategy'
    ];
    
    const skills = [];
    for (const skill of commonSkills) {
      if (text.includes(skill)) {
        skills.push(skill);
      }
    }
    
    if (skills.length > 0) {
      preferences.skills = skills;
    }
    
    // Extract benefits interests
    const benefitsPatterns = [
      { pattern: /health(?:\s*insurance)?/i, value: 'Health Insurance' },
      { pattern: /dental/i, value: 'Dental Insurance' },
      { pattern: /vision/i, value: 'Vision Insurance' },
      { pattern: /401[k]/i, value: '401(k)' },
      { pattern: /retirement/i, value: 'Retirement Plan' },
      { pattern: /pto|paid time off|vacation/i, value: 'Paid Time Off' },
      { pattern: /work(?:\s*life|\s*-\s*life)?\s*balance/i, value: 'Work-Life Balance' },
      { pattern: /flexible(?:\s*hours|\s*schedule)/i, value: 'Flexible Schedule' },
      { pattern: /parental leave|maternity|paternity/i, value: 'Parental Leave' },
      { pattern: /stock options|equity/i, value: 'Stock Options/Equity' },
      { pattern: /bonus/i, value: 'Bonuses' },
      { pattern: /professional development|training/i, value: 'Professional Development' }
    ];
    
    const benefits = [];
    for (const { pattern, value } of benefitsPatterns) {
      if (pattern.test(text)) {
        benefits.push(value);
      }
    }
    
    if (benefits.length > 0) {
      preferences.benefits = benefits;
    }
    
    return preferences;
  };

  // Generate contextual suggestions based on conversation
  const generateContextualSuggestions = () => {
    const context = state.conversationContext;
    const preferences = state.userPreferences;
    let suggestions = [];
    
    // Default suggestions if no context
    if (!context) {
      suggestions = [
        "How do I create a good resume?",
        "What are common interview questions?",
        "Help me find jobs in my field",
        "Tips for salary negotiation"
      ];
    } 
    // Resume context suggestions
    else if (context === 'resume') {
      suggestions = [
        "How to highlight skills on my resume?",
        "Resume templates for my industry",
        "Common resume mistakes to avoid",
        "How to write a good cover letter?"
      ];
    } 
    // Interview context suggestions
    else if (context === 'interview') {
      suggestions = [
        "How to answer 'tell me about yourself'?",
        "Questions to ask the interviewer",
        "How to prepare for a technical interview?",
        "What should I wear to an interview?"
      ];
    } 
    // Salary context suggestions
    else if (context === 'salary') {
      suggestions = [
        "What's a good salary for my role?",
        "How to negotiate a higher offer?",
        "Should I discuss salary expectations?",
        "What benefits should I prioritize?"
      ];
    } 
    // Job search context suggestions
    else if (context === 'jobSearch') {
      const jobTypePhrase = preferences.jobType ? preferences.jobType : '';
      const locationPhrase = preferences.location ? `in ${preferences.location}` : '';
      
      suggestions = [
        `Find ${jobTypePhrase} jobs ${locationPhrase}`.trim(),
        "How to stand out in my application?",
        "How long should my job search take?",
        "Should I use a recruiter?"
      ];
    }
    // Skills context suggestions
    else if (context === 'skills') {
      suggestions = [
        "What skills are most in demand?",
        "How can I improve my technical skills?",
        "Best online courses for my field",
        "How to showcase my skills in interviews?"
      ];
    }
    // Career context suggestions
    else if (context === 'career') {
      suggestions = [
        "How to plan my career path?",
        "Should I change industries?",
        "Tips for getting promoted",
        "How to find a mentor?"
      ];
    }
    // Industry context suggestions
    else if (context === 'industry') {
      const industryPhrase = preferences.industry ? preferences.industry.toLowerCase() : 'my industry';
      
      suggestions = [
        `What are the trends in ${industryPhrase}?`,
        `Top companies in ${industryPhrase}`,
        `Skills needed for ${industryPhrase}`,
        `Is ${industryPhrase} growing?`
      ];
    }
    
    // Update suggestions
    updateJobSuggestions(suggestions);
  };

  // Value to be provided by the context
  const value = {
    chatHistory: state.chatHistory,
    isOpen: state.isOpen,
    isMinimized: state.isMinimized,
    isTyping: state.isTyping,
    jobSuggestions: state.jobSuggestions,
    theme: state.theme,
    expertiseLevel: state.expertiseLevel,
    conversationContext: state.conversationContext,
    userPreferences: state.userPreferences,
    addMessage,
    generateBotResponse,
    clearHistory,
    toggleChatbot,
    toggleMinimize,
    updatePreferences,
    updateJobSuggestions,
    setTheme,
    setExpertiseLevel,
    extractJobPreferences,
    generateContextualSuggestions,
    // Expose knowledge base for direct access
    knowledgeBase: jobKnowledgeBase,
    careerGuidance: careerTransitionGuidance
  };

  return (
    <JobChatbotContext.Provider value={value}>
      {children}
    </JobChatbotContext.Provider>
  );
};
