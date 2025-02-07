'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  isSpecial?: boolean;
}

const navItems: NavItem[] = [
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
      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Gradient background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1627]/80 via-[#1A2942]/75 to-[#0D1627]/80 backdrop-blur-md" />
        
        {/* Subtle animated border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/5 to-transparent" />

        <nav className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-emerald-400/90 group-hover:bg-emerald-400 transition-colors duration-300" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400/50 animate-ping" />
            </div>
            <span className="text-sm font-mono font-medium bg-gradient-to-r from-emerald-400/90 to-emerald-400/70 text-transparent bg-clip-text group-hover:to-emerald-400 transition-all duration-300">
              abdi.dev
            </span>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === item.href.slice(1)
                    ? 'text-emerald-400'
                    : 'text-gray-400 hover:text-white'
                } ${
                  item.isSpecial 
                    ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 flex items-center space-x-2' 
                    : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{item.name}</span>
                {item.isSpecial && (
                  <>
                    <span className="text-xs text-emerald-400/70">|</span>
                    <span className="text-xs text-emerald-400/70">Ask me about Abdi</span>
                    <div className="absolute -right-1 -top-1">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400/50 animate-ping" />
                      </div>
                    </div>
                  </>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-400/[0.08] via-emerald-400/[0.08] to-transparent -z-10" />
                
                {/* Active indicator */}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/40 via-emerald-400 to-emerald-400/40"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className={`w-6 h-6 text-emerald-400/90 transition-transform duration-300 ${
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

        {/* Enhanced Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden relative"
            >
              {/* Background with gradient and blur */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0D1627]/95 to-[#1A2942]/95 backdrop-blur-lg" />
              
              {/* Border effect */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0" />

              <div className="relative max-w-7xl mx-auto py-4 px-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href.slice(1))}
                    className={`w-full px-4 py-3 rounded-md text-left text-sm font-medium transition-all duration-300 group
                      ${
                        activeSection === item.href.slice(1)
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                          : 'text-gray-400 hover:text-white hover:bg-emerald-400/5 border border-transparent hover:border-emerald-400/10'
                      } ${item.isSpecial ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' : ''}`}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {activeSection === item.href.slice(1) && (
                        <div className="relative">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <div className="absolute inset-0 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping opacity-50" />
                        </div>
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

      {/* Footer */}
      <Footer />
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