import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/lib/models';
import DeleteModal from '../ui/DeleteModal';

const skillCategories = [
  'Languages',
  'Frameworks',
  'Databases',
  'Tools',
  'Cloud',
  'Other'
];

export default function SkillForm() {
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: skillCategories[0],
    proficiency: 0,
    yearsOfExperience: 0,
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; skillId: string | null }>({
    isOpen: false,
    skillId: null,
  });

  // Fetch skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: new Date() }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Skill added successfully!' });
        setFormData({
          name: '',
          category: skillCategories[0],
          proficiency: 0,
          yearsOfExperience: 0,
        });
        fetchSkills(); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to add skill');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add skill. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (skillId: string) => {
    try {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Skill deleted successfully!' });
        fetchSkills(); // Refresh the list
      } else {
        throw new Error('Failed to delete skill');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete skill. Please try again.' });
    }
    setDeleteModal({ isOpen: false, skillId: null });
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Skill</h2>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${
                message.type === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter skill name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              required
            >
              {skillCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Proficiency (0-100)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.proficiency}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  proficiency: parseInt(e.target.value) 
                })}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <span className="text-white font-mono w-12">
                {formData.proficiency}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData({ 
                ...formData, 
                yearsOfExperience: parseFloat(e.target.value) 
              })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-emerald-400 text-white font-medium hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? 'Adding Skill...' : 'Add Skill'}
        </motion.button>
      </form>

      {/* Skills List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Existing Skills</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {skills.map((skill) => (
              <motion.div
                key={skill._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#1E2D4A] rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-white">{skill.name}</h4>
                      <span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">
                        {skill.category}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Proficiency</span>
                        <span className="text-emerald-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          className="h-full bg-emerald-400"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {skill.yearsOfExperience} years of experience
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteModal({ isOpen: true, skillId: skill._id })}
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, skillId: null })}
        onConfirm={() => deleteModal.skillId && handleDelete(deleteModal.skillId)}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
      />
    </div>
  );
} 