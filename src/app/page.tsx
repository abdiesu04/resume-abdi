'use client';

import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Chat from '@/components/Chat';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Layout>
      <div className="space-y-12 pb-12">
        <section id="about">
          <Hero />
        </section>

        <section id="skills" className="min-h-[80vh] px-4">
          <div className="max-w-7xl mx-auto">
            <Skills />
          </div>
        </section>

        <section id="experience" className="min-h-[80vh] px-4">
          <div className="max-w-7xl mx-auto">
            <Experience />
          </div>
        </section>

        <section id="projects" className="min-h-[80vh] px-4">
          <div className="max-w-7xl mx-auto">
            <Projects />
          </div>
        </section>

        <section id="education" className="min-h-[80vh] px-4">
          <div className="max-w-7xl mx-auto">
            <Education />
          </div>
        </section>

        <section id="certificates" className="min-h-[80vh] px-4">
          <div className="max-w-7xl mx-auto">
            <Certificates />
          </div>
        </section>

        {/* Chat Section */}
        <section id="chat" className="min-h-[80vh] px-4">
          <div className="max-w-7xl mx-auto relative">
            <div className="flex justify-end space-x-4">
              {!isChatOpen && (
                <motion.div 
                  className="fixed bottom-8 right-8 z-50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full 
                        bg-emerald-400/10 border border-emerald-400/20 
                        hover:bg-emerald-400/20 hover:border-emerald-400/30
                        transition-all duration-300
                        shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400/50 animate-ping" />
                      </div>
                      <span className="text-xs font-mono text-emerald-400">Ask me about Abdi</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
              {isChatOpen && (
                <div className="w-full max-w-4xl mx-auto h-[80vh] bg-[#0A1120] rounded-lg border border-gray-800 shadow-xl">
                  <div className="relative h-full">
                    <div className="flex items-center justify-between px-4 pt-4">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span className="text-xs font-mono text-emerald-400 mx-2">Ask me about Abdi</span>
                      <button 
                        onClick={() => setIsChatOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="h-full overflow-hidden">
                      <Chat />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 