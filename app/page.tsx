"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--pink-lavender-900)] via-[var(--lilac-900)] to-[var(--african-violet-900)] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-[var(--african-violet)]" />
                <span className="text-sm font-medium text-[var(--russian-violet)]">AI-Powered Career Guidance</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--russian-violet)] mb-6 leading-tight">
                Find Your Next
                <span className="block bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] bg-clip-text text-transparent">
                  IT Career Path
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-[var(--ultra-violet)] mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover your perfect IT career by analyzing your past 2 years of experience. 
                Upload your resume or describe your work to get personalized recommendations and trending opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/input">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-8 py-4 rounded-full font-semibold text-lg text-[var(--russian-violet)] hover:bg-white/30 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--pink-lavender)] rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[var(--lilac)] rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[var(--african-violet)] rounded-full opacity-50 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--russian-violet)] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[var(--ultra-violet)] max-w-2xl mx-auto">
              Three simple steps to discover your ideal IT career path
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--pink-lavender)] to-[var(--lilac)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--russian-violet)] mb-3">
                Share Your Experience
              </h3>
              <p className="text-[var(--ultra-violet)] leading-relaxed">
                Upload your resume or describe your past 2 years of IT work in detail. Include projects, technologies, and responsibilities.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--african-violet)] to-[var(--ultra-violet)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--russian-violet)] mb-3">
                AI Analysis
              </h3>
              <p className="text-[var(--ultra-violet)] leading-relaxed">
                Our AI extracts your skills, identifies focus areas, and maps them to current IT job roles.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--lilac)] to-[var(--pink-lavender)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--russian-violet)] mb-3">
                Get Recommendations
              </h3>
              <p className="text-[var(--ultra-violet)] leading-relaxed">
                Receive 3 direct-fit jobs and 2 trending opportunities with skill gap analysis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--russian-violet)] mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-[var(--ultra-violet)] mb-8 leading-relaxed">
                Get personalized career guidance that adapts to the ever-changing IT landscape.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--african-violet)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--russian-violet)] mb-2">
                      Market-Driven Insights
                    </h3>
                    <p className="text-[var(--ultra-violet)]">
                      Based on current market trends and employer demands in the IT industry.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--lilac)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--russian-violet)] mb-2">
                      Personalized Recommendations
                    </h3>
                    <p className="text-[var(--ultra-violet)]">
                      Tailored suggestions based on your unique experience and skill set.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--pink-lavender)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--russian-violet)] mb-2">
                      Skill Gap Analysis
                    </h3>
                    <p className="text-[var(--ultra-violet)]">
                      Clear roadmap of skills you need to acquire for trending positions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)] rounded-full w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-[var(--lilac)] to-[var(--pink-lavender)] rounded-full w-1/2"></div>
                  <div className="h-4 bg-gradient-to-r from-[var(--pink-lavender)] to-[var(--african-violet)] rounded-full w-2/3"></div>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[var(--african-violet)]">85%</div>
                    <div className="text-sm text-[var(--ultra-violet)]">Match Accuracy</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[var(--lilac)]">50+</div>
                    <div className="text-sm text-[var(--ultra-violet)]">IT Roles</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--african-violet)] to-[var(--lilac)]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Discover Your Next Career Move?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of IT professionals who have found their ideal career path with our platform.
            </p>
            <Link href="/input">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[var(--russian-violet)] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
