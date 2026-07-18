import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCpu } from 'react-icons/fi';
import Tilt3D from './Tilt3D';

const PROJECTS = [
// ... [rest of file imports done]

  {
    title: 'ASTRA AI',
    description: 'Built an AI-powered intelligent assistant using Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) to deliver context-aware, conversational responses over custom knowledge bases. Integrated document retrieval, prompt engineering, and semantic search to enable natural-language interaction with user-uploaded content. Designed a scalable full-stack architecture with a responsive React frontend, FastAPI backend, and real-time AI inference pipeline.',
    tech: ['React.js', 'FastAPI', 'LLMs', 'RAG', 'Semantic Search', 'Python'],
    github: 'https://github.com/Prajwalkumar-1906/AstraAI',
    live: '',
    inProgress: false
  },
  {
    title: 'Community Hero',
    description: 'Built a full-stack web application connecting volunteers with community service initiatives through a responsive, user-friendly platform. Implemented secure user authentication and real-time database management using Firebase Auth and Firestore. Designed reusable React components and deployed the application via Firebase Hosting with Git-based version control.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Firebase Auth', 'Firestore', 'Firebase Hosting'],
    github: 'https://github.com/Prajwalkumar-1906/Community-Hero',
    live: '',
    inProgress: false
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-[#030712] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <Tilt3D className="group flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#0b0f19]/50 border border-slate-800/60 shadow-sm hover:shadow-md hover:border-blue-400/20 relative h-full">
                {/* Top Section */}
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-200">
                      {proj.title}
                    </h3>
                    
                    <span className="p-2 rounded-lg bg-blue-500/10 text-blue-450">
                      <FiCpu className="w-4 h-4" />
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800/40 text-slate-350"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4 border-t border-slate-800/60 pt-4">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors duration-200"
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>GitHub Repository</span>
                      </a>
                    )}

                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors duration-200 ml-auto"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
