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
          // Validate skills without requiring the visible property
          const validSkills = data.data
            .filter((skill: Skill) => (
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
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400/50 animate-ping" />
          </div>
          <h2 className="text-2xl font-mono font-bold bg-gradient-to-r from-white via-emerald-200 to-white text-transparent bg-clip-text">
            TECHNICAL EXPERTISE
          </h2>
        </div>
        
        <div className="h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0" />
      </motion.div>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}

      <div className="mt-12">
        <motion.div
          variants={secureReveal}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {isLoading ? (
            // Enhanced loading skeletons in grid
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0D1627] to-[#1A2942] rounded-lg border border-gray-800 p-4 space-y-3
                  shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                  backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-emerald-400/20 animate-pulse" />
                  <div className="h-4 w-24 bg-emerald-400/20 rounded-lg animate-pulse" />
                </div>

                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-3 w-20 bg-emerald-400/20 rounded-lg animate-pulse" />
                        <div className="h-3 w-8 bg-emerald-400/20 rounded-lg animate-pulse" />
                      </div>
                      <div className="h-1.5 bg-[#1E2D4A] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400/20 to-emerald-400/40 animate-pulse" 
                          style={{ width: '60%' }} />
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
                className="relative overflow-hidden
                  bg-gradient-to-br from-[#0D1627] to-[#1A2942]
                  rounded-lg border border-gray-800 p-4
                  shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                  backdrop-blur-sm border-emerald-400/20 transition-all duration-500
                  group min-h-[180px]"
              >
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
                </div>

                <div className="relative">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="h-1 w-1 rounded-full bg-emerald-400" />
                    <h3 className="text-xs font-mono font-bold text-emerald-400/90">
                      {category}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill._id}
                        className="space-y-1.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-mono text-secondary-light">
                            {skill.name}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400/90 px-1 py-0.5 rounded-full 
                            bg-emerald-400/10 border border-emerald-400/20
                            shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                            {skill.yearsOfExperience}y
                          </span>
                        </div>
                        <div className="h-1 bg-[#1E2D4A] rounded-full overflow-hidden relative
                          shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400/80 via-emerald-400 to-emerald-400/80
                              shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}