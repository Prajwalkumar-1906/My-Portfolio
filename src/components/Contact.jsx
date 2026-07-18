import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

// Formspree Integration Key - Optional
// Recruiters can replace this placeholder with their own Formspree endpoint key
const FORMSPREE_KEY = ''; 

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('sending');

    if (FORMSPREE_KEY) {
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    } else {
      // Mailto Fallback
      try {
        const { name, email, message } = formData;
        const subject = encodeURIComponent(`Contact from ${name} (${email})`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:madiwalprajwalkumar@gmail.com?subject=${subject}&body=${body}`;
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (err) {
        setStatus('error');
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#030712] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full origin-center"
          />
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Details Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-200 mb-4">
                Let's discuss opportunities
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have an opening for an SDE, AI Engineer, Full-Stack Developer, or simply want to chat, my inbox is always open.
              </p>
            </div>

            {/* List details */}
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/10">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</p>
                  <a href="mailto:madiwalprajwalkumar@gmail.com" className="text-sm font-bold text-slate-350 hover:text-blue-400 transition-colors">
                    madiwalprajwalkumar@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/10">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</p>
                  <a href="tel:+917676222500" className="text-sm font-bold text-slate-350 hover:text-teal-400 transition-colors">
                    +91-7676222500
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-bold text-slate-300">
                    Bengaluru, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="pt-6 border-t border-slate-850">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Connect with me</p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/prajwalkumar19/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/60 text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 border border-slate-800/50 transition-all duration-300 shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/Prajwalkumar-1906" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/60 text-slate-300 hover:bg-slate-900/10 hover:text-white border border-slate-800/50 transition-all duration-300 shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 p-6 md:p-8 rounded-2xl bg-[#0b0f19]/50 border border-slate-800/60 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0f172a] border ${errors.name ? 'border-rose-500' : 'border-slate-800/60'} text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                  Your Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0f172a] border ${errors.email ? 'border-rose-500' : 'border-slate-800/60'} text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Prajwalkumar, I would love to connect..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#0f172a] border ${errors.message ? 'border-rose-500' : 'border-slate-800/60'} text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm resize-none`}
                />
                {errors.message && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.message}</p>}
              </div>

              {/* Submit Status Banner */}
              {status === 'success' && (
                <p className="text-sm font-bold text-green-400 bg-green-500/5 border border-green-500/10 p-3.5 rounded-xl">
                  {FORMSPREE_KEY ? 'Thank you! Your message has been sent.' : 'Redirecting to your mail client to send email...'}
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-bold text-rose-450 bg-rose-500/5 border border-rose-500/10 p-3.5 rounded-xl">
                  Something went wrong. Please email directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {status === 'sending' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
