import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';

const CERTIFICATIONS = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified',
    issuer: 'Oracle',
    date: '2025',
    color: 'border-orange-500/20 text-orange-500 hover:border-orange-500/40 bg-orange-500/5'
  },
  {
    title: 'AI on Jetson Nano Deployment',
    issuer: 'NVIDIA Deep Learning Institute',
    date: '2025',
    color: 'border-green-500/20 text-green-500 hover:border-green-500/40 bg-green-500/5'
  },
  {
    title: 'High Tech Industry Frameworks',
    issuer: 'SAP',
    date: '2025',
    color: 'border-blue-500/20 text-blue-500 hover:border-blue-500/40 bg-blue-500/5'
  },
  {
    title: 'Python for Data Science / Power BI',
    issuer: 'Upgrad / Simplilearn',
    date: '2024',
    color: 'border-purple-500/20 text-purple-500 hover:border-purple-500/40 bg-purple-500/5'
  },
  {
    title: 'AI Catalyst Credentials',
    issuer: 'tiramAI',
    date: '2025',
    color: 'border-teal-500/20 text-teal-500 hover:border-teal-500/40 bg-teal-500/5'
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-slate-50 dark:bg-[#0b0f19]/30 transition-colors duration-300">
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
            Certifications
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border bg-white dark:bg-[#0f172a] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${cert.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <FiAward className="w-8 h-8 opacity-90" />
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 line-clamp-2 mb-2">
                  {cert.title}
                </h3>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {cert.issuer}
                </span>
                
                {/* Link Placeholder */}
                <span className="text-slate-400 dark:text-slate-600 group-hover:text-blue-500 cursor-pointer transition-colors duration-200">
                  <FiExternalLink className="w-3.5 h-3.5" title="Verify credential" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
