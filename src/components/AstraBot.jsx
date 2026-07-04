import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiMic, FiVolume2, FiVolumeX, FiSend, FiCpu } from 'react-icons/fi';

const KNOWLEDGE_BASE = {
  welcome: "Hi! I am Astra, Prajwalkumar's AI assistant. You can type your questions or click the microphone icon to speak to me. Ask me about his projects, skills, experience, or education!",
  experience: "Prajwalkumar was a Web Development Intern at Thiranex Technologies (Remote) in June-July 2026. He built a production-ready portfolio platform achieving a 100 Lighthouse score for accessibility (WCAG) and SEO, utilizing HTML5, CSS Grid, Flexbox, and WAI-ARIA.",
  projects: "He has built several notable projects:\n1. Community Hero: AI-powered civic reporting platform with GPS verification.\n2. Paws Safe: Stray animal safety ecosystem with an admin dashboard.\n3. RRDCH: Responsive clinical hospital platform connected to Firebase Realtime DB.\n4. AstraAI: A utility using JavaScript and generative AI prompts.",
  skills: "His skills include Languages: JavaScript (ES6+), Python, C, SQL. Web Tech: HTML5, CSS3, Node.js, Express.js. Databases: MongoDB, MySQL, Firebase. Core CS & AI: DSA, OOP, REST APIs, Machine Learning, and LLMs. He is also proficient in tools like Gemini, Claude, and Copilot.",
  education: "He is pursuing a B.E. in Computer Science Engineering at Rajarajeswari College of Engineering (VTU), Bengaluru. He expects to graduate in June 2027 and currently holds a CGPA of 7.8/10.",
  contact: "You can email him at madiwalprajwalkumar@gmail.com, call him at +91 7676222500, or view his LinkedIn (prajwalkumar19) and GitHub (Prajwalkumar-1906) profiles.",
  certifications: "His certifications include Oracle Cloud Infrastructure (2025), NVIDIA AI on Jetson Nano, SAP High Tech Industry Frameworks, Python for Data Science (Upgrad), and tiramAI AI Catalyst credentials.",
  achievements: "Key achievements: 2nd place in Tech Pitch for 'SMS Offline Payment Framework', speaking on Kubernetes at SAP Inside Track, Webathon Finalist, and volunteering at the AIXCHANE meetup.",
  fallback: "I can help you with details about Prajwalkumar's experience, projects, skills, education, certifications, and achievements. Try asking about any of those topics!"
};

const SUGGESTIONS = [
  { text: 'Skills?', category: 'skills' },
  { text: 'Internship?', category: 'experience' },
  { text: 'Projects?', category: 'projects' },
  { text: 'Contact info?', category: 'contact' }
];

export default function AstraBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: KNOWLEDGE_BASE.welcome, time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          handleUserQuery(transcript);
        }
      };
      recognitionRef.current = rec;
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice output using SpeechSynthesis
  const speakText = (text) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    // Cancel ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    
    // Try to pick a clean standard voice
    const voices = window.speechSynthesis.getVoices();
    const cleanVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural')));
    if (cleanVoice) {
      utterance.voice = cleanVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const processQuery = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('experience') || q.includes('intern') || q.includes('thiranex') || q.includes('job') || q.includes('work')) {
      return KNOWLEDGE_BASE.experience;
    }
    if (q.includes('project') || q.includes('build') || q.includes('portfolio') || q.includes('app') || q.includes('system')) {
      return KNOWLEDGE_BASE.projects;
    }
    if (q.includes('skill') || q.includes('languages') || q.includes('program') || q.includes('python') || q.includes('javascript') || q.includes('sql') || q.includes('code') || q.includes('tech')) {
      return KNOWLEDGE_BASE.skills;
    }
    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('vtu') || q.includes('cgpa') || q.includes('degree') || q.includes('school')) {
      return KNOWLEDGE_BASE.education;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('address') || q.includes('linkedin') || q.includes('github') || q.includes('reach')) {
      return KNOWLEDGE_BASE.contact;
    }
    if (q.includes('certif') || q.includes('oracle') || q.includes('nvidia') || q.includes('sap') || q.includes('credentials')) {
      return KNOWLEDGE_BASE.certifications;
    }
    if (q.includes('achiev') || q.includes('award') || q.includes('pitch') || q.includes('win') || q.includes('speak') || q.includes('kubernetes')) {
      return KNOWLEDGE_BASE.achievements;
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greet') || q.includes('who are you') || q.includes('name')) {
      return KNOWLEDGE_BASE.welcome;
    }

    return KNOWLEDGE_BASE.fallback;
  };

  const handleUserQuery = (text) => {
    // Add user message
    const userMsg = { sender: 'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    
    // Process response
    setTimeout(() => {
      const replyText = processQuery(text);
      const botMsg = { sender: 'bot', text: replyText, time: new Date() };
      setMessages(prev => [...prev, botMsg]);
      speakText(replyText);
    }, 500);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleUserQuery(inputValue);
    setInputValue('');
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSuggestionClick = (category) => {
    const textQuery = `Tell me about your ${category}`;
    handleUserQuery(textQuery);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            className="w-[90vw] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl glassmorphism dark:bg-[#0b0f19]/95 bg-white/95 border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-slate-900 text-white dark:bg-[#0f172a] border-b border-slate-200/10">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <FiCpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Astra Assistant</h3>
                  <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                    Online · Voice Enabled
                  </span>
                </div>
              </div>

              {/* Mute and Close controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const newMuted = !isMuted;
                    setIsMuted(newMuted);
                    if (newMuted) window.speechSynthesis.cancel();
                  }}
                  className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute Speech Assistant' : 'Mute Speech Assistant'}
                >
                  {isMuted ? <FiVolumeX className="w-4.5 h-4.5" /> : <FiVolume2 className="w-4.5 h-4.5" />}
                </button>
                <button
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Close Assistant"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/50 dark:border-slate-800/40'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/30">
              {SUGGESTIONS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(chip.category)}
                  className="text-xs px-2.5 py-1 rounded-lg border border-slate-250 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {chip.text}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-850 flex items-center space-x-2 bg-white dark:bg-[#0b0f19]">
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`p-3 rounded-xl border transition-all duration-200 ${
                    isListening
                      ? 'bg-red-500/15 border-red-500 text-red-500 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-500 hover:bg-blue-500/5'
                  }`}
                  title={isListening ? 'Stop Listening' : 'Speak to Assistant'}
                >
                  <FiMic className="w-4 h-4" />
                </button>
              )}

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030712]"
          title="Open Chat Assistant"
        >
          {/* Pulsing indicator ring */}
          <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping pointer-events-none"></span>
          <FiMessageSquare className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
