import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection for background blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for highlighting active section
  useEffect(() => {
    const observers = [];
    const options = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Trigger when section occupies the middle of the screen
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glassmorphism dark:bg-[#0b0f19]/80 bg-white/80 py-3 shadow-lg border-b border-slate-200/50 dark:border-slate-800/50' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="text-xl font-bold tracking-tight cursor-pointer focus:outline-none"
        >
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Prajwalkumar</span>
          <span className="text-slate-700 dark:text-slate-300">.M</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer focus:outline-none ${
                activeSection === item.id
                  ? 'text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-400/10'
                  : 'text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glassmorphism dark:bg-[#030712]/95 bg-white/95 border-b border-slate-200/50 dark:border-slate-800/50 py-4 px-6 flex flex-col space-y-2 animate-fade-in shadow-xl">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer ${
                activeSection === item.id
                  ? 'text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-400/10'
                  : 'text-slate-700 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
