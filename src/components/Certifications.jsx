import React from 'react';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import Tilt3D from './Tilt3D';

const CERTIFICATIONS = [
  {
    title: 'Oracle Certified Foundations Associate — Oracle Cloud Infrastructure',
    issuer: 'Oracle',
    date: '2025',
    color: 'border-orange-500/20 text-orange-400 hover:border-orange-500/40 bg-orange-500/5'
  },
  {
    title: 'Getting Started with AI on Jetson Nano',
    issuer: 'NVIDIA',
    date: '2025',
    color: 'border-green-500/20 text-green-400 hover:border-green-500/40 bg-green-500/5'
  },
  {
    title: 'Introducing the High Tech Industry',
    issuer: 'SAP Certified',
    date: '2025',
    color: 'border-blue-500/20 text-blue-400 hover:border-blue-500/40 bg-blue-500/5'
  },
  {
    title: 'Intra-College Webathon 2026 — Finalist',
    issuer: 'Webathon Coordinator',
    date: '2026',
    color: 'border-teal-500/20 text-teal-400 hover:border-teal-500/40 bg-teal-500/5'
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-[#0b0f19]/30 border-y border-slate-900 transition-colors duration-300">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <Tilt3D className={`p-6 rounded-2xl border bg-[#0f172a] shadow-sm hover:shadow-md flex flex-col justify-between h-full ${cert.color}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <FiAward className="w-8 h-8 opacity-90" />
                    <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-200 line-clamp-3 mb-2">
                    {cert.title}
                  </h3>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-xs font-bold text-slate-400">
                    {cert.issuer}
                  </span>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
