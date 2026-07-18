import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';

const TITLES = ["AI Engineer", "Full Stack Developer", "Software Developer"];

export default function Hero() {
  const [text, setText] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const canvasRef = useRef(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 15000));

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // 3D coordinates (z represents depth from 0.1 to 1)
        this.z = Math.random() * 0.9 + 0.1;
        this.radius = (Math.random() * 1.5 + 0.5) * this.z * 1.5;
        this.vx = (Math.random() * 0.3 - 0.15) * this.z;
        this.vy = (Math.random() * 0.3 - 0.15) * this.z;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.15 * this.z})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse movement response
    let mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        // Check distance to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            // Pull slightly towards mouse for interactive effect
            p1.x += dx * 0.005 * p1.z;
            p1.y += dy * 0.005 * p1.z;

            // Draw line to mouse
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / mouse.radius) * 0.06 * p1.z})`;
            ctx.lineWidth = 0.5 * p1.z;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const avgZ = (p1.z + p2.z) / 2;
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 120) * 0.08 * avgZ})`;
            ctx.lineWidth = 0.5 * avgZ;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      {/* 3D Canvas Background Particle Field */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      />

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
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-semibold tracking-wide mb-6"
        >
          <span>Available for Roles & Internships</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
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
          className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200 h-10 mb-8"
        >
          <span>I am an </span>
          <span className="text-blue-400 border-r-2 border-blue-400/70 animate-pulse pr-1">
            {text}
          </span>
        </motion.div>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Final-year CSE student specializing in AI Engineering and Full Stack Development. Seeking an SDE / AI Engineer role to build scalable, intelligent products.
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-slate-950 font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>View Projects</span>
            <FiArrowRight className="w-5 h-5" />
          </button>
          
          <a
            href="/resume.pdf"
            download="Prajwalkumar_Madiwal_Resume.pdf"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-slate-800 bg-white/5 hover:bg-slate-800/40 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            <FiDownload className="w-5 h-5" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-slate-800 bg-white/5 hover:bg-slate-800/40 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <FiMail className="w-5 h-5" />
            <span>Contact Me</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
