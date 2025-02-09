'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { id: 'about', name: 'About', href: '#about' },
  { id: 'skills', name: 'Skills', href: '#skills' },
  { id: 'experience', name: 'Experience', href: '#experience' },
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'education', name: 'Education', href: '#education' },
  { id: 'certificates', name: 'Certificates', href: '#certificates' }
];

export default function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
      setActiveSection(sectionId); // Update active section
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1120] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1627]/90 backdrop-blur-md border-b border-[#1E2D4A]">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-mono font-medium">abdi.dev</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                  activeSection === item.href.slice(1)
                    ? 'text-emerald-400'
                    : 'text-gray-400 hover:text-white'
                } ${item.isSpecial ? 'bg-emerald-400/10 text-emerald-400' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#1E2D4A] transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                isMobileMenuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-[#0D1627]/95 backdrop-blur-md border-b border-[#1E2D4A]"
            >
              <div className="max-w-7xl mx-auto py-4 px-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href.slice(1))}
                    className={`w-full px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                      activeSection === item.href.slice(1)
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'text-gray-400 hover:bg-[#1E2D4A] hover:text-white'
                    } ${item.isSpecial ? 'bg-emerald-400/10 text-emerald-400' : ''}`}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {activeSection === item.href.slice(1) && (
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Development Tools Overlay */}
      {mounted && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-[#1E2D4A]/80 backdrop-blur-md rounded-full border border-[#1E2D4A] shadow-lg"
        >
          <StatusIndicator />
          <span className="text-xs font-mono text-gray-400">|</span>
          <PerformanceMetric label="Memory" value="512MB" />
          <span className="text-xs font-mono text-gray-400">|</span>
          <PerformanceMetric label="CPU" value="2.4GHz" />
          <span className="text-xs font-mono text-gray-400">|</span>
          <PerformanceMetric label="Uptime" value="99.9%" />
        </motion.div>
      )}
    </div>
  );
}

const DevMetric = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2"
  >
    <span className="text-lg">{icon}</span>
    <div className="text-xs font-mono">
      <span className="text-gray-400">{label}:</span>{' '}
      <span className="text-emerald-400">{value}</span>
    </div>
  </motion.div>
);

const StatusIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-emerald-400" />
      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-50" />
    </div>
    <span className="text-xs font-mono text-emerald-400">ONLINE</span>
  </div>
);

const PerformanceMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center space-x-2">
    <span className="text-xs font-mono">
      <span className="text-gray-400">{label}:</span>{' '}
      <span className="text-blue-400">{value}</span>
    </span>
  </div>
); 