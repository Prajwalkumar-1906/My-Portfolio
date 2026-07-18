import React from 'react';
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
import Background3D from './components/Background3D';

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 antialiased relative">
      {/* Global 3D Background */}
      <Background3D />
      
      {/* Sticky Top Navbar */}
      <Navbar />
      
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
