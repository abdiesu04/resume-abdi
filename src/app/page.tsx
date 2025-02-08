'use client';

import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8 pb-8">
        <section id="about">
          <Hero />
        </section>

        <section id="skills" className="min-h-screen px-4">
          <div className="max-w-7xl mx-auto">
            <Skills />
          </div>
        </section>

        <section id="experience" className="min-h-screen px-4">
          <div className="max-w-7xl mx-auto">
            <Experience />
          </div>
        </section>

        <section id="projects" className="min-h-screen px-4">
          <div className="max-w-7xl mx-auto">
            <Projects />
          </div>
        </section>

        <section id="education" className="min-h-screen px-4">
          <div className="max-w-7xl mx-auto">
            <Education />
          </div>
        </section>

        <section id="certificates" className="min-h-screen px-4">
          <div className="max-w-7xl mx-auto">
            <Certificates />
          </div>
        </section>

        <Chat />
      </div>
    </Layout>
  );
}