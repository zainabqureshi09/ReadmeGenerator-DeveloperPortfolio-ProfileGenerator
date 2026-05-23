import React from 'react';
import { motion } from 'framer-motion';
import { PersonaProfile } from '@/types';
import { Shield, Zap, Target, Award, Cpu, Flame, Ghost } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DevCardProps {
  profile: PersonaProfile;
}

export const DevCard = ({ profile }: DevCardProps) => {
  const { userData, personaName, tagline, strengths, auraScore, archetype } = profile;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      
      <div className="relative h-full bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        {/* Card Header */}
        <div className="px-6 py-4 flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white tracking-tight">{userData.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-bold uppercase tracking-widest border border-blue-500/30">
                LVL {userData.experienceLevel.toUpperCase()}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">ID: {userData.username}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {auraScore}
            </div>
            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">Aura Score</div>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-6 flex-1 flex flex-col justify-center gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Archetype</div>
            <div className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Target size={14} className="text-blue-500" />
              {archetype}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {strengths.slice(0, 3).map((strength, i) => (
              <div key={i} className="p-2 bg-zinc-900/50 border border-white/5 rounded-lg flex flex-col gap-1">
                <Shield size={12} className="text-zinc-500" />
                <span className="text-[8px] font-bold text-zinc-400 leading-tight">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 bg-zinc-900/50 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{userData.role}</span>
          </div>
          <div className="flex items-center gap-2">
            {userData.vibe === 'hacker' && <Ghost size={14} className="text-purple-500" />}
            {userData.vibe === 'startup' && <Zap size={14} className="text-yellow-500" />}
            {userData.vibe === 'savage' && <Flame size={14} className="text-red-500" />}
            <span className="text-[10px] font-black italic text-zinc-600">PROTO_OS_v1.0</span>
          </div>
        </div>

        {/* Decorative scanline */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] z-10 opacity-20" />
      </div>
    </div>
  );
};
