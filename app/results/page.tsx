"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Brain, 
  CheckCircle, 
  ExternalLink, 
  TrendingUp, 
  Users,
  Zap,
  Target,
  Star,
  Clock,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { analyzeExperience, AnalysisResult } from "../../lib/recommendationEngine";

export default function ResultsPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMethod, setInputMethod] = useState<string>('text');
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const experience = localStorage.getItem('userExperience');
    const method = localStorage.getItem('inputMethod');
    
    if (!experience) {
      window.location.href = '/input';
      return;
    }

    setInputMethod(method || 'text');

    // Call the API to get job recommendations
    const fetchRecommendations = async () => {
      try {
        setError(null);
        const result = await analyzeExperience(experience, (method as 'text' | 'resume') || 'text');
        setAnalysisResult(result);
        
        // Check if we're using fallback data (this would be indicated by the API call)
        // For now, we'll assume if we get here without error, it's from the API
        setIsUsingFallback(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        
        // Determine the specific error message
        let errorMessage = 'Failed to connect to our AI service. Using offline analysis instead.';
        if (error instanceof Error) {
          if (error.message.includes('JSON')) {
            errorMessage = 'Received invalid data from AI service. Using offline analysis instead.';
          } else if (error.message.includes('API request failed')) {
            errorMessage = 'AI service is currently unavailable. Using offline analysis instead.';
          } else if (error.message.includes('timeout')) {
            errorMessage = 'AI service took too long to respond. Using offline analysis instead.';
          }
        }
        
        setError(errorMessage);
        setIsUsingFallback(true);
        
        // The analyzeExperience function will fallback to mock data on error
        const result = await analyzeExperience(experience, (method as 'text' | 'resume') || 'text');
        setAnalysisResult(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--pink-lavender-900)] via-[var(--lilac-900)] to-[var(--african-violet-900)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[var(--african-violet)] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[var(--russian-violet)] mb-2">
            Analyzing Your Career Journey
          </h2>
          <p className="text-[var(--ultra-violet)]">
            Our AI is processing your experience and finding the perfect matches...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!analysisResult) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--pink-lavender-900)] via-[var(--lilac-900)] to-[var(--african-violet-900)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/input" className="inline-flex items-center gap-2 text-[var(--russian-violet)] hover:text-[var(--african-violet)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Input
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Brain className="w-4 h-4 text-[var(--african-violet)]" />
              <span className="text-sm font-medium text-[var(--russian-violet)]">
                Your Career Analysis {inputMethod === 'resume' ? '(from Resume)' : '(from Description)'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--russian-violet)] mb-4">
              Your Career Recommendations
            </h1>
            <p className="text-xl text-[var(--ultra-violet)] max-w-3xl mx-auto leading-relaxed">
              Based on your experience, here are your personalized career recommendations and growth opportunities.
            </p>
          </motion.div>
        </div>

        {/* Error/Status Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="glass rounded-2xl p-6 shadow-2xl border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--russian-violet)]">
                  Service Notice
                </h3>
              </div>
              <p className="text-[var(--ultra-violet)]">
                {error}
              </p>
            </div>
          </motion.div>
        )}

        {isUsingFallback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="glass rounded-2xl p-6 shadow-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">ℹ️</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--russian-violet)]">
                  Using Offline Analysis
                </h3>
              </div>
              <p className="text-[var(--ultra-violet)]">
                We're using our offline analysis engine to provide you with recommendations. Results may be less personalized than our AI-powered analysis.
              </p>
            </div>
          </motion.div>
        )}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-[var(--russian-violet)] mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--african-violet)]" />
              Skills Detected
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {analysisResult.extractedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            {analysisResult.focusAreas.length > 0 && (
              <div>
                <h4 className="font-semibold text-[var(--russian-violet)] mb-2">Focus Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="bg-[var(--pink-lavender)] text-[var(--russian-violet)] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Direct Fit Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--russian-violet)] mb-8 text-center flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-[var(--african-violet)]" />
            Your Best Match Careers
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisResult.directFitJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[var(--african-violet)]/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[var(--russian-violet)]">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-[var(--african-violet)] text-white px-2 py-1 rounded-full text-sm font-semibold">
                    <Star className="w-3 h-3" />
                    {job.matchPercentage}%
                  </div>
                </div>
                
                <p className="text-[var(--ultra-violet)] mb-4 leading-relaxed">
                  {job.reason}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[var(--african-violet)]" />
                    <span className="text-[var(--ultra-violet)] font-medium">Salary:</span>
                    <span className="text-[var(--russian-violet)] font-semibold">{job.salary}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-[var(--african-violet)]" />
                    <span className="text-[var(--ultra-violet)] font-medium">Growth:</span>
                    <span className="text-[var(--russian-violet)] font-semibold">{job.growth}</span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-[var(--russian-violet)] mb-2 text-sm">Your Matching Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-[var(--pink-lavender-200)] text-[var(--russian-violet)] px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  Explore Jobs
                  <ExternalLink className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trending Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--russian-violet)] mb-8 text-center flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-[var(--lilac)]" />
            Future Growth Careers
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {analysisResult.trendingJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="glass rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[var(--lilac)]/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[var(--russian-violet)]">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-[var(--lilac)] text-white px-2 py-1 rounded-full text-sm font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {job.growth}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[var(--lilac)]" />
                    <span className="text-[var(--ultra-violet)] font-medium">Salary:</span>
                    <span className="text-[var(--russian-violet)] font-semibold">{job.salary}</span>
                  </div>
                  
                  {job.existingSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[var(--russian-violet)] mb-2 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Skills You Already Have:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {job.existingSkills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-[var(--russian-violet)] mb-2 text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[var(--african-violet)]" />
                      Skills to Learn:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-[var(--pink-lavender-200)] text-[var(--russian-violet)] px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[var(--russian-violet)] mb-2 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--lilac)]" />
                      Learning Path:
                    </h4>
                    <div className="space-y-1">
                      {job.learningPath.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-2 text-xs text-[var(--ultra-violet)]">
                          <div className="w-2 h-2 bg-[var(--lilac)] rounded-full"></div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-[var(--lilac)] to-[var(--pink-lavender)] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  Learn These Skills
                  <BookOpen className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-[var(--russian-violet)] mb-4">
              Ready to Take the Next Step?
            </h3>
            <p className="text-[var(--ultra-violet)] mb-6 leading-relaxed">
              Use these recommendations to guide your career decisions, update your resume, or plan your learning journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/input">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Try Again
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass text-[var(--russian-violet)] px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                Save Results
                <Users className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
