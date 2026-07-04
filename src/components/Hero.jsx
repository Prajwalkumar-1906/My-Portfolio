import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';

const TITLES = ["AI Engineer", "Software Developer", "Business Analyst"];

export default function Hero() {
  const [text, setText] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = TITLES[titleIdx];
      
      if (!isDeleting) {
        // Typing
        setText(currentFullText.substring(0, text.length + 1));
        setTypingSpeed(100);

        if (text === currentFullText) {
          // Pause at the end of the word
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setText(currentFullText.substring(0, text.length - 1));
        setTypingSpeed(50);

        if (text === '') {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % TITLES.length);
          setTypingSpeed(500); // delay before starting next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIdx, typingSpeed]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[95svh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-teal-500/10 dark:bg-teal-500/15 blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6"
        >
          <span>Available for Roles & Internships</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent">
            Prajwalkumar Madiwal
          </span>
        </motion.h1>

        {/* Typing Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 h-10 mb-8"
        >
          <span>I am a </span>
          <span className="text-blue-600 dark:text-blue-400 border-r-2 border-blue-500/70 dark:border-blue-400/70 animate-pulse pr-1">
            {text}
          </span>
        </motion.div>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Final-year CS Engineering student building AI-driven and full-stack solutions to real-world problems.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>View Projects</span>
            <FiArrowRight className="w-5 h-5" />
          </button>
          
          <a
            href="/Prajwalkumar_Madiwal_Resume.pdf"
            download="Prajwalkumar_Madiwal_Resume.pdf"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-slate-300 dark:border-slate-800 bg-white/5 hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            <FiDownload className="w-5 h-5" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-slate-300 dark:border-slate-800 bg-white/5 hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <FiMail className="w-5 h-5" />
            <span>Contact Me</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
