/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  ExternalLink, 
  Send, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  ChevronRight, 
  Copy, 
  Check, 
  Cloud, 
  Layers, 
  Server, 
  Brain, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { contactInfo, techStack, educationList, workExperience, keyProjects, referencesList } from './data';
import { ChatMessage } from './types';

export default function App() {
  // Navigation & Interactive Tabs
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'projects' | 'education' | 'references'>('experience');
  const [selectedSubRole, setSelectedSubRole] = useState<number>(0);
  
  // Chatbot State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am Riyaad Ryklief's Recruiter AI Assistant. Having spent 8+ years at Amazon Web Services (AWS) supporting Chime, QuickSight, and Connect, Riyaad possesses strong enterprise scaling and applications developer skills. How can I help clarify his competencies or projects today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  
  // Clipboard Alert
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Submit chat queries to server
  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const query = (customText || inputMessage).trim();
    if (!query) return;

    // Reset input
    setInputMessage('');
    setErrorNotice(null);

    // Add user message locally
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Network response returned an error. Please verify the server is active.');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat request failed:", err);
      setErrorNotice("Could not connect with the server. Running matching fallbacks offline.");
      
      // Auto fallback response natively
      setTimeout(() => {
        let fallbackText = "I encountered a transient connection challenge, but I can confidently confirm Riyaad Ryklief's qualifications: He worked at AWS for 8 years, has deep knowledge in telecom, and holds an IT Applied Development Diploma.";
        if (query.toLowerCase().includes('chime')) {
          fallbackText = "Under Amazon Chime, Riyaad resolved voice/video/messaging outages, supported enterprise-scale integrations, and collaborated directly with engineering pipelines.";
        } else if (query.toLowerCase().includes('quicksight') || query.toLowerCase().includes('dashboard')) {
          fallbackText = "With QuickSight, Riyaad supported major BI implementations, resolved complex SPICE data ingestion pipelines, and designed performance data visualizations.";
        } else if (query.toLowerCase().includes('connect') || query.toLowerCase().includes('telecom')) {
          fallbackText = "In Amazon Connect (Telecom), he supported global contact center carriers, phone number portings, provisioning, and monitored high-tier customer SLAs.";
        } else if (query.toLowerCase().includes('idetail')) {
          fallbackText = "His core project is iDETAIL, a three-tier React app connected with Firebase. Check his repository here: https://github.com/RiyaadAWS/iDETAIL";
        } else if (query.toLowerCase().includes('tech stack') || query.toLowerCase().includes('skills')) {
          fallbackText = "Riyaad's tech stack: React, JavaScript, HTML5, CSS3, Node.js, Java, AWS, Git, AI Studio, and v0.";
        } else if (query.toLowerCase().includes('reference')) {
          fallbackText = "His professional AWS references include Naeela Samaai, Tashreeq Jattiem, Jess Kleyn, Rayaan Allie, and Toufeeq Ajouhaar.";
        }

        const assistantMsg: ChatMessage = {
          id: `assistant-fallback-${Date.now()}`,
          role: 'model',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      }, 800);
    } finally {
      setIsTyping(false);
    }
  };

  // Suggestion chips
  const suggestions = [
    { label: "Summarize AWS experience", query: "Can you summarize Riyaad's 8 years at AWS?" },
    { label: "Tell me about Amazon Chime", query: "What did Riyaad do for Amazon Chime support?" },
    { label: "What is his tech stack?", query: "What is Riyaad's core tech stack and frameworks?" },
    { label: "Show his project iDETAIL", query: "Please describe his iDETAIL application and its backend" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Profile Cover Banner */}
      <header className="relative bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 overflow-hidden">
        {/* Abstract AWS Orange Ambient Background Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            
            {/* Left Portion: Profile Avatar and Details */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Professional Initials Avatar Badge and Ring */}
              <div className="relative flex-shrink-0 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-75 blur group-hover:opacity-100 transition duration-300" />
                <div className="relative w-24 h-24 bg-slate-900 rounded-full border-2 border-slate-800 flex items-center justify-center text-amber-500 font-display font-bold text-3xl">
                  RR
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight font-display text-white">Riyaad Ryklief</h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 max-w-max mx-auto sm:mx-0">
                    8 Years AWS Specialist
                  </span>
                </div>
                <p className="text-lg text-slate-300 font-medium mt-1">
                  Technical Support Specialist | Applications Developer
                </p>
                
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-4 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Cape Town, South Africa
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    AWS supported (2017 - 2025)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Portion: Key Contact Buttons with Clipboard Copies */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
                <button 
                  onClick={() => handleCopy(contactInfo.email, 'Email')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-sm text-slate-200 transition"
                  id="btn-copy-email"
                >
                  {copiedText === 'Email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-amber-500" />}
                  <span className="truncate">{copiedText === 'Email' ? 'Copied' : 'Email'}</span>
                </button>

                <button 
                  onClick={() => handleCopy(contactInfo.phones[0], 'Phone')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-sm text-slate-200 transition"
                  id="btn-copy-phone"
                >
                  {copiedText === 'Phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Phone className="w-4 h-4 text-amber-500" />}
                  <span className="truncate">{copiedText === 'Phone' ? 'Copied Contact' : 'Call Me'}</span>
                </button>

                <a 
                  href={contactInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-sm text-slate-200 transition"
                  id="link-linkedin"
                >
                  <Linkedin className="w-4 h-4 text-amber-500" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href={contactInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-sm text-slate-200 transition"
                  id="link-github"
                >
                  <Github className="w-4 h-4 text-amber-500" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Toast/Notification Banner inside local header boundaries */}
              <AnimatePresence>
                {copiedText && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs text-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-1 rounded-md"
                  >
                    Successfully copied {copiedText} to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container Workspace Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Workspace Panel: Interactive Resume Console (7 Cols) */}
        <section className="lg:col-span-7 space-y-6 flex flex-col" id="resume-panel">
          
          {/* Executive Overview Highlight */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-amber-500 to-amber-600" />
            <span className="text-xs font-mono text-amber-500 font-semibold tracking-wider uppercase mb-2 block">Executive Profile</span>
            <p className="text-sm leading-relaxed text-slate-300">
              With 8 years at AWS, I've built extensive expertise in enterprise collaboration and business intelligence platforms, specializing in Amazon Chime, QuickSight, and telecom services. My Computer Science credentials with a focus in Applications Development complements my hands-on AWS experience, where I've delivered comprehensive technical support across all tiers.
            </p>
          </div>

          {/* Interactive Resume Navigation Tabs */}
          <div className="flex border-b border-slate-800 overflow-x-auto whitespace-nowrap bg-slate-900/30 p-1.5 rounded-xl border">
            {(['experience', 'skills', 'projects', 'education', 'references'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Trigger helpful chatbot alert prompting user to learn more
                  if (tab === 'references') {
                    setMessages(prev => [
                      ...prev,
                      {
                        id: `system-prompt-${Date.now()}`,
                        role: 'model',
                        text: "You can find Riyaad's professional AWS & local references listed right here. Would you like to ask me what Naeela or Zubair said about his support metrics?",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }
                }}
                className={`flex-1 min-w-[90px] text-center px-4 py-2.5 rounded-lg text-xs font-semibold tracking-medium transition uppercase font-display ${
                  activeTab === tab 
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                id={`tab-select-${tab}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Views Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              
              {/* EXPERIENCE VIEW */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{workExperience[0].company}</h3>
                        <p className="text-amber-500 font-medium text-sm font-mono mt-0.5">{workExperience[0].role}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-300 font-mono mt-2 sm:mt-0 border border-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {workExperience[0].period}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {workExperience[0].description}
                    </p>

                    {/* AWS Specialties Grid selector */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-1">
                        Select AWS Domain Specialty
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {workExperience[0].subRoles.map((role, idx) => (
                          <button
                            key={role.title}
                            onClick={() => setSelectedSubRole(idx)}
                            className={`px-4 py-3 rounded-xl border text-left transition flex items-center justify-between ${
                              selectedSubRole === idx 
                                ? 'bg-amber-500/10 border-amber-500 text-white' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                            }`}
                            id={`subrole-tab-${idx}`}
                          >
                            <span className="font-semibold text-xs tracking-wide">{role.title}</span>
                            <ChevronRight className={`w-4 h-4 text-amber-500 transition-transform ${selectedSubRole === idx ? 'transform rotate-90' : ''}`} />
                          </button>
                        ))}
                      </div>

                      {/* Display Selected Specialty bullets */}
                      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 mt-4 min-h-[220px] shadow-inner">
                        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                          <span className="text-xs font-mono text-amber-500 font-semibold uppercase">
                            AWS Core Operations: {workExperience[0].subRoles[selectedSubRole].title}
                          </span>
                          <button 
                            onClick={() => handleSendMessage(undefined, `Tell me more about Riyaad's experience with AWS ${workExperience[0].subRoles[selectedSubRole].title}`)}
                            className="text-slate-400 hover:text-amber-500 transition flex items-center gap-1 text-[11px] bg-slate-900 border border-slate-800 px-2 py-1 rounded-md"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Ask Assistant</span>
                          </button>
                        </div>
                        <ul className="space-y-3.5 text-sm text-slate-300">
                          {workExperience[0].subRoles[selectedSubRole].bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2.5 items-start">
                              <span className="text-amber-500 mt-1 flex-shrink-0 text-base">▪</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SKILLS VIEW */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider font-display flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-500" />
                      Technical Stack Matrix
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Frontend Column */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold block mb-3 pb-2 border-b border-slate-800/80 flex items-center justify-between">
                          Frontend
                          <Layers className="w-3.5 h-3.5 text-amber-500" />
                        </span>
                        <div className="space-y-2">
                          {techStack.frontend.map(item => (
                            <div 
                              key={item.name} 
                              onClick={() => handleSendMessage(undefined, `What projects or experience does Riyaad have using ${item.name}?`)}
                              className="group p-2.5 bg-slate-900 rounded-lg hover:border-amber-500 border border-slate-800 cursor-pointer flex justify-between items-center transition"
                            >
                              <span className="text-sm text-slate-200 group-hover:text-amber-500 font-medium">{item.name}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Backend Column */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold block mb-3 pb-2 border-b border-slate-800/80 flex items-center justify-between">
                          Backend
                          <Server className="w-3.5 h-3.5 text-amber-500" />
                        </span>
                        <div className="space-y-2">
                          {techStack.backend.map(item => (
                            <div 
                              key={item.name} 
                              onClick={() => handleSendMessage(undefined, `Can you tell me about Riyaad's experienced backend workflows in ${item.name}?`)}
                              className="group p-2.5 bg-slate-900 rounded-lg hover:border-amber-500 border border-slate-800 cursor-pointer flex justify-between items-center transition"
                            >
                              <span className="text-sm text-slate-200 group-hover:text-amber-500 font-medium">{item.name}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Cloud Column */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold block mb-3 pb-2 border-b border-slate-800/80 flex items-center justify-between">
                          Tools & Cloud
                          <Cloud className="w-3.5 h-3.5 text-amber-500" />
                        </span>
                        <div className="space-y-2">
                          {techStack.toolsCloud.map(item => (
                            <div 
                              key={item.name} 
                              onClick={() => handleSendMessage(undefined, `How has Riyaad integrated ${item.name} in his portfolio development?`)}
                              className="group p-2.5 bg-slate-900 rounded-lg hover:border-amber-500 border border-slate-800 cursor-pointer flex justify-between items-center transition"
                            >
                              <span className="text-sm text-slate-200 group-hover:text-amber-500 font-medium">{item.name}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="mt-5 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-xs text-slate-400">
                      💡 <span className="text-slate-300 font-medium">Interactive Matrix Tip:</span> Clicking on any technology above will send a request to his Recruiter AI Assistant directly in the chat window to clarify how he uses it!
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PROJECTS VIEW */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {keyProjects.map(project => (
                    <div key={project.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute right-0 top-0 bg-amber-500/10 text-amber-500 font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-xl border-l border-b border-amber-500/20">
                        Core Feature Project
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map(tech => (
                          <span key={tech} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition"
                          id="btn-project-link"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Code Repository</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleSendMessage(undefined, `In detail, tell me about Riyaad's ${project.title} project and why he used React & Firebase.`)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
                          id="btn-project-ask"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Ask AI for project deep dive</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* EDUCATION VIEW */}
              {activeTab === 'education' && (
                <motion.div
                  key="education-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider font-display flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-500" />
                      Academic Credentials
                    </h3>

                    <div className="relative border-l-2 border-slate-800 pl-6 ml-2 space-y-6">
                      {educationList.map((edu, idx) => (
                        <div key={idx} className="relative">
                          {/* Circle dot Timeline index */}
                          <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center" />
                          
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {edu.year}
                            </span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-white mt-2 leading-snug">
                            {edu.degree}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">
                            {edu.institution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* REFERENCES VIEW */}
              {activeTab === 'references' && (
                <motion.div
                  key="references-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-amber-500" />
                        Verified References
                      </h3>
                      <span className="text-[10px] font-mono text-amber-500/80 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md">
                        Amazon Web Services
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {referencesList.map((ref, idx) => (
                        <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-slate-700 transition">
                          <p className="text-sm font-bold text-white font-display">{ref.name}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{ref.role}</p>
                          
                          <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-500">Phone Contact:</span>
                            <button
                              onClick={() => handleCopy(ref.phone, ref.name)}
                              className="text-amber-500 hover:underline hover:text-amber-400 transition flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800/65 rounded"
                              title="Copy phone to clipboard"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{ref.phone}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>

        {/* Right Workspace Panel: AI Assistant Chatbot (5 Cols) */}
        <section className="lg:col-span-5 flex flex-col h-[650px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative" id="chat-panel">
          
          <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Chat Window Title Bar */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="absolute right-0 bottom-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                <MessageSquare className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-display">Riyaad's AI Assistant</h2>
                <span className="text-[10px] text-slate-400 font-mono">Confidential Recruiter Screening Mode</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    role: 'model',
                    text: "Hello! Message history has been successfully reset. How can I help verify Riyaad Ryklief's technical skills or AWS background today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
                setErrorNotice(null);
              }}
              className="text-slate-400 hover:text-white transition p-1.5 hover:bg-slate-800 rounded-lg"
              title="Reset Message Thread"
              id="btn-chat-reset"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Thread Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/65 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto items-end' : 'items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5 font-mono px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="px-4 py-3 bg-slate-900 text-slate-200 rounded-2xl rounded-tl-none border border-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips Box */}
          <div className="p-3 bg-slate-900/60 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-2">💡 Interview Suggestion Prompts:</span>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(undefined, s.query)}
                  className="px-2.5 py-1.5 bg-slate-950 border border-slate-850 hover:border-amber-500 hover:text-amber-500 rounded-lg text-left text-[11px] text-slate-300 transition"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offline/Warning indicator fallback banner */}
          {errorNotice && (
            <div className="bg-amber-500/10 border-t border-b border-amber-500/20 text-amber-500 text-[10px] px-4 py-1.5 font-mono flex items-center justify-between">
              <span>⚠️ Offline simulated assistant active.</span>
              <button onClick={() => setErrorNotice(null)} className="underline hover:text-white">dismiss</button>
            </div>
          )}

          {/* Message Input box */}
          <form onSubmit={handleSendMessage} className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me something about Riyaad's AWS career..."
              className="flex-1 bg-slate-950 text-slate-200 border border-slate-800 hover:border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition font-sans"
              disabled={isTyping}
              id="chat-input-field"
            />
            <button
              type="submit"
              disabled={isTyping || !inputMessage.trim()}
              className={`p-2.5 rounded-xl flex items-center justify-center transition ${
                isTyping || !inputMessage.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md font-bold'
              }`}
              id="btn-chat-send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </section>

      </main>

      {/* Footer Design */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© 2026 Riyaad Ryklief. Interactive Portfolio & Recruiter AI. All ground truths strictly guaranteed.</p>
        </div>
      </footer>

    </div>
  );
}
