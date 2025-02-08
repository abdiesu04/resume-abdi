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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

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
          const validSkills = data.data
            .filter((skill: any) => (
              typeof skill.name === 'string' &&
              typeof skill.category === 'string' &&
              typeof skill.proficiency === 'number' &&
              typeof skill.yearsOfExperience === 'number' &&
              typeof skill._id === 'string'
            ))
            .map((skill: any) => ({
              ...skill,
              visible: skill.visible ?? true
            }));

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

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section className="py-8">
      <motion.div variants={secureReveal} initial="hidden" animate="visible" className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
            <h2 className="text-lg font-mono font-bold text-secondary-light tracking-wider">SKILLS</h2>
          </div>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-all duration-300
                  ${selectedCategory === category 
                    ? 'bg-accent-gold text-black' 
                    : 'bg-[#1A2942] text-secondary-light hover:bg-accent-gold/20'}`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {error && (
        <div className="mt-4 text-red-500 text-center text-sm font-mono">{error}</div>
      )}

      <motion.div variants={secureReveal} initial="hidden" animate="visible" className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#0D1627] rounded-lg border border-gray-800 p-3 animate-pulse">
                <div className="h-3 w-16 bg-secondary-light/20 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id}
                onClick={() => skill._id && setExpandedSkill(expandedSkill === skill._id ? null : skill._id)}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br from-[#0D1627] to-[#1A2942] rounded-lg border border-gray-800 p-3
                  hover:border-emerald-400/40 transition-all duration-300 cursor-pointer
                  ${expandedSkill === skill._id ? 'col-span-2 row-span-2' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-mono font-bold text-secondary-light">{skill.name}</h3>
                </div>
                
                {expandedSkill === skill._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-3"
                  >
                    <div className="relative h-2 bg-[#1E2D4A] rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400/80 to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400/60">{skill.category}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-emerald-400">{skill.proficiency}%</span>
                        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                          {skill.yearsOfExperience}Y EXP
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}