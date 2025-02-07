'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Education as EducationType } from '@/lib/models';

const secureReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Education() {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch('/api/education');
        const data = await res.json();
        console.log(data);
        if (data.success && Array.isArray(data.data)) {
          // Validate education data and convert date strings to Date objects
          const validEducation = data.data
            .filter((edu: EducationType) => (
              typeof edu.institution === 'string' &&
              typeof edu.degree === 'string' &&
              typeof edu.field === 'string' &&
              typeof edu.startDate === 'string' &&
              typeof edu.location === 'string' &&
              typeof edu.description === 'string'
            ))
            .map((edu: EducationType) => ({
              ...edu,
              startDate: new Date(edu.startDate),
              endDate: edu.endDate ? new Date(edu.endDate) : undefined,
              achievements: edu.description.split('•').filter(Boolean).map(s => s.trim()) // Convert bullet points in description to achievements
            }));

          setEducation(validEducation);
          console.log('Processed education data:', validEducation);
        }
      } catch (error) {
        console.error('Failed to fetch education:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return (
    <section className="py-20">
      <motion.div
        variants={secureReveal}
        initial="hidden"
        animate="visible"
        className="space-y-4 relative z-10"
      >
        <div className="flex items-center space-x-4">
          <div className="h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
          <h2 className="text-2xl font-mono font-bold text-secondary-light">
            EDUCATIONAL BACKGROUND
          </h2>
        </div>
        
        <div className="h-px bg-gradient-to-r from-accent-gold/50 via-accent-gold to-accent-gold/50" />
      </motion.div>

      <div className="mt-12 relative z-10">
        {/* Timeline Line with Glow Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-accent-gold/20">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-accent-gold via-accent-gold/20 to-accent-gold opacity-50" />
        </div>

        <motion.div
          variants={secureReveal}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold" />
            </div>
          ) : (
            education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 group"
                onClick={() => edu._id && setExpandedId(expandedId === edu._id ? null : edu._id)}
              >
                {/* Timeline Dot with Glow */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3">
                  <div className="w-full h-full rounded-full bg-[#0D1627] border-2 border-accent-gold 
                    group-hover:border-accent-gold/80 transition-colors
                    shadow-[0_0_8px_rgba(255,215,0,0.2)]" />
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20
                    bg-gradient-to-r from-accent-gold to-accent-gold/50" />
                </div>

                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`relative overflow-hidden
                    bg-gradient-to-br from-[#0D1627] to-[#1A2942]
                    rounded-lg border border-gray-800 
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]
                    backdrop-blur-sm hover:border-accent-gold/40 transition-all duration-300
                    cursor-pointer
                    ${expandedId === edu._id ? 'p-6' : 'p-4'}`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-secondary-light group-hover:text-accent-gold
                          transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <p className="text-secondary-dark text-sm mt-1">{edu.institution}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-accent-gold px-2 py-1 rounded-full
                          bg-accent-gold/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                          {new Date(edu.startDate).toLocaleDateString('en-US', { 
                            month: 'short',
                            year: 'numeric'
                          })}
                          {edu.endDate ? ` - ${new Date(edu.endDate).toLocaleDateString('en-US', { 
                            month: 'short',
                            year: 'numeric'
                          })}` : ' - Present'}
                        </div>
                        <div className="text-xs text-secondary-dark mt-1">
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{ height: expandedId === edu._id ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        {edu.description && (
                          <p className="text-sm text-secondary-dark mb-4">
                            {edu.description}
                          </p>
                        )}

                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="space-y-2">
                            {edu.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start space-x-3 group/item"
                              >
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-gold
                                  group-hover/item:shadow-[0_0_8px_rgba(255,215,0,0.5)]
                                  transition-shadow duration-300" />
                                <span className="text-secondary-dark group-hover/item:text-secondary-light
                                  transition-colors duration-300 text-sm">
                                  {achievement}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
} 