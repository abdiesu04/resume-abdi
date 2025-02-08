import { motion } from 'framer-motion';
import { secureReveal } from '@/utils/animations';
import { useEffect, useState } from 'react';
import { Experience as ExperienceType } from '@/lib/models';

// Fallback experience data
const fallbackExperience: ExperienceType[] = [
  {
    _id: '1',
    position: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    startDate: new Date('2021-01-01'),
    endDate: undefined,
    description: 'Led development of microservices architecture\nImplemented CI/CD pipelines\nMentored junior developers',
    technologies: ['React', 'Node.js', 'AWS', 'Docker'],
    visible: true,
    createdAt: new Date(),
    achievements: [
      'Led development of microservices architecture',
      'Implemented CI/CD pipelines',
      'Mentored junior developers'
    ]
  },
  {
    _id: '2',
    position: 'Full Stack Developer',
    company: 'StartUp Inc',
    location: 'Remote',
    startDate: new Date('2019-06-01'),
    endDate: new Date('2020-12-31'),
    description: 'Built responsive web applications\nOptimized database performance\nImplemented real-time features',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Redis'],
    visible: true,
    createdAt: new Date(),
    achievements: [
      'Built responsive web applications',
      'Optimized database performance',
      'Implemented real-time features'
    ]
  }
];

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch('/api/experience');
        const data = await res.json();
        
        if (data.success && Array.isArray(data.data)) {
          // Transform and validate the data
          const validExperiences = data.data
            .filter((exp: any) => (
              exp.company &&
              (exp.title || exp.position) &&
              exp.location &&
              exp.startDate &&
              exp.description &&
              Array.isArray(exp.technologies)
            ))
            .map((exp: any) => ({
              ...exp,
              position: exp.title || exp.position, // Use title if position is not available
              visible: exp.visible ?? true, // Set visible to true if missing
              achievements: exp.achievements || exp.description.split('\n'), // Use description as achievements if missing
            }));

          setExperiences(validExperiences);
        } else {
          console.warn('Using fallback experience data');
          setExperiences(fallbackExperience);
        }
      } catch (error) {
        console.error('Failed to fetch experience:', error);
        setError('Failed to load experience data');
        setExperiences(fallbackExperience);
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
          className="space-y-12"
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
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-secondary-light group-hover:text-accent-gold
                          transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-secondary-dark mt-1">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-accent-gold px-3 py-1 rounded-full
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
                        <div className="text-sm text-secondary-dark mt-1">
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.description.split('\n').map((achievement, i) => (
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

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono rounded-full
                            bg-primary-light/10 text-secondary-light border border-accent-gold/20
                            shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] group-hover:border-accent-gold/40
                            transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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