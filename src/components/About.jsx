import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiAward, FiMapPin } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';

const QUICK_FACTS = [
  { icon: FiBookOpen, label: 'Degree', value: 'B.E. CSE (VTU)' },
  { icon: FiCalendar, label: 'Timeline', value: 'Expected June 2027' },
  { icon: FiAward, label: 'Academic Standing', value: 'CGPA 8.0/10' },
  { icon: FiMapPin, label: 'Location', value: 'Bengaluru, India' },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0b0f19]/30 border-y border-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
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

        {/* Main Grid: Portrait and Narrative */}
        <div className="grid md:grid-cols-12 gap-10 items-center mb-12">
          {/* Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 lg:col-span-4 flex justify-center"
          >
            <div className="relative group w-64 h-80 md:w-full md:h-auto max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-slate-800/80">
              <img 
                src={profileImg} 
                alt="Prajwalkumar Madiwal" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          {/* Narrative Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 lg:col-span-8 space-y-5"
          >
            <h3 className="text-2xl font-bold text-slate-200">
              AI Engineer & Software Developer
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              I am a motivated final-year Computer Science Engineering student specializing in AI Engineering and Full Stack Development. I have built and deployed production-style applications spanning LLM/RAG systems, machine learning, and full-stack web development.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              I enjoy bridging the gap between robust software architecture and intelligent systems. By combining technical analytical skills with standard developer practices, I have developed working knowledge of DSA, system design basics, and cloud deployment.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base font-semibold text-blue-400">
              Seeking an SDE / AI Engineer role to build scalable, intelligent products.
            </p>
          </motion.div>
        </div>

        {/* Quick-fact chips Row */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {QUICK_FACTS.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-[#0f172a] shadow-sm hover:shadow-md border border-slate-800/80 transition-all duration-300"
              >
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-blue-500/10 text-blue-405">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {fact.label}
                  </p>
                  <p className="text-xs font-bold text-slate-300">
                    {fact.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
