import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { encryptionGrid, secureReveal } from '@/utils/animations';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/models';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        console.log('Projects API response:', data);
        if (data.success) {
          // Only show visible projects
          setProjects(data.data.filter((project: Project) => project.visible));
        } else {
          console.error('Failed to fetch projects:', data.error);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (projectId: string) => {
    if (!projectId) return;
    setExpandedId(expandedId === projectId ? null : projectId);
  };

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
            FEATURED PROJECTS
          </h2>
        </div>
        
        <div className="h-px bg-gradient-to-r from-accent-gold/50 via-accent-gold to-accent-gold/50" />
      </motion.div>

      <motion.div
        variants={encryptionGrid}
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
      >
        {isLoading ? (
          // Loading skeletons with neumorphic effect
          [...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="bg-[#0D1627] rounded-xl border border-gray-800 p-4 sm:p-6 space-y-4
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                backdrop-blur-sm"
            >
              <div className="h-4 w-24 bg-accent-gold/20 rounded-full animate-pulse" />
              <div className="h-8 w-3/4 bg-secondary-light/20 rounded-lg animate-pulse" />
              <div className="h-20 bg-secondary-dark/20 rounded-lg animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-6 w-16 bg-accent-gold/20 rounded-full animate-pulse" />
                ))}
              </div>
            </div>
          ))
        ) : (
          projects.map((project) => (
            <motion.div
              key={project._id}
              layoutId={`project-${project._id}`}
              onClick={() => project._id && handleCardClick(project._id)}
              className={`cursor-pointer relative overflow-hidden
                bg-gradient-to-br from-[#0D1627] to-[#1A2942]
                rounded-xl border border-gray-800
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]
                backdrop-blur-sm hover:border-accent-gold/40 transition-all duration-300
                ${expandedId === project._id ? 'col-span-full md:col-span-2 lg:col-span-3' : ''}
                group`}
            >
              <motion.div
                className="p-4 sm:p-6"
                layout
              >
                {/* Header */}
                <motion.div className="flex items-center justify-between mb-4" layout>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-xs font-mono text-accent-gold bg-accent-gold/10 rounded-full">
                      PROJECT
                    </span>
                    {project.featured && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-400/10 rounded-full">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-emerald-400">FEATURED</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Title and Description */}
                <motion.div layout>
                  <h3 className="text-xl font-bold text-secondary-light group-hover:text-accent-gold
                    transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>
                  <AnimatePresence>
                    {expandedId === project._id ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-secondary-dark leading-relaxed"
                      >
                        {project.description}
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-secondary-dark line-clamp-2"
                      >
                        {project.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Technologies */}
                <motion.div layout className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
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
                </motion.div>

                {/* Links */}
                <AnimatePresence>
                  {expandedId === project._id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6 flex flex-wrap gap-4"
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-accent-gold hover:text-accent-gold/80
                            transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View Live Demo</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-accent-gold hover:text-accent-gold/80
                            transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View Code</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
} 