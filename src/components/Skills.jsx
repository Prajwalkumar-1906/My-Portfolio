import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiPython, SiC, 
  SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiMysql,
  SiGithub
} from 'react-icons/si';
import { 
  FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { 
  FiDatabase, FiCode, FiCpu, FiServer, FiActivity, 
  FiSearch, FiTerminal, FiZap, FiLayers 
} from 'react-icons/fi';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: 'text-amber-500 bg-amber-500/5 border-amber-500/10 hover:border-amber-500/30' },
      { name: 'Python', icon: SiPython, color: 'text-blue-500 bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30' },
      { name: 'C', icon: SiC, color: 'text-indigo-500 bg-indigo-500/5 border-indigo-500/10 hover:border-indigo-500/30' },
      { name: 'SQL', icon: FiDatabase, color: 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30' },
    ]
  },
  {
    title: 'Web Technologies',
    skills: [
      { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500 bg-orange-500/5 border-orange-500/10 hover:border-orange-500/30' },
      { name: 'CSS3', icon: FaCss3Alt, color: 'text-sky-500 bg-sky-500/5 border-sky-500/10 hover:border-sky-500/30' },
      { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500 bg-green-500/5 border-green-500/10 hover:border-green-500/30' },
      { name: 'Express.js', icon: SiExpress, color: 'text-slate-400 bg-slate-400/5 border-slate-400/10 hover:border-slate-400/30' },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600 bg-green-600/5 border-green-600/10 hover:border-green-600/30' },
      { name: 'MySQL', icon: SiMysql, color: 'text-sky-600 bg-sky-600/5 border-sky-600/10 hover:border-sky-600/30' },
      { name: 'Firebase', icon: SiFirebase, color: 'text-amber-600 bg-amber-600/5 border-amber-600/10 hover:border-amber-600/30' },
    ]
  },
  {
    title: 'Core CS / AI Concepts',
    skills: [
      { name: 'Data Structures & Algorithms', icon: FiActivity, color: 'text-rose-500 bg-rose-500/5 border-rose-500/10 hover:border-rose-500/30' },
      { name: 'OOP', icon: FiCode, color: 'text-violet-500 bg-violet-500/5 border-violet-500/10 hover:border-violet-500/30' },
      { name: 'REST APIs', icon: FiServer, color: 'text-purple-500 bg-purple-500/5 border-purple-500/10 hover:border-purple-500/30' },
      { name: 'Machine Learning', icon: FiCpu, color: 'text-indigo-500 bg-indigo-500/5 border-indigo-500/10 hover:border-indigo-500/30' },
      { name: 'LLMs', icon: FiZap, color: 'text-yellow-500 bg-yellow-500/5 border-yellow-500/10 hover:border-yellow-500/30' },
    ]
  },
  {
    title: 'AI Tools Ecosystem',
    skills: [
      { name: 'Gemini', icon: FiZap, color: 'text-sky-400 bg-sky-400/5 border-sky-400/10 hover:border-sky-400/30' },
      { name: 'Claude', icon: FiCpu, color: 'text-orange-400 bg-orange-400/5 border-orange-400/10 hover:border-orange-400/30' },
      { name: 'Perplexity', icon: FiSearch, color: 'text-teal-400 bg-teal-400/5 border-teal-400/10 hover:border-teal-400/30' },
      { name: 'Grok', icon: FiTerminal, color: 'text-indigo-400 bg-indigo-400/5 border-indigo-400/10 hover:border-indigo-400/30' },
      { name: 'GitHub Copilot', icon: SiGithub, color: 'text-slate-400 bg-slate-400/5 border-slate-400/10 hover:border-slate-400/30' },
      { name: 'Devin', icon: FiLayers, color: 'text-blue-400 bg-blue-400/5 border-blue-400/10 hover:border-blue-400/30' },
    ]
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#030712] transition-colors duration-300">
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
            Technical Skills
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Skill Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-6 rounded-2xl bg-slate-50 dark:bg-[#0b0f19]/50 border border-slate-150 dark:border-slate-800/60 shadow-sm flex flex-col justify-between ${
                category.title.includes('AI') || category.title.includes('Core') 
                  ? 'md:col-span-2 lg:col-span-1' 
                  : ''
              }`}
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={sIdx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-semibold select-none cursor-default transition-all duration-200 ${skill.color}`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
