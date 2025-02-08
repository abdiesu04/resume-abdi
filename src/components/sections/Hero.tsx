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

// Code particles animation
function CodeParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    symbol: string;
  }>>([]);

  const codeSymbols = ['{ }', '( )', '< >', '=>', '[];', '&&', '||', '++', '//'];

  useEffect(() => {
    const generateParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 14 + 8,
      speed: Math.random() * 1.5 + 0.5,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
    });

    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.y < 110);
        return [...filtered, generateParticle()].map(p => ({
          ...p,
          y: p.y + p.speed
        }));
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute font-mono text-emerald-500/20"
          style={{
            fontSize: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
}

// Neural network visualization
function NeuralNetwork() {
  return (
    <div className="absolute inset-0">
      <div className="grid grid-cols-5 gap-8 p-8 opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Matrix rain effect
function MatrixRain() {
  return (
    <div className="absolute inset-0">
      <div className="grid grid-cols-12 gap-1 opacity-10">
        {[...Array(48)].map((_, i) => (
          <motion.div
            key={i}
            className="h-screen overflow-hidden font-mono text-xs text-emerald-500"
            initial={{ y: -1000 }}
            animate={{ y: 1000 }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(30)].map((_, j) => (
              <div key={j}>
                {Math.random().toString(36).substring(2, 3)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  const engineeringMetrics = [
    "Full Stack Developer",
    "Problem Solving Expert",
    "Innovation Engineer",
    "Tech Enthusiast"
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % engineeringMetrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[90vh] md:min-h-[80vh] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative overflow-hidden">
      {/* Enhanced Background - Hidden on mobile */}
      <div className="absolute inset-0 bg-[#0A1120] hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        {mounted && (
          <>
            <CodeParticles />
            <NeuralNetwork />
            <MatrixRain />
          </>
        )}
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 bg-[#0A1120] md:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
      </div>

      {/* Left Side - Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full lg:w-1/2 space-y-6 text-center lg:text-left z-10 px-4 sm:px-6 lg:px-8"
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
          <span className="font-mono">READY TO CODE</span>
        </motion.div>

        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold"
          >
            <span className="block text-white">
              ABDI ESAYAS
            </span>
            <motion.span 
              className="block mt-2 bg-gradient-to-r from-emerald-400 via-purple-500 to-blue-500 bg-clip-text text-transparent"
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
          className="text-base sm:text-lg text-gray-400 max-w-md mx-auto lg:mx-0"
        >
          Transforming ideas into reality through innovative code and cutting-edge solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-sm text-emerald-400"
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentMetric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {engineeringMetrics[currentMetric]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E2D4A] text-gray-300 hover:text-emerald-400 hover:bg-[#1E2D4A]/80 transition-all border border-emerald-500/20"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span className="text-emerald-400">
                  {link.icon}
                </span>
                <span className="text-sm font-mono">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link href="#projects">
              <Button variant="default" size="lg" className="group relative overflow-hidden font-mono text-sm sm:text-base">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative">VIEW_PROJECTS</span>
              </Button>
            </Link>
            <a href="https://flowcv.com/resume/feswa5vi0s" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="group font-mono text-sm sm:text-base">
                <span>DOWNLOAD_CV</span>
              </Button>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Code Preview - Hidden on mobile */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block w-full lg:w-1/2 mt-12 lg:mt-0 z-10 px-4 sm:px-6 lg:px-8"
        >
          <CodePreview />
        </motion.div>
      )}
    </div>
  );
}

function CodePreview() {
  const [currentLine, setCurrentLine] = useState(0);

  const codeLines = [
    { type: 'comment', content: '// Engineering Innovation Hub' },
    { type: 'class', content: 'class SoftwareEngineer {' },
    { type: 'property', content: '  private readonly techStack: string[]' },
    { type: 'property', content: '  private readonly passion: Innovation' },
    { type: 'method', content: '  async createSolution() {' },
    { type: 'code', content: '    const project = await this.develop({' },
    { type: 'code', content: '      technologies: ["React", "Node", "AI"],' },
    { type: 'code', content: '      approach: {' },
    { type: 'code', content: '        innovative: true,' },
    { type: 'code', content: '        efficient: true,' },
    { type: 'code', content: '        futureProof: true' },
    { type: 'code', content: '      }' },
    { type: 'code', content: '    })' },
    { type: 'method', content: '  }' },
    { type: 'method', content: '  enhancePerformance() {' },
    { type: 'code', content: '    return this.innovate()' },
    { type: 'code', content: '      .then(this.optimize)' },
    { type: 'code', content: '      .then(this.validate)' },
    { type: 'code', content: '      .then(this.ship)' },
    { type: 'method', content: '  }' },
    { type: 'punctuation', content: '}' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => 
        prev < codeLines.length - 1 ? prev + 1 : prev
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-lg filter blur-3xl" />
      <div className="relative bg-[#0D1627] rounded-lg border border-emerald-500/20 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-[#1E2D4A]/50 border-b border-emerald-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <div className="w-3 h-3 rounded-full bg-blue-500/80" />
            <div className="w-3 h-3 rounded-full bg-purple-500/80" />
          </div>
          <span className="text-xs font-mono text-emerald-400">engineer.ts</span>
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
                    line.type === 'comment' ? 'text-gray-500' :
                    line.type === 'class' ? 'text-emerald-400' :
                    line.type === 'property' ? 'text-purple-400' :
                    line.type === 'method' ? 'text-blue-400' :
                    line.type === 'code' ? 'text-gray-300' :
                    'text-gray-300'
                  }`}
                >
                  {line.content}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-emerald-400/50 ml-1"
              />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}