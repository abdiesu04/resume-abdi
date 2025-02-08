import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/models';
import DeleteModal from '../ui/DeleteModal';

export default function ProjectForm() {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    featured: false,
    visible: true,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; projectId: string | null }>({
    isOpen: false,
    projectId: null,
  });

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: new Date() }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Project added successfully!' });
        setFormData({
          title: '',
          description: '',
          technologies: [],
          featured: false,
          visible: true,
        });
        fetchProjects(); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to add project');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add project. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Project deleted successfully!' });
        fetchProjects(); // Refresh the list
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete project. Please try again.' });
    }
    setDeleteModal({ isOpen: false, projectId: null });
  };

  const handleVisibilityToggle = async (projectId: string, currentVisibility: boolean) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisibility }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Visibility updated successfully!' });
        fetchProjects(); // Refresh the list
      } else {
        throw new Error('Failed to update visibility');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update visibility. Please try again.' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Project</h2>
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
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter project title"
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
              placeholder="Enter project description"
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Live URL (optional)
            </label>
            <input
              type="url"
              value={formData.liveUrl || ''}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub URL (optional)
            </label>
            <input
              type="url"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#1E2D4A] border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-gray-700 text-emerald-400 focus:ring-emerald-400"
                id="featured"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                Featured Project
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.visible}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="rounded border-gray-700 text-emerald-400 focus:ring-emerald-400"
                id="visible"
              />
              <label htmlFor="visible" className="ml-2 text-sm font-medium text-gray-300">
                Visible on Page
              </label>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-emerald-400 text-white font-medium hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? 'Adding Project...' : 'Add Project'}
        </motion.button>
      </form>

      {/* Projects List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Existing Projects</h3>
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#1E2D4A] rounded-lg p-4 border border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-medium text-white">{project.title}</h4>
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 ${
                        project.visible ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                      } text-xs rounded-full`}>
                        {project.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleVisibilityToggle(project._id as string, project.visible)}
                      className={`p-2 rounded-full ${
                        project.visible ? 'text-emerald-400 hover:text-emerald-500' : 'text-red-400 hover:text-red-500'
                      } transition-colors`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {project.visible ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        )}
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setDeleteModal({ isOpen: true, projectId: project._id as string })}
                      className="p-2 rounded-full text-red-400 hover:text-red-500 transition-colors"
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
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, projectId: null })}
        onConfirm={() => deleteModal.projectId && handleDelete(deleteModal.projectId)}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
}