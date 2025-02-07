import { motion } from 'framer-motion';
import { secureReveal } from '@/utils/animations';
import { useEffect, useState } from 'react';
import { Experience as ExperienceType } from '@/lib/models';


export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch('/api/experience');
        const data = await res.json();
        console.log('Raw experience data:', data);

        if (data.success && Array.isArray(data.data)) {
          try {
            // Validate experience data and convert date strings to Date objects
            const validExperiences = data.data
              .filter((exp: ExperienceType) => {
                // Log each experience object for debugging
                console.log('Processing experience:', exp);
                
                return (
                  typeof exp.company === 'string' &&
                  typeof exp.title === 'string' && // Changed from position to title to match API
                  typeof exp.location === 'string' &&
                  typeof exp.startDate === 'string' &&
                  typeof exp.description === 'string' &&
                  Array.isArray(exp.technologies)
                );
              })
              .map((exp: ExperienceType) => {
                // Convert dates and split description
                const processed = {
                  ...exp,
                  position: exp.title, // Map title to position
                  startDate: new Date(exp.startDate),
                  endDate: exp.endDate ? new Date(exp.endDate) : undefined,
                  achievements: exp.description.split('•').filter(Boolean).map(s => s.trim())
                };
                console.log('Processed experience:', processed);
                return processed;
              });

            console.log('Final valid experiences:', validExperiences);
            setExperiences(validExperiences);
          } catch (processError) {
            console.error('Error processing experience data:', processError);
            setExperiences([]);
          }
        } else {
          console.warn('Invalid API response format');
          setExperiences([]);
        }
      } catch (error) {
        console.error('Failed to fetch experience:', error);
        setExperiences([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
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
            PROFESSIONAL JOURNEY
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
          className="space-y-6"
        >
          {isLoading ? (
            // Loading skeletons with neumorphic effect
            [...Array(3)].map((_, i) => (
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
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="h-6 w-48 bg-secondary-light/20 rounded-lg animate-pulse" />
                      <div className="h-4 w-32 bg-secondary-dark/20 rounded-lg animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-accent-gold/20 rounded-lg animate-pulse" />
                      <div className="h-4 w-32 bg-secondary-dark/20 rounded-lg animate-pulse" />
                    </div>
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
            experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 group"
                onClick={() => exp._id && setExpandedId(expandedId === exp._id ? null : exp._id)}
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
                    ${expandedId === exp._id ? 'p-6' : 'p-4'}`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-secondary-light group-hover:text-accent-gold
                          transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-secondary-dark text-sm mt-1">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-accent-gold px-2 py-1 rounded-full
                          bg-accent-gold/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                          {new Date(exp.startDate).toLocaleDateString('en-US', { 
                            month: 'short',
                            year: 'numeric'
                          })}
                          {exp.endDate ? ` - ${new Date(exp.endDate).toLocaleDateString('en-US', { 
                            month: 'short',
                            year: 'numeric'
                          })}` : ' - Present'}
                        </div>
                        <div className="text-xs text-secondary-dark mt-1">
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{ height: expandedId === exp._id ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <ul className="space-y-2">
                          {exp.description.split('\n').map((achievement, i) => (
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

                        {/* Technologies */}
                        {expandedId === exp._id && exp.technologies?.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-wrap gap-2 mt-4"
                          >
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs font-mono rounded-full
                                  bg-primary-light/10 text-secondary-light border border-accent-gold/20
                                  shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]
                                  transition-colors duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>
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