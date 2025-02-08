import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '@/lib/models';
import DeleteModal from '../ui/DeleteModal';

export default function ExperienceForm() {
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    company: '',
    location: '', 
    startDate: new Date().toISOString().split('T')[0], // Initialize with current date in YYYY-MM-DD format
    endDate: '',
    description: '',
    technologies: [],
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; experienceId: string | null }>({
    isOpen: false,
    experienceId: null,
  });

  // Fetch experiences on mount
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      const data = await res.json();
      if (data.success) {
        setExperiences(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: new Date() }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Experience added successfully!' });
        setFormData({
          title: '',
          company: '',
          location: '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          description: '',
          technologies: [],
        });
        fetchExperiences(); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to add experience');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add experience. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (experienceId: string) => {
    try {
      const res = await fetch(`/api/experience/${experienceId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Experience deleted successfully!' });
        fetchExperiences(); // Refresh the list
      } else {
        throw new Error('Failed to delete experience');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete experience. Please try again.' });
    }
    setDeleteModal({ isOpen: false, experienceId: null });
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Experience</h2>
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
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter company name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter location"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate?.toString() || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate?.toString() || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (use new lines for bullet points)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              rows={6}
              placeholder="Enter job description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies?.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="React, Node.js, MongoDB"
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
          {isLoading ? 'Adding Experience...' : 'Add Experience'}
        </motion.button>
      </form>

      {/* Experience List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Experience History</h3>
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {experiences.map((exp) => (
              <motion.div
                key={exp._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#1E2D4A] rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-white">{exp.title}</h4>
                    <div className="text-emerald-400">{exp.company}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        year: 'numeric'
                      })}
                      {exp.endDate ? ` - ${new Date(exp.endDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        year: 'numeric'
                      })}` : ' - Present'}
                    </div>
                    <div className="text-sm text-gray-400">{exp.location}</div>
                    {exp.description && (
                      <div className="space-y-2 mt-2">
                        {exp.description.split('\n').map((point, i) => (
                          <p key={i} className="text-gray-300">{point}</p>
                        ))}
                      </div>
                    )}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteModal({ isOpen: true, experienceId: exp._id || null })}
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
        onClose={() => setDeleteModal({ isOpen: false, experienceId: null })}
        onConfirm={() => deleteModal.experienceId && handleDelete(deleteModal.experienceId)}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? This action cannot be undone."
      />
    </div>
  );
} 