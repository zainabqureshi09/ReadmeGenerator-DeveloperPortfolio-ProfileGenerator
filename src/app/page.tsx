"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Form } from '@/components/Form';
import { Preview } from '@/components/Preview';
import { UserData, PersonaProfile } from '@/types';
import { Code2, Sparkles, Terminal, Cpu, Globe, Zap, Shield, Rocket, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generatePersona } from '@/lib/generator';

import { CommandPalette } from '@/components/CommandPalette';
import { useClipboard } from '@/hooks/use-clipboard';
import { downloadFile } from '@/lib/utils';

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { copy } = useClipboard();

  const [data, setData] = useState<UserData>({
    name: '',
    username: '',
    bio: '',
    skills: '',
    role: '',
    vibe: 'professional',
    experienceLevel: 'mid',
    archetype: 'The Architect',
    isSeniorMode: false,
    isInvestorMode: false,
  });
  const [profile, setProfile] = useState<PersonaProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const result = generatePersona(data);
      setProfile(result);
      setLoading(false);
      
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#10b981']
      });
      
      if (window.innerWidth < 1024) {
        document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  const commandActions = [
    { label: 'Generate Identity', icon: Sparkles, onClick: handleGenerate, shortcut: 'ENTER' },
    { label: 'Copy README', icon: Copy, onClick: () => profile && copy(profile.readme), shortcut: '⌘C' },
    { label: 'Download README', icon: Download, onClick: () => profile && downloadFile(profile.readme, 'README.md'), shortcut: '⌘D' },
    { label: 'Switch to Hacker Vibe', icon: Terminal, onClick: () => setData(prev => ({ ...prev, vibe: 'hacker' })) },
    { label: 'Switch to Startup Vibe', icon: Rocket, onClick: () => setData(prev => ({ ...prev, vibe: 'startup' })) },
    { label: 'Reset Protocol', icon: RefreshCw, onClick: () => {
      setProfile(null);
      setData({
        name: '', username: '', bio: '', skills: '', role: '', vibe: 'professional',
        experienceLevel: 'mid', archetype: 'The Architect', isSeniorMode: false, isInvestorMode: false
      });
    }},
  ];

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30 font-sans">
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        actions={commandActions}
      />
      {/* OS Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Navigation / Header */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsStarted(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Terminal size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tighter text-xl">Persona<span className="text-blue-500">OS</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              v1.0.4-stable
            </div>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Github size={20} />
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Form 
                data={data} 
                onChange={setData} 
                onGenerate={handleGenerate} 
                loading={loading}
              />
            </motion.div>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-7" id="preview-section">
            <AnimatePresence mode="wait">
              {profile ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                >
                  <Preview profile={profile} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[600px] flex flex-col items-center justify-center text-zinc-700 border border-zinc-900 bg-zinc-900/10 rounded-[2.5rem] relative overflow-hidden group backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    <Cpu size={48} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-500 tracking-tight">System Idle</h3>
                  <p className="text-sm mt-2 opacity-60 max-w-xs text-center">Awaiting identity protocol initialization. Complete the form to deploy your persona.</p>
                  
                  <div className="mt-12 flex gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span>Operational Integrity: 100%</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Neural Link</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Grid Access</a>
          </div>
          <p>© 2026 GitHub Persona OS. No Rights Reserved. Just Ship It.</p>
        </footer>
      </div>
    </main>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Terminal size={22} className="text-white" />
          </div>
          <span className="font-bold tracking-tighter text-2xl">Persona<span className="text-blue-500">OS</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
          <a href="#themes" className="hover:text-white transition-colors">Themes</a>
          <button onClick={onStart} className="px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-blue-400 mb-8"
        >
          <Sparkles size={14} />
          <span>The Future of Developer Identity</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9]"
        >
          Craft Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400">
            Developer Persona
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
        >
          Generate visually stunning GitHub profiles, developer branding assets, and premium README experiences in seconds. No AI tokens required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={onStart}
            className="group px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95"
          >
            Craft My Identity
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-bold transition-all hover:bg-zinc-800">
            Explore Templates
          </button>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 w-full max-w-5xl aspect-video rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="absolute top-0 left-0 w-full h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-6 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            <div className="mx-auto bg-black/40 px-4 py-1 rounded-md text-[10px] font-mono text-zinc-500">
              identity.protocol.local
            </div>
          </div>
          <div className="p-12 flex flex-col items-center justify-center h-full opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="w-full max-w-md h-64 bg-zinc-950 border border-white/5 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">
                <div className="p-6 flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-zinc-800 rounded-md animate-pulse" />
                    <div className="h-3 w-48 bg-zinc-900 rounded-md animate-pulse" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 border border-blue-500/30" />
                </div>
                <div className="px-6 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-zinc-900 rounded-lg animate-pulse" />
                    <div className="h-12 bg-zinc-900 rounded-lg animate-pulse" />
                    <div className="h-12 bg-zinc-900 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-24 bg-zinc-900 rounded-xl animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Smart Skills Engine", 
              desc: "Automatically categorize and visualize your tech stack with high-quality icons and categorized layouts.", 
              icon: Zap, 
              color: "text-blue-500" 
            },
            { 
              title: "Personality Driven", 
              desc: "From 'Professional' to 'Savage', our local logic engine adapts your content to match your exact vibe.", 
              icon: Ghost, 
              color: "text-purple-500" 
            },
            { 
              title: "Export Ready", 
              desc: "Instant Markdown for GitHub, tailored Bios for Twitter/LinkedIn, and stunning identity cards.", 
              icon: Rocket, 
              color: "text-emerald-500" 
            }
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className={`p-4 rounded-2xl bg-zinc-900 mb-6 w-fit group-hover:scale-110 transition-transform ${f.color}`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900 text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Terminal size={16} className="text-zinc-400" />
            </div>
            <span className="font-bold tracking-tighter">Persona<span className="text-blue-500">OS</span></span>
          </div>
          <p className="text-zinc-500 text-sm">Designed for the world's most ambitious developers.</p>
          <div className="flex gap-6">
            <Twitter className="text-zinc-600 hover:text-blue-400 cursor-pointer transition-colors" size={20} />
            <Github className="text-zinc-600 hover:text-white cursor-pointer transition-colors" size={20} />
            <Linkedin className="text-zinc-600 hover:text-blue-600 cursor-pointer transition-colors" size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
}
