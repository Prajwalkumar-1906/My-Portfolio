import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiCpu, FiUserCheck } from 'react-icons/fi';

const ACHIEVEMENTS = [
  {
    title: '2nd Place, Tech Pitch',
    subtitle: '"SMS Offline Payment Framework"',
    description: 'Designed and presented a protocol enabling offline peer-to-peer financial transactions using secure SMS payloads, addressing connectivity gaps in rural banking.',
    icon: FiCpu,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
  },
  {
    title: 'Kubernetes Speaker',
    subtitle: 'SAP Inside Track Event',
    description: 'Delivered an technical presentation on Kubernetes clustering and auto-scaling principles, engaging with local software developers and industry mentors.',
    icon: FiUsers,
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20'
  },
  {
    title: 'Webathon Finalist',
    subtitle: 'Development Hackathon',
    description: 'Collaborated in a fast-paced environment to build and pitch a full-stack civic portal, qualifying as a finalist among 50+ collegiate engineering teams.',
    icon: FiAward,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
  },
  {
    title: 'Volunteer Coordinator',
    subtitle: 'AIXCHANE Meetup',
    description: 'Supported logistics and community onboarding for the Bengaluru AIXCHANE community meetups, facilitating networking for AI developers.',
    icon: FiUserCheck,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-white dark:bg-[#030712] transition-colors duration-300">
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
            Achievements & Leadership
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-[#0b0f19]/50 border border-slate-150 dark:border-slate-800/60 shadow-sm flex items-start space-x-5 hover:shadow-md transition-all duration-300"
              >
                <div className={`p-4 rounded-xl flex-shrink-0 border ${ach.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3 tracking-wide">
                    {ach.subtitle}
                  </p>
                  <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
