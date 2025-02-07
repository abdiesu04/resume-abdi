import { motion } from 'framer-motion';
import { secureReveal } from '@/utils/animations';
import { useEffect, useState } from 'react';
import { Skill } from '@/lib/models';

// Fallback skills data
const fallbackSkills: Skill[] = [
  {
    _id: '1',
    name: 'React',
    category: 'Frontend',
    proficiency: 90,
    yearsOfExperience: 3,
    visible: true,
    createdAt: new Date()
  },
  {
    _id: '2', 
    name: 'Node.js',
    category: 'Backend',
    proficiency: 85,
    yearsOfExperience: 3,
    visible: true,
    createdAt: new Date()
  },
  {
    _id: '3',
    name: 'TypeScript',
    category: 'Languages', 
    proficiency: 88,
    yearsOfExperience: 2,
    visible: true,
    createdAt: new Date()
  },
  {
    _id: '4',
    name: 'MongoDB',
    category: 'Backend',
    proficiency: 82,
    yearsOfExperience: 2,
    visible: true,
    createdAt: new Date()
  },
  {
    _id: '5',
    name: 'Next.js',
    category: 'Frontend',
    proficiency: 85,
    yearsOfExperience: 2,
    visible: true,
    createdAt: new Date()
  },
  {
    _id: '6',
    name: 'Python',
    category: 'Languages',
    proficiency: 80,
    yearsOfExperience: 3,
    visible: true,
    createdAt: new Date()
  }
];

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch('/api/skills', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch skills: ${res.status}`);
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          // Validate and filter visible skills
          const validSkills = data.data
            .filter((skill: Skill) => (
              skill.visible && 
              typeof skill.name === 'string' &&
              typeof skill.category === 'string' &&
              typeof skill.proficiency === 'number' &&
              typeof skill.yearsOfExperience === 'number'
            ));

          setSkills(validSkills);
        } else {
          console.warn('Using fallback skills data');
          setSkills(fallbackSkills);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills data');
        setSkills(fallbackSkills);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
            TECHNICAL EXPERTISE
          </h2>
        </div>
        
        <div className="h-px bg-gradient-to-r from-accent-gold/50 via-accent-gold to-accent-gold/50" />
      </motion.div>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}

      <motion.div
        variants={secureReveal}
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {isLoading ? (
          // Loading skeletons with neumorphic effect
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#0D1627] rounded-xl border border-gray-800 p-8 space-y-6
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/20 animate-pulse" />
                <div className="h-6 w-32 bg-secondary-light/20 rounded-lg animate-pulse" />
              </div>

              <div className="space-y-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-secondary-light/20 rounded-lg animate-pulse" />
                      <div className="h-4 w-12 bg-accent-gold/20 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-2 bg-primary-light/10 rounded-full">
                      <div className="h-full bg-accent-gold/20 rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative overflow-hidden
                bg-gradient-to-br from-[#0D1627] to-[#1A2942]
                rounded-xl border border-gray-800 p-8 space-y-6
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-300
                group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.1),transparent_70%)]" />
              </div>

              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-lg font-mono font-bold text-secondary-light group-hover:text-emerald-400 transition-colors duration-300">
                    {category}
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill._id}
                      className="space-y-2"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-mono text-secondary-light group-hover:text-emerald-400/90 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono text-emerald-400 px-2 py-1 rounded-full bg-emerald-400/10
                            shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                            {skill.yearsOfExperience}+ YRS
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-[#1E2D4A] rounded-full overflow-hidden
                        shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-400/80 to-emerald-400
                            shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Certifications with neumorphic effect */}
      <motion.div
        variants={secureReveal}
        initial="hidden"
        animate="visible"
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {['SYSTEM ARCHITECTURE', 'SECURE CODING', 'OPTIMIZATION', 'DEPLOYMENT'].map((cert) => (
          <motion.div
            key={cert}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative overflow-hidden
              bg-gradient-to-br from-[#0D1627] to-[#1A2942]
              rounded-xl border border-gray-800 p-4
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
              backdrop-blur-sm hover:border-accent-gold/40 transition-all duration-300
              group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
            </div>

            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
                <span className="text-xs font-mono text-accent-gold px-2 py-1 rounded-full bg-accent-gold/10
                  shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                  CERTIFIED
                </span>
              </div>
              <div className="mt-2 text-sm font-mono text-secondary-light group-hover:text-accent-gold
                transition-colors duration-300">
                {cert}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}