'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectForm from '@/components/admin/ProjectForm';
import SkillForm from '@/components/admin/SkillForm';
import EducationForm from '@/components/admin/EducationForm';
import ExperienceForm from '@/components/admin/ExperienceForm';
import CertificateForm from '@/components/admin/CertificateForm';

type ContentType = 'projects' | 'certificates' | 'skills' | 'education' | 'experience';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ContentType>('projects');
  const [isLoading, setIsLoading] = useState(false);

  const sections: { id: ContentType; name: string; icon: string }[] = [
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'certificates', name: 'Certificates', icon: '🏆' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'experience', name: 'Experience', icon: '💼' },
  ];

  return (
    <div className="min-h-screen bg-[#0A1120]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Manage your portfolio content
          </motion.p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-lg border ${
                activeSection === section.id
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-gray-700 hover:border-gray-600'
              } transition-all relative group overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="text-2xl mb-2 relative z-10">{section.icon}</span>
              <h3 className={`font-medium relative z-10 ${
                activeSection === section.id ? 'text-emerald-400' : 'text-gray-300'
              }`}>
                {section.name}
              </h3>

              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 border-2 border-emerald-400 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-[#0D1627] rounded-lg border border-gray-700 p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === 'projects' && <ProjectForm />}
                {activeSection === 'skills' && <SkillForm />}
                {activeSection === 'certificates' && <CertificateForm />}
                {activeSection === 'education' && <EducationForm />}
                {activeSection === 'experience' && <ExperienceForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}