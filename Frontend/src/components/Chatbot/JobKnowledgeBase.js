// JobKnowledgeBase.js - Comprehensive knowledge base for the JobBot AI assistant
// This file contains structured information about job search, career development,
// industry insights, and other employment-related topics

export const jobKnowledgeBase = {
  // Resume and CV guidance
  resumeAndCV: {
    bestPractices: [
      "Use a clean, professional format with consistent spacing and fonts",
      "Start with a compelling summary or objective statement",
      "Quantify achievements with specific metrics and results",
      "Tailor your resume for each job application",
      "Include relevant keywords from the job description",
      "Keep your resume to 1-2 pages unless you have extensive relevant experience",
      "Use action verbs to describe your responsibilities and achievements",
      "Proofread carefully for spelling and grammar errors"
    ],
    sections: {
      contact: "Include your name, phone, email, location, and LinkedIn profile",
      summary: "2-3 sentences highlighting your experience, skills, and career goals",
      experience: "List positions in reverse chronological order with company, title, dates, and accomplishments",
      education: "Include degrees, institutions, graduation dates, and relevant coursework or honors",
      skills: "Highlight technical, soft, and industry-specific skills relevant to the position",
      projects: "Showcase relevant projects with descriptions, technologies used, and outcomes",
      certifications: "List professional certifications with dates obtained"
    },
    commonMistakes: [
      "Including personal information like age, marital status, or photos (in most countries)",
      "Using generic objectives or summaries",
      "Including irrelevant experience or skills",
      "Using unprofessional email addresses",
      "Including references or 'References available upon request'",
      "Using excessive jargon or acronyms",
      "Having unexplained employment gaps"
    ],
    ATSOptimization: [
      "Use standard section headings (Experience, Education, Skills)",
      "Include keywords from the job description",
      "Avoid using tables, headers/footers, or text boxes",
      "Use a simple, clean format without graphics or columns",
      "Save your resume as a .docx or .pdf file",
      "Use a standard font like Arial, Calibri, or Times New Roman"
    ],
    templates: {
      chronological: "Best for candidates with a consistent work history in the same field",
      functional: "Highlights skills over work history, good for career changers or gaps",
      combination: "Blends chronological and functional formats for versatility",
      targeted: "Customized for a specific job or industry"
    }
  },

  // Interview preparation
  interviewPreparation: {
    commonQuestions: {
      personal: [
        "Tell me about yourself",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "Why should we hire you?",
        "Why do you want to work for this company?",
        "What motivates you?",
        "How do you handle stress or pressure?",
        "Describe a challenge you faced and how you overcame it"
      ],
      technical: [
        "Questions specific to technical skills required for the role",
        "Problem-solving scenarios related to the job",
        "Knowledge tests about industry-specific concepts",
        "Coding challenges or whiteboard exercises for tech roles"
      ],
      behavioral: [
        "Tell me about a time when you demonstrated leadership",
        "Describe a situation where you had to work as part of a team",
        "Give an example of a goal you reached and how you achieved it",
        "Describe a time when you had to persuade someone to see things your way",
        "Tell me about a time you failed and what you learned from it"
      ]
    },
    preparationTips: [
      "Research the company thoroughly (mission, values, products, recent news)",
      "Study the job description and prepare examples that demonstrate required skills",
      "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions",
      "Prepare thoughtful questions to ask the interviewer",
      "Conduct mock interviews with a friend or mentor",
      "Plan your outfit and travel route in advance",
      "Bring copies of your resume, a notepad, and pen",
      "Follow up with a thank-you email within 24 hours"
    ],
    types: {
      phone: "Initial screening, typically 15-30 minutes with basic questions",
      video: "Similar to in-person but conducted remotely, check your technology in advance",
      inPerson: "Traditional format, focus on body language and building rapport",
      panel: "Multiple interviewers, address each person when answering questions",
      group: "Multiple candidates, demonstrate teamwork and leadership",
      technical: "Skills assessment, may include tests or practical demonstrations",
      behavioral: "Focus on past experiences as indicators of future performance",
      caseStudy: "Problem-solving exercise, focus on your approach and thought process"
    },
    negotiationTips: [
      "Research salary ranges for the position and location",
      "Consider the entire compensation package (benefits, PTO, flexibility)",
      "Practice your negotiation pitch and anticipate objections",
      "Start with a slightly higher number than your target",
      "Be confident but collaborative in your approach",
      "Get the offer in writing before accepting",
      "Express enthusiasm for the role while negotiating"
    ]
  },

  // Job search strategies
  jobSearchStrategies: {
    channels: {
      jobBoards: [
        "Industry-specific job boards",
        "General job sites like Indeed, LinkedIn, Glassdoor",
        "Government job portals",
        "Company career pages"
      ],
      networking: [
        "Professional associations and events",
        "Alumni networks",
        "LinkedIn connections",
        "Informational interviews",
        "Referrals from current employees"
      ],
      directApproach: [
        "Cold outreach to hiring managers",
        "Company-specific tailored applications",
        "Following up on applications"
      ],
      recruiters: [
        "Industry-specific recruiters",
        "Staffing agencies",
        "Headhunters for executive positions"
      ]
    },
    applicationProcess: {
      research: "Thoroughly research the company and position",
      tailoring: "Customize your resume and cover letter for each application",
      tracking: "Maintain a spreadsheet of applications, dates, and follow-ups",
      following: "Follow up within 1-2 weeks if you haven't heard back"
    },
    timelines: {
      application: "Expect to submit many applications; quality over quantity",
      response: "Response times vary from days to weeks",
      interview: "Typically 1-4 rounds depending on the position",
      offer: "Negotiation and acceptance can take 1-2 weeks",
      overall: "Average job search takes 3-6 months"
    },
    remoteWork: {
      platforms: ["Remote-specific job boards", "Companies with remote-first policies"],
      skills: ["Self-management", "Digital communication", "Time management", "Tech proficiency"],
      challenges: ["Isolation", "Work-life balance", "Communication barriers"],
      benefits: ["Flexibility", "No commute", "Potential for global opportunities"]
    }
  },

  // Career development
  careerDevelopment: {
    skillsEnhancement: {
      technical: "Job-specific technical skills (programming languages, tools, software)",
      soft: ["Communication", "Leadership", "Problem-solving", "Adaptability", "Teamwork"],
      transferable: "Skills that apply across different roles and industries"
    },
    continuingEducation: {
      degrees: "Advanced degrees in relevant fields",
      certifications: "Professional certifications to validate expertise",
      courses: "Online courses through platforms like Coursera, Udemy, or LinkedIn Learning",
      workshops: "Industry-specific workshops and seminars"
    },
    networking: {
      professional: "Industry associations and events",
      online: "LinkedIn, Twitter, and other professional social networks",
      mentorship: "Finding mentors in your field",
      communities: "Online and in-person communities of practice"
    },
    careerPaths: {
      vertical: "Traditional upward movement within a field",
      lateral: "Moving to similar positions in different departments or companies",
      entrepreneurial: "Starting your own business or freelancing",
      specialization: "Becoming an expert in a niche area"
    },
    workLifeBalance: {
      boundaries: "Setting clear boundaries between work and personal life",
      flexibility: "Seeking flexible work arrangements",
      selfCare: "Prioritizing physical and mental health",
      timeManagement: "Effective time management techniques"
    }
  },

  // Industry insights
  industryInsights: {
    technology: {
      trends: [
        "Artificial Intelligence and Machine Learning",
        "Cloud Computing",
        "Cybersecurity",
        "DevOps and Agile methodologies",
        "Remote collaboration tools"
      ],
      roles: [
        "Software Engineer",
        "Data Scientist",
        "Cloud Architect",
        "Cybersecurity Specialist",
        "Product Manager",
        "UX/UI Designer"
      ],
      skills: [
        "Programming languages (Python, JavaScript, Java, etc.)",
        "Cloud platforms (AWS, Azure, GCP)",
        "Data analysis and visualization",
        "Agile methodologies",
        "Version control systems"
      ],
      outlook: "Continued growth with emphasis on AI, cloud, and security"
    },
    healthcare: {
      trends: [
        "Telehealth",
        "Electronic Health Records",
        "Personalized medicine",
        "Healthcare analytics",
        "Remote patient monitoring"
      ],
      roles: [
        "Registered Nurse",
        "Physician Assistant",
        "Health Informatics Specialist",
        "Medical Technologist",
        "Healthcare Administrator"
      ],
      skills: [
        "Patient care",
        "Medical terminology",
        "Healthcare software systems",
        "Regulatory compliance",
        "Interpersonal communication"
      ],
      outlook: "Growing demand due to aging population and technological advances"
    },
    finance: {
      trends: [
        "Fintech innovations",
        "Blockchain and cryptocurrency",
        "Automated trading systems",
        "Regulatory technology (RegTech)",
        "Sustainable finance"
      ],
      roles: [
        "Financial Analyst",
        "Investment Banker",
        "Risk Manager",
        "Compliance Officer",
        "Financial Advisor"
      ],
      skills: [
        "Financial analysis",
        "Regulatory knowledge",
        "Data analysis",
        "Financial modeling",
        "Client relationship management"
      ],
      outlook: "Transformation through technology with emphasis on compliance and sustainability"
    },
    marketing: {
      trends: [
        "Digital marketing",
        "Content marketing",
        "Data-driven marketing",
        "Personalization",
        "Social media marketing"
      ],
      roles: [
        "Digital Marketing Specialist",
        "Content Strategist",
        "SEO/SEM Specialist",
        "Social Media Manager",
        "Marketing Analytics Manager"
      ],
      skills: [
        "Digital marketing platforms",
        "Analytics tools",
        "Content creation",
        "SEO/SEM",
        "Social media management"
      ],
      outlook: "Increasing focus on digital channels and data-driven strategies"
    }
  },

  // Salary negotiation
  salaryNegotiation: {
    research: [
      "Use salary comparison tools (Glassdoor, PayScale, Salary.com)",
      "Research industry and location-specific salary ranges",
      "Consider company size and funding status",
      "Factor in your experience and unique skills"
    ],
    timing: [
      "Wait until you have an offer before discussing salary",
      "Express enthusiasm for the role before negotiating",
      "Take time to consider the offer (24-48 hours is standard)"
    ],
    tactics: [
      "Start with a slightly higher number than your target",
      "Focus on the value you bring to the company",
      "Consider the entire compensation package, not just salary",
      "Be prepared to justify your request with market data and achievements",
      "Practice your negotiation script beforehand"
    ],
    benefits: [
      "Health insurance",
      "Retirement plans",
      "Paid time off",
      "Flexible work arrangements",
      "Professional development",
      "Stock options or equity",
      "Bonuses",
      "Remote work options"
    ],
    commonMistakes: [
      "Accepting the first offer without negotiation",
      "Focusing only on base salary",
      "Providing salary history or requirements too early",
      "Making demands rather than requests",
      "Not being prepared with market research"
    ]
  },

  // Job market trends
  jobMarketTrends: {
    emerging: [
      "Remote and hybrid work models",
      "Gig economy and contract work",
      "Focus on diversity, equity, and inclusion",
      "Skills-based hiring over credentials",
      "Emphasis on digital and technical skills across industries"
    ],
    inDemandSkills: {
      technical: [
        "Data analysis",
        "Cloud computing",
        "Artificial intelligence",
        "Cybersecurity",
        "Digital marketing"
      ],
      soft: [
        "Adaptability",
        "Critical thinking",
        "Emotional intelligence",
        "Communication",
        "Collaboration in virtual environments"
      ]
    },
    industryGrowth: {
      highGrowth: [
        "Healthcare",
        "Technology",
        "Renewable energy",
        "E-commerce",
        "Cybersecurity"
      ],
      stable: [
        "Education",
        "Government",
        "Utilities",
        "Essential retail",
        "Food production"
      ],
      challenging: [
        "Traditional retail",
        "Print media",
        "Oil and gas",
        "Travel and hospitality (recovering)",
        "Manufacturing (location-dependent)"
      ]
    },
    futureOfWork: [
      "Increased automation and AI integration",
      "Greater emphasis on continuous learning",
      "More flexible work arrangements",
      "Focus on employee wellbeing and mental health",
      "Blending of human and technological skills"
    ]
  }
};

// Career transition guidance
export const careerTransitionGuidance = {
  steps: [
    "Self-assessment of skills, interests, and values",
    "Research potential career paths that align with your profile",
    "Identify skill gaps and create a development plan",
    "Build a network in your target industry",
    "Gain relevant experience through projects, volunteering, or part-time work",
    "Reframe your resume to highlight transferable skills",
    "Prepare for interviews with industry-specific knowledge"
  ],
  commonTransitions: {
    toTech: {
      fromBusiness: "Focus on data analysis, project management, or product roles",
      fromCreative: "Consider UX/UI design, content creation, or digital marketing",
      fromEducation: "Look into instructional design, edtech, or technical training"
    },
    toHealthcare: {
      fromBusiness: "Administrative, management, or health informatics roles",
      fromTech: "Health IT, medical device development, or bioinformatics",
      fromService: "Patient care, support services, or community health"
    },
    toRemote: {
      strategies: [
        "Develop strong digital communication skills",
        "Build a portfolio of remote-friendly work",
        "Emphasize self-management and productivity skills",
        "Target companies with established remote cultures"
      ]
    }
  },
  challenges: [
    "Lack of industry-specific experience",
    "Convincing employers of transferable skills",
    "Potential salary adjustments during transition",
    "Learning curve for new industry knowledge",
    "Building a new professional network"
  ],
  success: [
    "Start with realistic expectations",
    "Be patient and persistent",
    "Leverage transferable skills in your narrative",
    "Find mentors in your target industry",
    "Consider stepping stone roles to bridge the gap"
  ]
};

// Response templates for common job search questions
export const responseTemplates = {
  resumeHelp: (skills = [], experience = "mid-level") => {
    const skillsAdvice = skills.length > 0 
      ? `For someone with skills in ${skills.join(", ")}, I recommend highlighting specific projects or achievements that showcase these abilities.` 
      : "Make sure to highlight your most relevant skills with specific examples of how you've applied them.";
    
    const experienceAdvice = experience === "entry-level" 
      ? "Since you're early in your career, focus on education, internships, projects, and transferable skills from other experiences." 
      : experience === "senior" 
        ? "With your extensive experience, focus on leadership, strategic initiatives, and measurable impacts you've had in your roles." 
        : "Balance your professional experience with specific achievements and the skills you've developed along the way.";
    
    return `Here are my top resume tips for you:\n\n1. ${skillsAdvice}\n2. ${experienceAdvice}\n3. Quantify your achievements with specific metrics when possible.\n4. Tailor your resume for each job application by matching keywords from the job description.\n5. Keep your format clean and professional with consistent formatting.`;
  },
  
  interviewPrep: (role = "", industry = "") => {
    const roleSpecific = role 
      ? `For a ${role} position, prepare to discuss specific examples of ${role.includes("manager") ? "leadership and team management" : "technical skills and problem-solving"}.` 
      : "Prepare specific examples that demonstrate your skills and experiences relevant to the position.";
    
    const industrySpecific = industry 
      ? `In the ${industry} industry, stay updated on trends like ${getIndustryTrends(industry).join(", ")}.` 
      : "Research the company thoroughly and understand their industry position and challenges.";
    
    return `Here's how to prepare for your upcoming interview:\n\n1. ${roleSpecific}\n2. ${industrySpecific}\n3. Practice the STAR method (Situation, Task, Action, Result) for behavioral questions.\n4. Prepare thoughtful questions to ask the interviewer.\n5. Conduct a mock interview with a friend or mentor if possible.\n6. Plan your outfit and test your technology (for virtual interviews) in advance.`;
  },
  
  salaryNegotiation: (role = "", location = "", experience = "mid-level") => {
    const roleAdvice = role 
      ? `For ${role} positions, the typical salary range varies, but you should research current market rates for your specific area.` 
      : "Research salary ranges for the position using sites like Glassdoor, PayScale, or Salary.com.";
    
    const locationAdvice = location 
      ? `In ${location}, consider the cost of living and local market conditions when evaluating offers.` 
      : "Factor in location and cost of living when evaluating salary offers.";
    
    const experienceAdvice = experience === "entry-level" 
      ? "As someone early in your career, focus on growth opportunities and the total compensation package, not just salary." 
      : experience === "senior" 
        ? "With your senior experience, you can negotiate more confidently based on the specific value you bring to the organization." 
        : "With your experience level, balance salary requests with the value you've demonstrated in previous roles.";
    
    return `Here are my salary negotiation tips:\n\n1. ${roleAdvice}\n2. ${locationAdvice}\n3. ${experienceAdvice}\n4. Consider the entire compensation package, including benefits, PTO, flexibility, and growth opportunities.\n5. Practice your negotiation conversation beforehand, focusing on the value you bring.\n6. Wait until you have an offer before discussing specific numbers.`;
  },
  
  jobSearch: (preferences = {}) => {
    const typeAdvice = preferences.jobType 
      ? `For ${preferences.jobType} positions, focus on platforms that specialize in these opportunities.` 
      : "Define what type of role you're looking for (full-time, part-time, contract, etc.).";
    
    const industryAdvice = preferences.industry 
      ? `In the ${preferences.industry} industry, consider industry-specific job boards and networking groups.` 
      : "Target your search to specific industries that interest you.";
    
    const skillsAdvice = preferences.skills && preferences.skills.length > 0 
      ? `With your skills in ${preferences.skills.join(", ")}, highlight these prominently in your applications.` 
      : "Identify your key skills and search for positions that value these abilities.";
    
    return `Here's my job search strategy for you:\n\n1. ${typeAdvice}\n2. ${industryAdvice}\n3. ${skillsAdvice}\n4. Create job alerts on major job boards and company career pages.\n5. Leverage your professional network and inform contacts about your job search.\n6. Follow up on applications after 1-2 weeks if you haven't heard back.\n7. Track your applications and follow-ups in a spreadsheet or job search tool.`;
  }
};

// Helper function for industry trends
function getIndustryTrends(industry) {
  const industryLower = industry.toLowerCase();
  
  if (industryLower.includes("tech") || industryLower.includes("software") || industryLower.includes("it")) {
    return jobKnowledgeBase.industryInsights.technology.trends;
  } else if (industryLower.includes("health") || industryLower.includes("medical") || industryLower.includes("care")) {
    return jobKnowledgeBase.industryInsights.healthcare.trends;
  } else if (industryLower.includes("financ") || industryLower.includes("bank") || industryLower.includes("invest")) {
    return jobKnowledgeBase.industryInsights.finance.trends;
  } else if (industryLower.includes("market") || industryLower.includes("advertis") || industryLower.includes("brand")) {
    return jobKnowledgeBase.industryInsights.marketing.trends;
  } else {
    return ["digital transformation", "remote work", "sustainability", "data-driven decision making"];
  }
}

// Advanced response generation
export function generateAdvancedResponse(userInput, userPreferences, conversationHistory = []) {
  const input = userInput.toLowerCase();
  let response = "";
  
  // Check for resume-related queries
  if (input.includes("resume") || input.includes("cv")) {
    response = responseTemplates.resumeHelp(userPreferences.skills, userPreferences.experience);
  } 
  // Check for interview-related queries
  else if (input.includes("interview") || input.includes("prepare")) {
    response = responseTemplates.interviewPrep(userPreferences.jobType, userPreferences.industry);
  } 
  // Check for salary-related queries
  else if (input.includes("salary") || input.includes("negotiate") || input.includes("compensation")) {
    response = responseTemplates.salaryNegotiation(userPreferences.jobType, userPreferences.location, userPreferences.experience);
  } 
  // Check for job search queries
  else if (input.includes("find job") || input.includes("job search") || input.includes("looking for job")) {
    response = responseTemplates.jobSearch(userPreferences);
  } 
  // Default response with conversation awareness
  else {
    // Analyze conversation history for context if available
    let context = "general";
    if (conversationHistory.length > 0) {
      const recentMessages = conversationHistory.slice(-3);
      if (recentMessages.some(msg => msg.text.toLowerCase().includes("resume") || msg.text.toLowerCase().includes("cv"))) {
        context = "resume";
      } else if (recentMessages.some(msg => msg.text.toLowerCase().includes("interview"))) {
        context = "interview";
      } else if (recentMessages.some(msg => msg.text.toLowerCase().includes("salary"))) {
        context = "salary";
      } else if (recentMessages.some(msg => msg.text.toLowerCase().includes("job search"))) {
        context = "jobSearch";
      }
    }
    
    // Generate contextual response
    switch(context) {
      case "resume":
        response = "I notice we've been discussing resumes. Is there a specific aspect of your resume you'd like help with?";
        break;
      case "interview":
        response = "Since we're talking about interviews, would you like tips on a specific type of interview question?";
        break;
      case "salary":
        response = "Regarding compensation, have you researched the typical salary range for your target position?";
        break;
      case "jobSearch":
        response = "For your job search, have you considered networking as a strategy to find opportunities?";
        break;
      default:
        response = "I'm here to help with your job search and career questions. Would you like advice on resumes, interviews, job searching, or salary negotiation?";
    }
  }
  
  return response;
}
