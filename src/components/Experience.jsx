import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiGlobe } from 'react-icons/fi';
import Tilt3D from './Tilt3D';

const EXPERIENCES = [
  {
    role: 'Frontend AI Engineering Intern',
    company: 'FlyRank AI (Virtual)',
    location: 'Remote',
    period: '2026 – Present',
    bullets: [
      'Building responsive user interfaces and integrating Large Language Model (LLM) features into modern frontend applications.',
      'Collaborating with the development team to enhance user experience, optimize application performance, and deliver scalable AI-driven solutions.'
    ],
    tech: ['React.js', 'LLMs', 'Frontend Development', 'Performance Optimization', 'AI Integration']
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Thiranex (Virtual)',
    location: 'Remote',
    period: 'Jun 2026 – Jul 2026',
    bullets: [
      'Completed a one-month internship gaining hands-on experience designing, developing, and deploying responsive web applications.',
      'Implemented RESTful APIs, integrated databases, and collaborated using Git-based version control following software development best practices.'
    ],
    tech: ['React.js', 'FastAPI', 'REST APIs', 'Databases', 'Git']
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-[#0b0f19]/30 border-y border-slate-900 transition-colors duration-300">
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
            Experience
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline Icon Point */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0b0f19] border-2 border-blue-500 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-md">
                <FiBriefcase className="w-4 h-4" />
              </div>

              {/* Experience Card */}
              <Tilt3D className="p-6 md:p-8 rounded-2xl bg-[#0f172a] border border-slate-800/85 shadow-sm hover:shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <div className="flex items-center space-x-2 text-slate-400 mt-1">
                      <span className="font-semibold text-slate-300">{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-sm flex items-center gap-1"><FiGlobe className="inline w-3.5 h-3.5" />{exp.location}</span>
                    </div>
                  </div>
                  
                  {/* Period Pill */}
                  <div className="self-start md:self-center inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/10">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start text-slate-400 text-sm leading-relaxed">
                      <span className="text-blue-500 mr-2.5 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                  {exp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-850 text-slate-350 border border-slate-800/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
