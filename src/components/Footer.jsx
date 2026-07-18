import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] border-t border-slate-800/55 py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
          <p>© {currentYear} Prajwalkumar Madiwal. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Bengaluru, Karnataka, India
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <div className="flex space-x-4 mb-1">
            <a 
              href="https://www.linkedin.com/in/prajwalkumar19/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-450 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/Prajwalkumar-1906" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a 
              href="mailto:madiwalprajwalkumar@gmail.com"
              className="text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-450 transition-colors"
              aria-label="Email Address"
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>
          
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built with React, Tailwind CSS, & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
