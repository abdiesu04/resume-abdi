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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch('/api/education');
        const data = await res.json();
        
        if (data.success && Array.isArray(data.data)) {
          // Transform and validate the data
          const validEducation = data.data
            .filter((edu: any) => (
              edu.institution &&
              edu.degree &&
              edu.field &&
              edu.startDate &&
              edu.location &&
              edu.description
            ))
            .map((edu: any) => ({
              ...edu,
              visible: edu.visible ?? true, // Set visible to true if missing
              achievements: edu.achievements || edu.description.split('•').filter(Boolean).map((s: string) => s.trim()), // Split description by bullet points
            }));

          setEducation(validEducation);
        } else {
          console.warn('Failed to fetch education data');
          setError('Failed to load education data');
        }
      } catch (error) {
        console.error('Failed to fetch education:', error);
        setError('Failed to load education data');
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
        className="space-y-4"
      >
        <div className="flex items-center space-x-4">
          <div className="h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
          <h2 className="text-2xl font-mono font-bold text-secondary-light">
            EDUCATIONAL BACKGROUND
          </h2>
        </div>
        
        <div className="h-px bg-gradient-to-r from-accent-gold/50 via-accent-gold to-accent-gold/50" />
      </motion.div>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}

      <div className="mt-12 relative">
        {/* Timeline Line with Glow Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-accent-gold/20">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-accent-gold via-accent-gold/20 to-accent-gold opacity-50" />
        </div>

        <motion.div
          variants={secureReveal}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {isLoading ? (
            // Loading skeletons with neumorphic effect
            [...Array(2)].map((_, i) => (
              <div
                key={i}
                className="relative pl-8"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3">
                  <div className="w-full h-full rounded-full bg-[#0D1627] border-2 border-accent-gold/20 animate-pulse
                    shadow-[0_0_8px_rgba(255,215,0,0.2)]" />
                </div>

                <div className="bg-[#0D1627] rounded-xl border border-gray-800 p-8 space-y-4
                  shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                  backdrop-blur-sm">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-secondary-light/20 rounded-lg animate-pulse" />
                    <div className="h-4 w-32 bg-emerald-400/20 rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-secondary-dark/20 rounded-lg animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-4 w-full bg-secondary-dark/20 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 group"
              >
                {/* Timeline Dot with Glow */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3">
                  <div className="w-full h-full rounded-full bg-[#0D1627] border-2 border-accent-gold 
                    group-hover:border-accent-gold/80 transition-colors
                    shadow-[0_0_8px_rgba(255,215,0,0.2)]" />
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20
                    bg-gradient-to-r from-accent-gold to-accent-gold/50" />
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="relative overflow-hidden
                    bg-gradient-to-br from-[#0D1627] to-[#1A2942]
                    rounded-xl border border-gray-800 p-8
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                    backdrop-blur-sm hover:border-accent-gold/40 transition-all duration-300"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
                  </div>

                  <div className="relative space-y-6">
                    {/* Institution and Degree */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-secondary-light group-hover:text-accent-gold
                        transition-colors duration-300">
                        {edu.institution}
                      </h3>
                      <div className="text-emerald-400 font-medium">
                        {edu.degree} in {edu.field}
                      </div>
                      <div className="text-secondary-dark">
                        {new Date(edu.startDate).toLocaleDateString('en-US', { 
                          month: 'long',
                          year: 'numeric'
                        })}
                        {edu.endDate ? ` - ${new Date(edu.endDate).toLocaleDateString('en-US', { 
                          month: 'long',
                          year: 'numeric'
                        })}` : ' - Present'}
                      </div>
                      <div className="text-secondary-dark">{edu.location}</div>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-3">
                      {edu.achievements?.map((achievement, i) => (
                        <motion.li
                          key={i}
                          whileHover={{ x: 4 }}
                          className="flex items-start space-x-3 group/item"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-gold
                            group-hover/item:shadow-[0_0_8px_rgba(255,215,0,0.5)]
                            transition-shadow duration-300" />
                          <span className="text-secondary-dark group-hover/item:text-secondary-light
                            transition-colors duration-300">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
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