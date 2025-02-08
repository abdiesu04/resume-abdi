'use client';

import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Chat from '@/components/Chat';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Layout>
      <div className="w-full max-w-[100vw] overflow-x-hidden space-y-8 md:space-y-16 pb-8">
        <motion.section 
          id="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Hero />
        </motion.section>

        <motion.section 
          id="skills" 
          className="w-full min-h-[80vh] md:min-h-screen px-4 py-8 md:py-16 bg-gradient-to-br from-emerald-900/10 to-blue-900/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <Skills />
          </div>
        </motion.section>

        <motion.section 
          id="experience" 
          className="w-full min-h-[80vh] md:min-h-screen px-4 py-8 md:py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <Experience />
          </div>
        </motion.section>

        <motion.section 
          id="projects" 
          className="w-full min-h-[80vh] md:min-h-screen px-4 py-8 md:py-16 bg-gradient-to-br from-blue-900/10 to-purple-900/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <Projects />
          </div>
        </motion.section>

        <motion.section 
          id="education" 
          className="w-full min-h-[80vh] md:min-h-screen px-4 py-8 md:py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <Education />
          </div>
        </motion.section>

        <motion.section 
          id="certificates" 
          className="w-full min-h-[80vh] md:min-h-screen px-4 py-8 md:py-16 bg-gradient-to-br from-purple-900/10 to-emerald-900/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <Certificates />
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Chat />
        </motion.div>
      </div>
    </Layout>
  );
}