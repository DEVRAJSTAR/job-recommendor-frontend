import { API_CONFIG, APIRequest, APIResponse, ParsedRecommendations, DirectMatch, TrendingRole, JobRecommendation, TrendingJob } from './config';

export interface AnalysisResult {
  directFitJobs: JobRecommendation[];
  trendingJobs: TrendingJob[];
  extractedSkills: string[];
  focusAreas: string[];
}

// Skill extraction keywords mapping
const skillKeywords = {
  // Programming Languages
  'Java': ['java', 'spring boot', 'spring framework'],
  'Python': ['python', 'django', 'flask', 'fastapi'],
  'JavaScript': ['javascript', 'js', 'node.js', 'nodejs', 'typescript'],
  'C#': ['c#', 'csharp', '.net', 'dotnet'],
  'Go': ['go', 'golang'],
  'Rust': ['rust'],
  'PHP': ['php', 'laravel', 'symfony'],
  'Ruby': ['ruby', 'rails', 'ruby on rails'],
  
  // Frontend Technologies
  'React': ['react', 'reactjs', 'jsx'],
  'Vue.js': ['vue', 'vuejs', 'vue.js'],
  'Angular': ['angular', 'angularjs'],
  'Next.js': ['next.js', 'nextjs'],
  'HTML/CSS': ['html', 'css', 'scss', 'sass', 'less'],
  
  // Backend & APIs
  'REST APIs': ['rest', 'api', 'restful'],
  'GraphQL': ['graphql'],
  'Microservices': ['microservices', 'microservice'],
  'Serverless': ['serverless', 'lambda', 'azure functions'],
  
  // Databases
  'MySQL': ['mysql'],
  'PostgreSQL': ['postgresql', 'postgres'],
  'MongoDB': ['mongodb', 'mongo'],
  'Redis': ['redis'],
  'Oracle': ['oracle'],
  'SQL Server': ['sql server', 'mssql'],
  
  // Cloud Platforms
  'AWS': ['aws', 'amazon web services'],
  'Azure': ['azure', 'microsoft azure'],
  'Google Cloud': ['gcp', 'google cloud', 'google cloud platform'],
  'Docker': ['docker', 'containerization'],
  'Kubernetes': ['kubernetes', 'k8s'],
  
  // DevOps & CI/CD
  'Jenkins': ['jenkins'],
  'GitLab CI': ['gitlab ci', 'gitlab'],
  'GitHub Actions': ['github actions', 'github ci'],
  'Terraform': ['terraform'],
  'Ansible': ['ansible'],
  
  // Testing
  'Unit Testing': ['unit test', 'testing', 'junit', 'pytest'],
  'Integration Testing': ['integration test', 'e2e', 'end-to-end'],
  'Test Automation': ['test automation', 'selenium', 'cypress'],
  
  // Project Management
  'Agile': ['agile', 'scrum', 'sprint'],
  'JIRA': ['jira'],
  'Confluence': ['confluence'],
  'Team Leadership': ['lead', 'leadership', 'team lead', 'mentor'],
  
  // Security
  'Security': ['security', 'cybersecurity', 'penetration testing'],
  'Authentication': ['authentication', 'oauth', 'jwt', 'saml'],
  
  // AI/ML
  'Machine Learning': ['machine learning', 'ml', 'tensorflow', 'pytorch'],
  'Data Science': ['data science', 'pandas', 'numpy', 'scikit-learn'],
  'AI': ['artificial intelligence', 'ai', 'deep learning'],
};

// Job role definitions with required skills
const jobRoles = {
  'Backend Developer': {
    skills: ['Java', 'Python', 'REST APIs', 'Microservices', 'MySQL', 'PostgreSQL'],
    keywords: ['backend', 'server', 'api', 'database'],
    salary: '$70,000 - $120,000',
    growth: 'High'
  },
  'Frontend Developer': {
    skills: ['React', 'Vue.js', 'Angular', 'JavaScript', 'HTML/CSS'],
    keywords: ['frontend', 'ui', 'user interface', 'client-side'],
    salary: '$60,000 - $110,000',
    growth: 'High'
  },
  'Full Stack Developer': {
    skills: ['React', 'Node.js', 'JavaScript', 'REST APIs', 'MySQL', 'PostgreSQL'],
    keywords: ['full stack', 'fullstack', 'both frontend and backend'],
    salary: '$75,000 - $130,000',
    growth: 'Very High'
  },
  'DevOps Engineer': {
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    keywords: ['devops', 'deployment', 'ci/cd', 'infrastructure'],
    salary: '$80,000 - $140,000',
    growth: 'Very High'
  },
  'Cloud Engineer': {
    skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
    keywords: ['cloud', 'aws', 'azure', 'gcp'],
    salary: '$85,000 - $150,000',
    growth: 'Very High'
  },
  'Software Architect': {
    skills: ['Microservices', 'System Design', 'Team Leadership', 'REST APIs'],
    keywords: ['architect', 'architecture', 'design', 'senior'],
    salary: '$120,000 - $200,000',
    growth: 'High'
  },
  'Data Engineer': {
    skills: ['Python', 'SQL', 'AWS', 'Data Pipelines', 'ETL'],
    keywords: ['data', 'etl', 'pipeline', 'analytics'],
    salary: '$75,000 - $130,000',
    growth: 'Very High'
  },
  'QA Engineer': {
    skills: ['Testing', 'Test Automation', 'Selenium', 'Agile'],
    keywords: ['qa', 'testing', 'quality', 'test automation'],
    salary: '$55,000 - $95,000',
    growth: 'Medium'
  },
  'Tech Lead': {
    skills: ['Team Leadership', 'Agile', 'Code Review', 'Architecture'],
    keywords: ['lead', 'leadership', 'mentor', 'senior'],
    salary: '$100,000 - $160,000',
    growth: 'High'
  },
  'Mobile Developer': {
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    keywords: ['mobile', 'ios', 'android', 'react native', 'flutter'],
    salary: '$65,000 - $115,000',
    growth: 'High'
  }
};

// Trending jobs with skill requirements
const trendingJobs = {
  'AI Engineer': {
    existingSkills: ['Python', 'AWS', 'Cloud Platforms'],
    missingSkills: ['Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science'],
    salary: '$90,000 - $160,000',
    growth: 'Explosive',
    learningPath: ['Python ML Libraries', 'Deep Learning', 'AI Frameworks', 'Statistics']
  },
  'Cybersecurity Specialist': {
    existingSkills: ['System Administration', 'Networking', 'Security'],
    missingSkills: ['Penetration Testing', 'Security Tools', 'Compliance', 'Risk Assessment'],
    salary: '$70,000 - $130,000',
    growth: 'Very High',
    learningPath: ['Security Certifications', 'Penetration Testing', 'Security Tools', 'Compliance']
  },
  'Blockchain Developer': {
    existingSkills: ['JavaScript', 'Backend Development', 'APIs'],
    missingSkills: ['Solidity', 'Smart Contracts', 'Web3', 'Cryptography'],
    salary: '$80,000 - $150,000',
    growth: 'High',
    learningPath: ['Blockchain Fundamentals', 'Solidity', 'Smart Contracts', 'Web3']
  },
  'Cloud Security Engineer': {
    existingSkills: ['AWS', 'Cloud Platforms', 'Security'],
    missingSkills: ['Cloud Security Tools', 'Compliance', 'Identity Management', 'Security Monitoring'],
    salary: '$85,000 - $145,000',
    growth: 'Very High',
    learningPath: ['Cloud Security', 'Compliance', 'Security Tools', 'Identity Management']
  },
  'Data Scientist': {
    existingSkills: ['Python', 'SQL', 'Analytics'],
    missingSkills: ['Machine Learning', 'Statistics', 'Data Visualization', 'Big Data Tools'],
    salary: '$75,000 - $140,000',
    growth: 'Very High',
    learningPath: ['Statistics', 'Machine Learning', 'Data Visualization', 'Big Data']
  }
};

// API call to get job recommendations
export async function analyzeExperience(experience: string, inputMethod: 'text' | 'resume' = 'text'): Promise<AnalysisResult> {
  try {
    // Create form data for the API request
    const formData = new FormData();
    formData.append('description', experience);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(API_CONFIG.BASE_URL, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
        if (errorData.details) {
          errorMessage += ` - ${errorData.details}`;
        }
      } catch (e) {
        // Ignore JSON parse errors for error responses
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Debug logging
    console.log('API Response received:', data);

    // Validate API response
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    // Check if response has the old format (wrapped in recommendations) or new format (direct)
    let parsedRecommendations: ParsedRecommendations;
    
    if (data.recommendations && typeof data.recommendations === 'string') {
      // Old format: data.recommendations contains JSON string
      console.log('Using old format - parsing recommendations string');
      try {
        // Clean the response by removing markdown code blocks if present
        let cleanJson = data.recommendations.trim();
        
        // Remove markdown code blocks if present
        if (cleanJson.startsWith('```json')) {
          cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanJson.startsWith('```')) {
          cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        console.log('Cleaned JSON string:', cleanJson);
        parsedRecommendations = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error('Failed to parse recommendations JSON:', parseError);
        console.error('Raw recommendations data:', data.recommendations);
        throw new Error('Invalid JSON format in recommendations field');
      }
    } else if (data.direct_matches && data.trending_roles) {
      // New format: direct JSON object with direct_matches and trending_roles
      console.log('Using new format - direct JSON object');
      parsedRecommendations = data as ParsedRecommendations;
    } else {
      console.error('API response structure:', JSON.stringify(data, null, 2));
      throw new Error('API response missing required fields (direct_matches, trending_roles)');
    }

    // Validate parsed recommendations structure
    if (!parsedRecommendations || typeof parsedRecommendations !== 'object') {
      throw new Error('Parsed recommendations is not a valid object');
    }

    if (!Array.isArray(parsedRecommendations.direct_matches)) {
      console.warn('direct_matches is not an array, using empty array');
      parsedRecommendations.direct_matches = [];
    }

    if (!Array.isArray(parsedRecommendations.trending_roles)) {
      console.warn('trending_roles is not an array, using empty array');
      parsedRecommendations.trending_roles = [];
    }

    // Convert API response to our internal format
    const directFitJobs: JobRecommendation[] = parsedRecommendations.direct_matches.map((match, index) => ({
      title: match.title,
      reason: match.reason,
      matchPercentage: Math.max(70, 95 - (index * 5)), // Decreasing match percentage
      salary: getSalaryForRole(match.title),
      growth: getGrowthForRole(match.title),
      skills: extractSkillsFromTitle(match.title)
    }));

    const trendingJobs: TrendingJob[] = parsedRecommendations.trending_roles.map((role) => ({
      title: role.title,
      existingSkills: role.existing_skills,
      missingSkills: role.missing_skills,
      salary: getSalaryForRole(role.title),
      growth: getGrowthForRole(role.title),
      learningPath: generateLearningPath(role.missing_skills)
    }));

    // Extract skills from the experience text for display
    const extractedSkills = extractSkillsFromExperience(experience);
    const focusAreas = extractFocusAreas(experience);

    return {
      directFitJobs,
      trendingJobs,
      extractedSkills,
      focusAreas
    };
  } catch (error) {
    console.error('API call failed:', error);
    
    // Fallback to mock data if API fails
    return getMockAnalysisResult(experience);
  }
}

// Helper functions to enhance API data
function getSalaryForRole(title: string): string {
  const salaryRanges: { [key: string]: string } = {
    'Junior Software Developer': '$50,000 - $75,000',
    'C++ Programmer': '$55,000 - $85,000',
    'Game Programmer': '$45,000 - $80,000',
    'Embedded Systems Engineer': '$70,000 - $110,000',
    'Backend Developer': '$65,000 - $120,000',
    'Software Developer': '$60,000 - $100,000',
    'Senior Developer': '$90,000 - $150,000',
    'Lead Developer': '$100,000 - $180,000'
  };

  for (const [key, salary] of Object.entries(salaryRanges)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return salary;
    }
  }
  return '$50,000 - $90,000'; // Default range
}

function getGrowthForRole(title: string): string {
  const growthRates: { [key: string]: string } = {
    'Junior': 'High',
    'Senior': 'Medium',
    'Lead': 'Medium',
    'Embedded': 'Very High',
    'Backend': 'High',
    'Game': 'Medium'
  };

  for (const [key, growth] of Object.entries(growthRates)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return growth;
    }
  }
  return 'High'; // Default growth
}

function extractSkillsFromTitle(title: string): string[] {
  const skills: string[] = [];
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('c++')) skills.push('C++');
  if (titleLower.includes('embedded')) skills.push('Embedded Systems');
  if (titleLower.includes('backend')) skills.push('Backend Development');
  if (titleLower.includes('game')) skills.push('Game Development');
  if (titleLower.includes('software')) skills.push('Software Development');
  
  return skills;
}

function generateLearningPath(missingSkills: string[]): string[] {
  const learningPaths: { [key: string]: string[] } = {
    'Real-time operating systems (RTOS)': ['Learn RTOS concepts', 'Practice with FreeRTOS', 'Build embedded projects'],
    'Microcontroller programming': ['Study microcontroller architecture', 'Practice with Arduino/STM32', 'Learn assembly language'],
    'Hardware debugging': ['Learn oscilloscope usage', 'Practice with logic analyzers', 'Study circuit analysis'],
    'Backend frameworks': ['Learn Node.js or Python/Django', 'Practice API development', 'Study database design'],
    'Cloud computing': ['Start with AWS basics', 'Learn containerization', 'Practice deployment'],
    'Database management': ['Learn SQL fundamentals', 'Practice with PostgreSQL/MySQL', 'Study NoSQL databases'],
    'API design': ['Learn REST principles', 'Practice with OpenAPI', 'Study GraphQL']
  };

  const path: string[] = [];
  missingSkills.forEach(skill => {
    if (learningPaths[skill]) {
      path.push(...learningPaths[skill]);
    }
  });
  
  return path.length > 0 ? path : ['Study relevant documentation', 'Practice with tutorials', 'Build sample projects'];
}

function extractSkillsFromExperience(experience: string): string[] {
  const lowerExperience = experience.toLowerCase();
  const skills: string[] = [];
  
  Object.entries(skillKeywords).forEach(([skill, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerExperience.includes(keyword.toLowerCase())) {
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      }
    });
  });
  
  return skills;
}

function extractFocusAreas(experience: string): string[] {
  const lowerExperience = experience.toLowerCase();
  const focusAreas: string[] = [];
  
  if (lowerExperience.includes('c++') || lowerExperience.includes('cpp')) {
    focusAreas.push('C++ Development');
  }
  if (lowerExperience.includes('embedded') || lowerExperience.includes('microcontroller')) {
    focusAreas.push('Embedded Systems');
  }
  if (lowerExperience.includes('backend') || lowerExperience.includes('server')) {
    focusAreas.push('Backend Development');
  }
  if (lowerExperience.includes('game') || lowerExperience.includes('gaming')) {
    focusAreas.push('Game Development');
  }
  if (lowerExperience.includes('software') || lowerExperience.includes('programming')) {
    focusAreas.push('Software Development');
  }
  
  return focusAreas.length > 0 ? focusAreas : ['Software Development'];
}

// Fallback mock analysis function
function getMockAnalysisResult(experience: string): AnalysisResult {
  const lowerExperience = experience.toLowerCase();
  
  // Extract skills from experience
  const extractedSkills: string[] = [];
  const skillScores: { [key: string]: number } = {};
  
  Object.entries(skillKeywords).forEach(([skill, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerExperience.includes(keyword.toLowerCase())) {
        if (!extractedSkills.includes(skill)) {
          extractedSkills.push(skill);
        }
        skillScores[skill] = (skillScores[skill] || 0) + 1;
      }
    });
  });
  
  // Identify focus areas
  const focusAreas: string[] = [];
  if (lowerExperience.includes('backend') || lowerExperience.includes('server')) {
    focusAreas.push('Backend Development');
  }
  if (lowerExperience.includes('frontend') || lowerExperience.includes('ui')) {
    focusAreas.push('Frontend Development');
  }
  if (lowerExperience.includes('cloud') || lowerExperience.includes('aws') || lowerExperience.includes('azure')) {
    focusAreas.push('Cloud Computing');
  }
  if (lowerExperience.includes('devops') || lowerExperience.includes('deployment')) {
    focusAreas.push('DevOps');
  }
  if (lowerExperience.includes('lead') || lowerExperience.includes('team')) {
    focusAreas.push('Leadership');
  }
  if (lowerExperience.includes('data') || lowerExperience.includes('analytics')) {
    focusAreas.push('Data & Analytics');
  }
  
  // Calculate job matches
  const jobMatches = Object.entries(jobRoles).map(([title, role]) => {
    let matchScore = 0;
    let matchedSkills: string[] = [];
    
    role.skills.forEach(skill => {
      if (extractedSkills.includes(skill)) {
        matchScore += skillScores[skill] || 1;
        matchedSkills.push(skill);
      }
    });
    
    // Bonus for keyword matches
    role.keywords.forEach(keyword => {
      if (lowerExperience.includes(keyword.toLowerCase())) {
        matchScore += 2;
      }
    });
    
    return {
      title,
      role,
      matchScore,
      matchedSkills
    };
  }).filter(match => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
  
  // Generate direct fit recommendations (top 3)
  const directFitJobs: JobRecommendation[] = jobMatches.slice(0, 3).map((match, index) => {
    const matchPercentage = Math.min(95, Math.max(60, (match.matchScore / 10) * 100));
    return {
      title: match.title,
      reason: `Strong match based on your ${match.matchedSkills.join(', ')} experience. Your background in ${focusAreas.join(' and ') || 'software development'} aligns well with this role.`,
      matchPercentage: Math.round(matchPercentage),
      salary: match.role.salary,
      growth: match.role.growth,
      skills: match.matchedSkills
    };
  });
  
  // Generate trending job recommendations (top 2)
  const trendingJobList: TrendingJob[] = Object.entries(trendingJobs)
    .map(([title, job]) => {
      const existingSkills = job.existingSkills.filter(skill => 
        extractedSkills.some(extracted => extracted.toLowerCase().includes(skill.toLowerCase()))
      );
      
      return {
        title,
        existingSkills,
        missingSkills: job.missingSkills,
        salary: job.salary,
        growth: job.growth,
        learningPath: job.learningPath
      };
    })
    .filter(job => job.existingSkills.length > 0)
    .slice(0, 2);
  
  // If no trending jobs match, provide default ones
  if (trendingJobList.length === 0) {
    trendingJobList.push(
      trendingJobs['AI Engineer'],
      trendingJobs['Cybersecurity Specialist']
    );
  }
  
  return {
    directFitJobs,
    trendingJobs: trendingJobList,
    extractedSkills,
    focusAreas
  };
}
