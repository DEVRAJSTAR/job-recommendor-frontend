// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000/chat-to-gemini',
  TIMEOUT: 30000, // 30 seconds
};

// API Request/Response Types
export interface APIRequest {
  description: string;
}

export interface APIResponse {
  recommendations?: string; // JSON string containing the actual recommendations (old format)
  direct_matches?: DirectMatch[]; // Direct format (new)
  trending_roles?: TrendingRole[]; // Direct format (new)
}

export interface DirectMatch {
  title: string;
  reason: string;
}

export interface TrendingRole {
  title: string;
  existing_skills: string[];
  missing_skills: string[];
}

export interface ParsedRecommendations {
  direct_matches: DirectMatch[];
  trending_roles: TrendingRole[];
}

// Internal application types (for UI display)
export interface JobRecommendation {
  title: string;
  reason: string;
  matchPercentage: number;
  salary: string;
  growth: string;
  skills: string[];
}

export interface TrendingJob {
  title: string;
  existingSkills: string[];
  missingSkills: string[];
  salary: string;
  growth: string;
  learningPath: string[];
}
