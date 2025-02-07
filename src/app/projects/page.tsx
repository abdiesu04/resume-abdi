'use client';

import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import { motion } from 'framer-motion';
import { secureReveal } from '@/utils/animations';

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div
        variants={secureReveal}
        initial="hidden"
        animate="visible"
        className="space-y-24"
      >
        {/* Skills Section */}
        <section id="skills">
          <Skills />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <Experience />
        </section>
      </motion.div>
    </main>
  );
}
