"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, Send, Sparkles, Upload, Type } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ResumeUpload from "../../components/ResumeUpload";

export default function InputPage() {
  const [experience, setExperience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [inputMethod, setInputMethod] = useState<'text' | 'resume'>('text');
  const [uploadedResumeText, setUploadedResumeText] = useState<string | null>(null);
  const [isProcessingResume, setIsProcessingResume] = useState(false);

  const handleExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setExperience(value);
    setWordCount(value.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleResumeUpload = async (text: string) => {
    setIsProcessingResume(true);
    setUploadedResumeText(text);
    setExperience(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
    setIsProcessingResume(false);
  };

  const handleRemoveResume = () => {
    setUploadedResumeText(null);
    setExperience("");
    setWordCount(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalExperience = uploadedResumeText || experience;
    if (finalExperience.trim().length < 50) return;
    
    setIsSubmitting(true);
    
    try {
      // Store experience in localStorage and redirect to results
      localStorage.setItem('userExperience', finalExperience);
      localStorage.setItem('inputMethod', inputMethod);
      window.location.href = '/results';
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const getCurrentExperience = () => uploadedResumeText || experience;

  const exampleText = `Worked on backend development using Java and Spring Boot, deployed microservices on AWS, set up CI/CD pipelines with Jenkins, and collaborated with cross-functional teams. Led a team of 3 developers in building a RESTful API that handles 10,000+ requests per day. Implemented database optimization techniques using MySQL and Redis caching.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--pink-lavender-900)] via-[var(--lilac-900)] to-[var(--african-violet-900)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--russian-violet)] hover:text-[var(--african-violet)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <FileText className="w-4 h-4 text-[var(--african-violet)]" />
              <span className="text-sm font-medium text-[var(--russian-violet)]">Step 1 of 2</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--russian-violet)] mb-4">
              Share Your IT Experience
            </h1>
            <p className="text-xl text-[var(--ultra-violet)] max-w-3xl mx-auto leading-relaxed">
              Choose how you'd like to share your experience - upload your resume or describe it in your own words.
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 shadow-2xl"
          >
            {/* Input Method Selection */}
            <div className="mb-8">
              <div className="flex bg-[var(--ultra-violet-100)] rounded-xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setInputMethod('text')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    inputMethod === 'text'
                      ? 'bg-white text-[var(--russian-violet)] shadow-sm'
                      : 'text-[var(--ultra-violet)] hover:text-[var(--russian-violet)]'
                  }`}
                >
                  <Type className="w-5 h-5" />
                  Describe Experience
                </button>
                <button
                  type="button"
                  onClick={() => setInputMethod('resume')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    inputMethod === 'resume'
                      ? 'bg-white text-[var(--russian-violet)] shadow-sm'
                      : 'text-[var(--ultra-violet)] hover:text-[var(--russian-violet)]'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {inputMethod === 'text' ? (
                <div>
                  <label htmlFor="experience" className="block text-lg font-semibold text-[var(--russian-violet)] mb-4">
                    Describe your IT work experience (past 2 years)
                  </label>
                  
                  <div className="relative">
                    <textarea
                      id="experience"
                      value={experience}
                      onChange={handleExperienceChange}
                      placeholder="Example: Worked on backend development using Java and Spring Boot, deployed microservices on AWS, set up CI/CD pipelines with Jenkins, and collaborated with cross-functional teams..."
                      className="w-full h-64 p-6 rounded-xl border-2 border-[var(--lilac-300)] bg-white/80 backdrop-blur-sm text-[var(--russian-violet)] placeholder-[var(--ultra-violet)] focus:border-[var(--african-violet)] focus:outline-none focus:ring-2 focus:ring-[var(--african-violet)]/20 resize-none transition-all duration-300"
                      required={inputMethod === 'text'}
                      minLength={50}
                    />
                    
                    <div className="absolute bottom-4 right-4 text-sm text-[var(--ultra-violet)]">
                      {wordCount} words
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-[var(--ultra-violet)]">
                    <p className="mb-2">💡 <strong>Include details about:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Technologies, frameworks, and tools you used</li>
                      <li>Projects you worked on and your role</li>
                      <li>Team collaboration and leadership experience</li>
                      <li>Challenges you solved and achievements</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-lg font-semibold text-[var(--russian-violet)] mb-4">
                    Upload Your Resume (PDF)
                  </label>
                  
                  <ResumeUpload
                    onFileUpload={handleResumeUpload}
                    onRemove={handleRemoveResume}
                    uploadedText={uploadedResumeText}
                    isLoading={isProcessingResume}
                  />
                  
                  <div className="mt-4 text-sm text-[var(--ultra-violet)]">
                    <p className="mb-2">💡 <strong>What we'll extract:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Work experience and job titles</li>
                      <li>Technical skills and technologies</li>
                      <li>Projects and achievements</li>
                      <li>Education and certifications</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Example Section - only show for text input */}
              {inputMethod === 'text' && (
                <div className="bg-[var(--pink-lavender-100)] rounded-xl p-6 border border-[var(--pink-lavender-300)]">
                  <h3 className="font-semibold text-[var(--russian-violet)] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--african-violet)]" />
                    Example of good input:
                  </h3>
                  <p className="text-[var(--ultra-violet)] text-sm leading-relaxed italic">
                    {exampleText}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <motion.button
                  type="submit"
                  disabled={getCurrentExperience().trim().length < 50 || isSubmitting}
                  whileHover={getCurrentExperience().trim().length >= 50 && !isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={getCurrentExperience().trim().length >= 50 && !isSubmitting ? { scale: 0.95 } : {}}
                  className={`group px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
                    getCurrentExperience().trim().length >= 50 && !isSubmitting
                      ? "bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] text-white hover:shadow-xl cursor-pointer"
                      : "bg-[var(--ultra-violet-300)] text-[var(--ultra-violet-600)] cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Recommendations
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Validation Message */}
              {getCurrentExperience().trim().length > 0 && getCurrentExperience().trim().length < 50 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[var(--ultra-violet)] text-sm"
                >
                  {inputMethod === 'text' 
                    ? "Please provide at least 50 characters for better analysis"
                    : "Please upload a resume or switch to text input"
                  }
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid md:grid-cols-3 gap-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--russian-violet)] mb-3">
                🎯 What we analyze:
              </h3>
              <ul className="text-[var(--ultra-violet)] text-sm space-y-2">
                <li>• Technical skills and technologies</li>
                <li>• Programming languages and frameworks</li>
                <li>• Cloud platforms and tools</li>
                <li>• Team collaboration and leadership</li>
                <li>• Project management experience</li>
              </ul>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--russian-violet)] mb-3">
                📄 Resume Upload:
              </h3>
              <ul className="text-[var(--ultra-violet)] text-sm space-y-2">
                <li>• PDF format only (max 5MB)</li>
                <li>• Automatic text extraction</li>
                <li>• Work experience analysis</li>
                <li>• Skills and education parsing</li>
                <li>• Same analysis as text input</li>
              </ul>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-[var(--russian-violet)] mb-3">
                📈 What you'll get:
              </h3>
              <ul className="text-[var(--ultra-violet)] text-sm space-y-2">
                <li>• 3 direct-fit job recommendations</li>
                <li>• 2 trending career opportunities</li>
                <li>• Skill gap analysis and roadmap</li>
                <li>• Market demand insights</li>
                <li>• Personalized career guidance</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
