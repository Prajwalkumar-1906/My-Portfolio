import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiPython, 
  SiNodedotjs, SiMongodb, SiFirebase, SiMysql,
  SiGithub, SiDocker, SiVercel
} from 'react-icons/si';
import { 
  FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { 
  FiDatabase, FiCode, FiCpu, FiServer, FiActivity, 
  FiSearch, FiTerminal, FiZap, FiLayers, FiGlobe,
  FiBarChart2, FiTable, FiUsers, FiRefreshCw
} from 'react-icons/fi';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: SiPython, color: 'text-blue-400 bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30' },
      { name: 'JavaScript/TypeScript', icon: SiJavascript, color: 'text-amber-400 bg-amber-500/5 border-amber-500/10 hover:border-amber-500/30' },
      { name: 'SQL (basics)', icon: FiDatabase, color: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30' },
    ]
  },
  {
    title: 'AI / ML',
    skills: [
      { name: 'Pandas', icon: FiTable, color: 'text-indigo-400 bg-indigo-500/5 border-indigo-500/10 hover:border-indigo-500/30' },
      { name: 'NumPy', icon: FiCpu, color: 'text-sky-400 bg-sky-400/5 border-sky-400/10 hover:border-sky-400/30' },
      { name: 'RAG Pipelines', icon: FiSearch, color: 'text-teal-400 bg-teal-400/5 border-teal-400/10 hover:border-teal-400/30' },
      { name: 'LLMs (basics)', icon: FiZap, color: 'text-yellow-400 bg-yellow-500/5 border-yellow-500/10 hover:border-yellow-500/30' },
    ]
  },
  {
    title: 'Full Stack',
    skills: [
      { name: 'React.js', icon: FiLayers, color: 'text-sky-400 bg-sky-400/5 border-sky-400/10 hover:border-sky-400/30' },
      { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-400 bg-green-500/5 border-green-500/10 hover:border-green-500/30' },
      { name: 'FastAPI', icon: FiTerminal, color: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30' },
      { name: 'REST APIs', icon: FiServer, color: 'text-purple-400 bg-purple-500/5 border-purple-500/10 hover:border-purple-500/30' },
      { name: 'HTML/CSS', icon: FaHtml5, color: 'text-orange-400 bg-orange-500/5 border-orange-500/10 hover:border-orange-500/30' },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500 bg-green-600/5 border-green-600/10 hover:border-green-600/30' },
      { name: 'MySQL', icon: SiMysql, color: 'text-sky-500 bg-sky-600/5 border-sky-600/10 hover:border-sky-600/30' },
    ]
  },
  {
    title: 'DevOps / Cloud',
    skills: [
      { name: 'Docker', icon: SiDocker, color: 'text-blue-400 bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30' },
      { name: 'Git/GitHub', icon: SiGithub, color: 'text-slate-400 bg-slate-500/5 border-slate-500/10 hover:border-slate-500/30' },
      { name: 'GitHub Actions (CI/CD)', icon: FiRefreshCw, color: 'text-pink-400 bg-pink-500/5 border-pink-500/10 hover:border-pink-500/30' },
      { name: 'Vercel', icon: SiVercel, color: 'text-white bg-slate-800/20 border-slate-700/30 hover:border-slate-600/30' },
      { name: 'Firebase', icon: SiFirebase, color: 'text-amber-500 bg-amber-600/5 border-amber-600/10 hover:border-amber-600/30' },
    ]
  },
  {
    title: 'Core CS',
    skills: [
      { name: 'Data Structures & Algorithms', icon: FiActivity, color: 'text-rose-400 bg-rose-500/5 border-rose-500/10 hover:border-rose-500/30' },
      { name: 'OOP', icon: FiCode, color: 'text-violet-400 bg-violet-500/5 border-violet-500/10 hover:border-violet-500/30' },
      { name: 'DBMS', icon: FiDatabase, color: 'text-indigo-400 bg-indigo-500/5 border-indigo-500/10 hover:border-indigo-500/30' },
      { name: 'Operating Systems', icon: FiCpu, color: 'text-orange-400 bg-orange-500/5 border-orange-500/10 hover:border-orange-500/30' },
      { name: 'Computer Networks', icon: FiGlobe, color: 'text-blue-400 bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30' },
      { name: 'System Design Basics', icon: FiLayers, color: 'text-teal-400 bg-teal-500/5 border-teal-500/10 hover:border-teal-500/30' },
    ]
  },
  {
    title: 'Other Skills',
    skills: [
      { name: 'Power BI', icon: FiBarChart2, color: 'text-yellow-505 bg-yellow-600/5 border-yellow-600/10 hover:border-yellow-600/30' },
      { name: 'Excel', icon: FiTable, color: 'text-green-500 bg-green-600/5 border-green-600/10 hover:border-green-600/30' },
      { name: 'Agile/Scrum', icon: FiUsers, color: 'text-teal-400 bg-teal-500/5 border-teal-500/10 hover:border-teal-500/30' },
      { name: 'MLflow (Experiment Tracking)', icon: FiActivity, color: 'text-sky-400 bg-sky-500/5 border-sky-500/10 hover:border-sky-500/30' },
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
    <section id="skills" className="py-20 bg-[#030712] transition-colors duration-300">
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
              className="p-6 rounded-2xl bg-[#0b0f19]/50 border border-slate-800/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-200 mb-5 pb-2 border-b border-slate-800">
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
