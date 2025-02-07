'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Social links data
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/abdiesu04',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/abdiesu04',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/abdiesu04',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    )
  },
  {
    name: 'Email',
    url: 'mailto:[email protected]',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const engineeringQuotes = [
    "Clean code always looks like it was written by someone who cares.",
    "Simplicity is the ultimate sophistication in software design.",
    "Programming isn't about what you know; it's about what you can figure out."
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % engineeringQuotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-0 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0A1120]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]"
        />
      </div>

      {/* Left Side - Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:w-1/2 space-y-6 text-center lg:text-left z-10"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-sm border border-emerald-400/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono">Available for opportunities</span>
        </motion.div>

        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            <span className="block text-white relative">
              ABDI ESAYAS
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 blur-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
            <motion.span 
              className="block mt-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% auto' }}
            >
              Software Engineer
            </motion.span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0"
        >
          Crafting elegant solutions through code. 
          Passionate about building scalable systems and creating exceptional software experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center lg:justify-start"
        >
          <TechStack />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-6"
        >
          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E2D4A] text-gray-300 hover:text-emerald-400 hover:bg-[#1E2D4A]/80 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-sm font-mono">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-400"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-mono">+251 938 813 894</span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <Button variant="default" size="lg" className="group">
              <span>View Projects</span>
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
            <Button variant="outline" size="lg" className="group">
              <span>Download CV</span>
              <motion.span
                className="ml-2 inline-block opacity-0 group-hover:opacity-100"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Code Preview */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block lg:w-1/2 mt-12 lg:mt-0 z-10 w-full px-4 lg:px-0"
        >
          <CodePreview />
        </motion.div>
      )}
    </div>
  );
}

const TechStack = () => {
  const technologies = [
    'Go', 'Python', 'TypeScript', 'Node.js',
    'PostgreSQL', 'MongoDB', 'Redis', 'Docker'
  ];

  return (
    <>
      {technologies.map((tech, index) => (
        <motion.div
          key={tech}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, color: '#10B981' }}
          className="px-3 py-1 bg-[#1E2D4A] text-gray-300 rounded-full text-sm font-mono border border-[#1E2D4A] hover:border-emerald-400/50 transition-colors"
        >
          {tech}
        </motion.div>
      ))}
    </>
  );
};

function CodePreview() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const codeLines = [
    { type: 'keyword', content: 'class' },
    { type: 'class', content: 'SoftwareEngineer' },
    { type: 'keyword', content: 'implements' },
    { type: 'interface', content: 'Developer' },
    { type: 'punctuation', content: '{' },
    { type: 'property', content: '  skills: string[]' },
    { type: 'property', content: '  passion: number // Level 100' },
    { type: 'method', content: '  solveProblems() {' },
    { type: 'comment', content: '    // Transform complex challenges into' },
    { type: 'comment', content: '    // elegant solutions' },
    { type: 'code', content: '    return innovation.create({' },
    { type: 'code', content: '      quality: "exceptional",' },
    { type: 'code', content: '      scalable: true,' },
    { type: 'code', content: '      maintainable: true' },
    { type: 'code', content: '    });' },
    { type: 'method', content: '  }' },
    { type: 'punctuation', content: '}' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeLines.length - 1) {
          return prev + 1;
        } else {
          setIsTypingComplete(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-lg filter blur-3xl" />
      <div className="relative bg-[#0D1627] rounded-lg border border-[#1E2D4A] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-[#1E2D4A]/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-mono text-gray-400">engineer.ts</span>
        </div>
        <div className="p-4">
          <pre className="text-sm font-mono">
            <code className="text-gray-300">
              {codeLines.slice(0, currentLine + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`whitespace-pre ${
                    line.type === 'keyword' ? 'text-purple-400' :
                    line.type === 'class' ? 'text-yellow-400' :
                    line.type === 'interface' ? 'text-blue-400' :
                    line.type === 'property' ? 'text-emerald-400' :
                    line.type === 'method' ? 'text-blue-400' :
                    line.type === 'comment' ? 'text-gray-500' :
                    line.type === 'code' ? 'text-gray-300' :
                    'text-gray-300'
                  }`}
                >
                  {line.content}
                </motion.div>
              ))}
              {!isTypingComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-emerald-400/50 ml-1"
                />
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
} 