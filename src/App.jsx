import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingResume from './components/FloatingResume';
import AstraBot from './components/AstraBot';

export default function App() {
  // Default to Dark Mode for premium tech developer aesthetic
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // Default dark
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-55 dark:bg-[#030712] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Top Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Single Page Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Achievements />
        <Education />
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingResume />

      {/* Voice Assistant Chatbot */}
      <AstraBot />
    </div>
  );
}
