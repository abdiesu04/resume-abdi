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

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch('/api/education');
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setEducation(data.data.filter((edu: EducationType) => edu.visible));
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
                <div className="bg-gradient-to-br from-[#0D1627] to-[#1A2942] rounded-lg p-6
                  border border-gray-800 group-hover:border-accent-gold/40
                  shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]
                  transition-all duration-300">
                  
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

                  {/* Description */}
                  {edu.description && (
                    <p className="mt-4 text-secondary-dark group-hover:text-secondary-light
                      transition-colors duration-300">
                      {edu.description}
                    </p>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-accent-gold mb-2">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
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
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
} 