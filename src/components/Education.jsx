import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiMapPin, FiActivity } from 'react-icons/fi';

const EDUCATION_ITEMS = [
  {
    degree: 'B.E. Computer Science Engineering',
    institution: 'Rajarajeswari College of Engineering (VTU)',
    period: 'Expected June 2027',
    location: 'Bengaluru, India',
    grade: 'CGPA 7.8 / 10',
    details: 'Focusing on Core CS principles including Data Structures, Database Systems, Computer Networks, and Machine Learning applications.'
  },
  {
    degree: 'Pre-University Course (PUC)',
    institution: 'Tungal Independent PU Science College',
    period: '2021 – 2023',
    location: 'Karnataka, India',
    grade: '82%',
    details: 'Completed major coursework in Physics, Chemistry, Mathematics, and Computer Science.'
  },
  {
    degree: 'Secondary School (10th Grade)',
    institution: 'Sri Sathya Sai LokaSeva Vidya Kendra (CBSE)',
    period: '2020 – 2021',
    location: 'Karnataka, India',
    grade: '81%',
    details: 'Acquired foundation in mathematics, general sciences, and software logic.'
  }
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-slate-50 dark:bg-[#0b0f19]/30 transition-colors duration-300">
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
            Education
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* Education Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
          {EDUCATION_ITEMS.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline Icon Point */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-[#0b0f19] border-2 border-blue-500 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-md">
                <FiBookOpen className="w-4 h-4" />
              </div>

              {/* Education Card */}
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-150 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center space-x-2 text-slate-650 dark:text-slate-400 mt-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{edu.institution}</span>
                      <span className="text-slate-400 dark:text-slate-600">•</span>
                      <span className="text-sm flex items-center gap-1"><FiMapPin className="inline w-3.5 h-3.5" />{edu.location}</span>
                    </div>
                  </div>
                  
                  {/* Period Pill */}
                  <div className="self-start md:self-center inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {edu.details}
                </p>

                {/* Grade Badge */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800/60 text-slate-750 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800/40">
                  <FiActivity className="w-3.5 h-3.5 text-blue-500" />
                  <span>Grade: {edu.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
