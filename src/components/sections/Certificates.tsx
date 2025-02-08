'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Certificate } from '@/lib/models';

const secureReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch('/api/certificates');
        const data = await res.json();
        if (data.success) {
          setCertificates(data.data.filter((cert: Certificate) => cert.visible));
        }
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleVisibilityToggle = async (currentVisibility: boolean, id: string) => {
    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visible: !currentVisibility }),
      });

      const data = await response.json();
      if (data.success) {
        setCertificates(prevCerts =>
          prevCerts.map(cert =>
            cert._id === id ? { ...cert, visible: !currentVisibility } : cert
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle certificate visibility:', error);
    }
  };

  const handleCertificateClick = (imageUrl: string) => {
    if (imageUrl) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    }
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
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
        </div>
        
        <div className="h-px bg-gradient-to-r from-accent-gold/50 via-accent-gold to-accent-gold/50" />
      </motion.div>

      <motion.div
        variants={secureReveal}
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold" />
          </div>
        ) : (
          certificates.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => cert.imageUrl && handleCertificateClick(cert.imageUrl)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
              }}
              className={`relative overflow-hidden
                bg-gradient-to-br from-[#0D1627] to-[#1A2942]
                rounded-xl border border-gray-800 p-6
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.4)]
                backdrop-blur-sm hover:border-accent-gold/40 transition-all duration-300
                group ${cert.imageUrl ? 'cursor-pointer' : ''}`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between space-x-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
                    <span className="text-xs font-mono text-accent-gold px-2 py-1 rounded-full bg-accent-gold/10
                      shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                      VERIFIED
                    </span>
                  </div>
                  {cert.imageUrl && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-accent-gold/60 group-hover:text-accent-gold"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-secondary-light group-hover:text-accent-gold
                  transition-colors duration-300">
                  {cert.title}
                </h3>

                <div className="mt-2 text-secondary-dark">
                  <div className="font-medium text-emerald-400">{cert.issuer}</div>
                  <div className="text-sm">
                    {new Date(cert.date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {cert.description && (
                  <p className="mt-4 text-secondary-dark group-hover:text-secondary-light
                    transition-colors duration-300 text-sm">
                    {cert.description}
                  </p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-mono rounded-full
                          bg-primary-light/10 text-secondary-light border border-accent-gold/20
                          shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] group-hover:border-accent-gold/40
                          transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking the verify link
                    }}
                    className="mt-4 inline-flex items-center space-x-2 text-sm text-accent-gold hover:text-accent-gold/80
                      transition-colors duration-300"
                  >
                    <span>Verify Certificate</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}

                {cert._id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const id = cert._id;
                      if (id) {
                        handleVisibilityToggle(cert.visible, id);
                      }
                    }}
                    className={`mt-4 px-3 py-1 text-xs font-mono rounded-full
                      ${cert.visible 
                        ? 'bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20' 
                        : 'bg-gray-700/10 text-gray-400 hover:bg-gray-700/20'}
                      transition-colors duration-300`}
                  >
                    {cert.visible ? 'Visible' : 'Hidden'}
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
} 