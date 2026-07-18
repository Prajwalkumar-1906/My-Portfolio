import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiUserCheck, FiLinkedin, FiHeart, FiVolume2 } from 'react-icons/fi';

const ACHIEVEMENTS = [
  {
    title: 'Community Manager',
    subtitle: 'Dream Den Club',
    description: 'Leading and orchestrating club activities, cultivating developer engagement, and managing community collaboration channels.',
    icon: FiUsers,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  },
  {
    title: 'LinkedIn Tech Content Creator',
    subtitle: '5K+ Followers Community',
    description: 'Actively creating technical content focused on AI engineering, full-stack development, and career motivation, reaching over 5,000 professional followers.',
    icon: FiLinkedin,
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
  },
  {
    title: 'Volunteer',
    subtitle: 'AIXchange Meetup Group',
    description: 'Assisting in organizing Bengaluru AI meetups, coordinating developer workshops, and supporting logistics for AI/ML interest groups.',
    icon: FiUserCheck,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  },
  {
    title: 'Featured Speaker',
    subtitle: 'SAP Inside Track Bengaluru (Devanahalli Campus)',
    description: 'Presented on Agentic AI, showcasing implementations of intelligent agents and conversational systems to developers and industry professionals.',
    icon: FiVolume2,
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
  },
  {
    title: 'Core Volunteer Member',
    subtitle: 'One World One Family Mission & Annapurna Trust',
    description: 'Dedicated core volunteer supporting community welfare initiatives, logistics, and social services outreach.',
    icon: FiHeart,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-[#030712] transition-colors duration-300">
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
            Achievements & Involvement
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="p-6 md:p-8 rounded-2xl bg-[#0b0f19]/50 border border-slate-800/60 shadow-sm flex items-start space-x-5 hover:shadow-md transition-all duration-300"
              >
                <div className={`p-4 rounded-xl flex-shrink-0 border ${ach.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-200">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 mb-3 tracking-wide">
                    {ach.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
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
