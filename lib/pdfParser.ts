// Enhanced PDF parsing utility
// This is a simplified implementation for demo purposes
// In production, you would use a proper PDF parsing library like pdf-parse or pdf2pic

export interface ParsedResume {
  text: string;
  sections: {
    experience?: string;
    skills?: string;
    education?: string;
    summary?: string;
  };
  extractedSkills: string[];
  workExperience: string[];
}

export async function parseResumeFromBuffer(buffer: ArrayBuffer): Promise<ParsedResume> {
  try {
    // Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(buffer);
    
    // Basic text extraction (simplified)
    const rawText = new TextDecoder().decode(uint8Array);
    
    // Clean and extract text
    const cleanText = cleanExtractedText(rawText);
    
    // Parse sections
    const sections = parseResumeSections(cleanText);
    
    // Extract skills
    const extractedSkills = extractSkillsFromText(cleanText);
    
    // Extract work experience
    const workExperience = extractWorkExperience(cleanText);
    
    return {
      text: cleanText,
      sections,
      extractedSkills,
      workExperience
    };
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error("Failed to parse PDF file");
  }
}

function cleanExtractedText(rawText: string): string {
  return rawText
    .replace(/[^\x20-\x7E\s\n\r]/g, ' ') // Keep only printable ASCII and whitespace
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .trim();
}

function parseResumeSections(text: string): ParsedResume['sections'] {
  const sections: ParsedResume['sections'] = {};
  
  // Simple section detection based on common headers
  const sectionPatterns = {
    experience: /(experience|work history|employment|professional experience)/i,
    skills: /(skills|technical skills|technologies|competencies)/i,
    education: /(education|academic|qualifications|degrees)/i,
    summary: /(summary|profile|objective|about)/i
  };
  
  const lines = text.split('\n');
  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if this line is a section header
    for (const [sectionName, pattern] of Object.entries(sectionPatterns)) {
      if (pattern.test(trimmedLine)) {
        currentSection = sectionName;
        sections[sectionName as keyof ParsedResume['sections']] = '';
        continue;
      }
    }
    
    // Add content to current section
    if (currentSection && trimmedLine) {
      const sectionKey = currentSection as keyof ParsedResume['sections'];
      sections[sectionKey] = (sections[sectionKey] || '') + ' ' + trimmedLine;
    }
  }
  
  // Clean up sections
  Object.keys(sections).forEach(key => {
    const sectionKey = key as keyof ParsedResume['sections'];
    if (sections[sectionKey]) {
      sections[sectionKey] = sections[sectionKey]!.trim();
    }
  });
  
  return sections;
}

function extractSkillsFromText(text: string): string[] {
  const skills: string[] = [];
  
  // Common technical skills patterns
  const skillPatterns = [
    // Programming Languages
    /\b(java|python|javascript|typescript|c#|c\+\+|go|rust|php|ruby|swift|kotlin)\b/gi,
    // Frameworks
    /\b(react|angular|vue|spring|django|flask|express|laravel|rails|\.net)\b/gi,
    // Databases
    /\b(mysql|postgresql|mongodb|redis|oracle|sql server|sqlite)\b/gi,
    // Cloud Platforms
    /\b(aws|azure|google cloud|gcp|docker|kubernetes)\b/gi,
    // Tools
    /\b(git|jenkins|terraform|ansible|jira|confluence)\b/gi,
    // Methodologies
    /\b(agile|scrum|devops|ci\/cd|microservices)\b/gi
  ];
  
  skillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      skills.push(...matches.map(match => match.toLowerCase()));
    }
  });
  
  // Remove duplicates and return unique skills
  return [...new Set(skills)];
}

function extractWorkExperience(text: string): string[] {
  const experience: string[] = [];
  
  // Look for job titles and companies
  const jobPatterns = [
    /(software engineer|developer|architect|manager|lead|senior|junior|intern)/gi,
    /(at|@)\s+([A-Z][a-zA-Z\s&]+)/g,
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}/gi
  ];
  
  const lines = text.split('\n');
  let currentJob = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if line contains job-related information
    if (jobPatterns.some(pattern => pattern.test(trimmedLine))) {
      if (currentJob) {
        experience.push(currentJob.trim());
      }
      currentJob = trimmedLine;
    } else if (currentJob && trimmedLine) {
      currentJob += ' ' + trimmedLine;
    }
  }
  
  if (currentJob) {
    experience.push(currentJob.trim());
  }
  
  return experience;
}

// Fallback function for when PDF parsing fails
export function createFallbackResumeText(): string {
  return `Resume uploaded successfully. The PDF text extraction was limited. 

To get the best career recommendations, please consider:
1. Providing additional details about your recent work experience in the text area below
2. Including specific technologies, frameworks, and tools you've used
3. Describing your key projects and achievements
4. Mentioning any leadership or team collaboration experience

This will help our AI provide more accurate and personalized job recommendations.`;
}
