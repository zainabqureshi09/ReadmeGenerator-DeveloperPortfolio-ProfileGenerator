"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, X, Download, Copy, RefreshCw, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  actions: {
    label: string;
    icon: any;
    onClick: () => void;
    shortcut?: string;
  }[];
}

export const CommandPalette = ({ isOpen, onClose, actions }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // Logic handled in parent, but good to have
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredActions = actions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
              <Search size={20} className="text-zinc-500" />
              <input
                autoFocus
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="px-1.5 py-0.5 rounded border border-zinc-800 text-[10px] text-zinc-500 font-mono">
                ESC
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                <div className="space-y-1">
                  {filteredActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        action.onClick();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-800 group transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-blue-400 transition-colors">
                          <action.icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                          {action.label}
                        </span>
                      </div>
                      {action.shortcut && (
                        <div className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 font-mono">
                          {action.shortcut}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-zinc-500">No results found for "{query}"</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-zinc-950/50 border-t border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Protocol Active</span>
                </div>
              </div>
              <div className="text-[10px] text-zinc-600 font-mono">
                GITHUB_PERSONA_OS_v1.0.4
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
