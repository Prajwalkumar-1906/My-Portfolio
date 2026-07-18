import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingResume() {
  const [isVisible, setIsVisible] = useState(false);

  // Show floating button only when scrolled past the hero section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Floating Action Button */}
          <a
            href="/resume.pdf"
            download="Prajwalkumar_Madiwal_Resume.pdf"
            className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold px-4 py-3 sm:px-5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#030712]"
            title="Download Resume"
          >
            <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out inline-block whitespace-nowrap text-sm font-medium">
              Download Resume
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
