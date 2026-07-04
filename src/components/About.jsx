import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiAward, FiMapPin } from 'react-icons/fi';

const QUICK_FACTS = [
  { icon: FiBookOpen, label: 'Degree', value: 'B.E. CSE (VTU)' },
  { icon: FiCalendar, label: 'Timeline', value: 'Expected June 2027' },
  { icon: FiAward, label: 'Academic Standing', value: 'CGPA 7.8/10' },
  { icon: FiMapPin, label: 'Location', value: 'Bengaluru, India' },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-[#0b0f19]/30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-5 gap-10 items-center">
          {/* Narrative Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Aspiring Tech Professional
            </h3>
            <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-base">
              I am a motivated final-year Computer Science Engineering student with hands-on experience across software engineering, analytics, and machine learning.
            </p>
            <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-base">
              I love bridging the gap between robust software architecture and intelligent systems. By combining technical analytical skills with standard developer practices, I aim to build systems that automate processes, generate insights, and solve complex user-facing problems.
            </p>
            <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-base font-medium text-blue-600 dark:text-blue-400">
              Actively exploring opportunities as an entry-level AI Engineer, Software Developer, or Business Analyst.
            </p>
          </motion.div>

          {/* Quick-fact chips */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
          >
            {QUICK_FACTS.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white dark:bg-[#0f172a] shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-800/80 transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {fact.label}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {fact.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
