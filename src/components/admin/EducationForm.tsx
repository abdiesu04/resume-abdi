import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Education } from '@/lib/models';
import DeleteModal from '../ui/DeleteModal';

export default function EducationForm() {
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; educationId: string | null }>({
    isOpen: false,
    educationId: null,
  });

  // Fetch education entries on mount
  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch('/api/education');
      const data = await res.json();
      if (data.success) {
        setEducation(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch education:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: new Date() }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Education entry added successfully!' });
        setFormData({
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
        });
        fetchEducation(); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to add education entry');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add education entry. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (educationId: string) => {
    try {
      const res = await fetch(`/api/education/${educationId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Education entry deleted successfully!' });
        fetchEducation(); // Refresh the list
      } else {
        throw new Error('Failed to delete education entry');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete education entry. Please try again.' });
    }
    setDeleteModal({ isOpen: false, educationId: null });
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Education</h2>
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
              Institution
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter institution name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Degree
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter degree"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Field of Study
            </label>
            <input
              type="text"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter field of study"
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
                value={formData.startDate}
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
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              rows={4}
              placeholder="Enter description"
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
          {isLoading ? 'Adding Education...' : 'Add Education'}
        </motion.button>
      </form>

      {/* Education List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Education History</h3>
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {education.map((edu) => (
              <motion.div
                key={edu._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#1E2D4A] rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-white">{edu.institution}</h4>
                    <div className="text-emerald-400">{edu.degree} in {edu.field}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(edu.startDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        year: 'numeric'
                      })}
                      {edu.endDate ? ` - ${new Date(edu.endDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        year: 'numeric'
                      })}` : ' - Present'}
                    </div>
                    <div className="text-sm text-gray-400">{edu.location}</div>
                    {edu.description && (
                      <p className="text-gray-300 mt-2">{edu.description}</p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteModal({ isOpen: true, educationId: edu._id })}
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
        onClose={() => setDeleteModal({ isOpen: false, educationId: null })}
        onConfirm={() => deleteModal.educationId && handleDelete(deleteModal.educationId)}
        title="Delete Education Entry"
        message="Are you sure you want to delete this education entry? This action cannot be undone."
      />
    </div>
  );
} 