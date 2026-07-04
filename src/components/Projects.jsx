import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCpu, FiAlertCircle } from 'react-icons/fi';

const PROJECTS = [
  {
    title: 'Community Hero',
    description: 'AI-powered civic platform where citizens report local issues using images, videos, and GPS location. The system auto-categorizes complaints and enables community verification to streamline resolution flows.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express.js', 'AI Classification'],
    github: 'https://github.com/Prajwalkumar-1906/Community-Hero', // User repository link
    live: '', // Leave blank to show placeholder/hide if unavailable
    inProgress: false
  },
  {
    title: 'Paws Safe',
    description: 'Full-stack stray animal safety ecosystem for community reporting and locating feeding points. Includes a secure dashboard panel for administrators to moderate, verify, and map location logs.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6)', 'CSS3', 'Leaflet Maps'],
    github: 'https://github.com/Prajwalkumar-1906/Paws-Safe', // REPLACE WITH ACTUAL LINK IF NECESSARY
    live: '',
    inProgress: false
  },
  {
    title: 'RRDCH Clinical Platform',
    description: 'Responsive clinical information platform and hospital management interface featuring secure session authentication and Firebase Realtime DB integrations for live system logging and state persistence.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Auth', 'Firebase Realtime DB'],
    github: 'https://github.com/Prajwalkumar-1906/RRDCH', // REPLACE WITH ACTUAL LINK
    live: 'https://rrdch-demo.vercel.app', // REPLACE WITH ACTUAL LINK
    inProgress: false
  },
  {
    title: 'AstraAI',
    description: 'An AI-focused developer utility built with JavaScript for automating machine learning environment tasks, executing smart prompt operations, and managing API access layers.',
    tech: ['JavaScript (ES6)', 'Node.js', 'Gemini API', 'REST Client'],
    github: 'https://github.com/Prajwalkumar-1906/AstraAI', // REPLACE WITH ACTUAL LINK
    live: '',
    inProgress: false
  },
  {
    title: 'Smart Agriculture IoT Framework',
    description: 'A cloud-connected telemetry tracking and resource automation framework for farm microclimates, monitoring moisture levels, and scheduling automated watering cycles.',
    tech: ['C++', 'Arduino/ESP32', 'IoT Telemetry', 'MQTT', 'InfluxDB', 'Grafana'],
    github: '',
    live: '',
    inProgress: true
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-[#030712] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-[#0b0f19]/50 border border-slate-150 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all duration-300 relative ${
                proj.inProgress ? 'border-dashed' : ''
              }`}
            >
              {/* Top Section */}
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {proj.title}
                  </h3>
                  
                  {/* Status Badges */}
                  {proj.inProgress ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse">
                      <FiAlertCircle className="w-3 h-3" />
                      <span>In Progress</span>
                    </span>
                  ) : (
                    <span className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <FiCpu className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-6">
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
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-200/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-350"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 border-t border-slate-200/50 dark:border-slate-800/60 pt-4">
                  {proj.github ? (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-250"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>GitHub Repository</span>
                    </a>
                  ) : (
                    proj.inProgress && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 cursor-not-allowed inline-flex items-center space-x-1.5">
                        <FiGithub className="w-4 h-4" />
                        <span>Source coming soon</span>
                      </span>
                    )
                  )}

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-250 ml-auto"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
