import React from 'react';
import { UserData, PersonalityVibe, Archetype } from '@/types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Sparkles, Terminal, Rocket, Briefcase, Zap, Cpu, TrendingUp, DollarSign, Ghost, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { ThemeSelector, Theme } from './ThemeSelector';

interface FormProps {
  data: UserData;
  onChange: (data: UserData) => void;
  onGenerate: () => void;
  loading?: boolean;
}

export const Form = ({ data, onChange, onGenerate, loading }: FormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const toggleMode = (key: keyof UserData) => {
    onChange({ ...data, [key as any]: !data[key as any] });
  };

  const vibes: { label: string; value: PersonalityVibe; icon: any }[] = [
    { label: 'Professional', value: 'professional', icon: Briefcase },
    { label: 'Hacker', value: 'hacker', icon: Terminal },
    { label: 'Funny', value: 'funny', icon: Zap },
    { label: 'Savage', value: 'savage', icon: Sparkles },
    { label: 'Founder', value: 'startup', icon: Rocket },
    { label: 'AI Engineer', value: 'ai-engineer', icon: Cpu },
    { label: 'Cyberpunk', value: 'cyberpunk', icon: Ghost },
    { label: 'Minimalist', value: 'minimalist', icon: Minimize2 },
  ];

  const archetypes: Archetype[] = [
    'The Architect',
    'The Rogue Hacker',
    'The Startup Founder',
    'The AI Specialist',
    'The Creative Coder',
    'The Performance Ninja',
  ];

  return (
    <Card title="Identity Protocol" description="Define your digital persona.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Full Name" 
            name="name" 
            placeholder="Jane Dev" 
            value={data.name} 
            onChange={handleChange} 
          />
          <Input 
            label="GitHub Username" 
            name="username" 
            placeholder="janedev" 
            value={data.username} 
            onChange={handleChange} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Current Role" 
            name="role" 
            placeholder="Senior Full Stack Engineer" 
            value={data.role} 
            onChange={handleChange} 
          />
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Experience Level</label>
            <select
              name="experienceLevel"
              value={data.experienceLevel}
              onChange={handleChange as any}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead / Architect</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">The Raw Story (Bio)</label>
          <textarea 
            name="bio"
            rows={2}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
            placeholder="I build high-performance systems and love open source..."
            value={data.bio}
            onChange={handleChange}
          />
        </div>

        <Input 
          label="Skills (comma separated)" 
          name="skills" 
          placeholder="react, next.js, typescript, tailwind, node.js" 
          value={data.skills} 
          onChange={handleChange} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Archetype</label>
            <select
              name="archetype"
              value={data.archetype}
              onChange={handleChange as any}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {archetypes.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Visual Theme</label>
            <ThemeSelector current={(data.theme as Theme) || 'vercel'} onChange={(theme) => onChange({ ...data, theme })} />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Identity Vibe</label>
          <div className="grid grid-cols-4 gap-2">
            {vibes.map((vibe) => {
              const Icon = vibe.icon;
              const isActive = data.vibe === vibe.value;
              return (
                <button
                  key={vibe.value}
                  type="button"
                  onClick={() => onChange({ ...data, vibe: vibe.value })}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-xl border transition-all gap-1",
                    isActive 
                      ? "bg-blue-600/10 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  )}
                >
                  <Icon size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-tight">{vibe.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            type="button"
            onClick={() => toggleMode('isSeniorMode')}
            className={cn(
              "flex flex-col items-center justify-center p-2.5 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-all gap-1.5",
              data.isSeniorMode 
                ? "bg-purple-600/10 border-purple-500/40 text-purple-400" 
                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800"
            )}
          >
            <TrendingUp size={14} />
            Senior Mode
          </button>
          <button
            type="button"
            onClick={() => toggleMode('isInvestorMode')}
            className={cn(
              "flex flex-col items-center justify-center p-2.5 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-all gap-1.5",
              data.isInvestorMode 
                ? "bg-emerald-600/10 border-emerald-500/40 text-emerald-400" 
                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800"
            )}
          >
            <Rocket size={14} />
            Founder Mode
          </button>
          <button
            type="button"
            className={cn(
              "flex flex-col items-center justify-center p-2.5 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-all gap-1.5 bg-red-600/5 border-red-500/20 text-red-500/60 hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10"
            )}
            onClick={() => {
              // This is a special action button, maybe it just triggers a re-generation with specific vibe
              onChange({ ...data, vibe: 'savage' });
            }}
          >
            <Flame size={14} />
            Roast Me
          </button>
        </div>

        <Button 
          className="w-full py-6 rounded-2xl shadow-xl shadow-blue-500/20" 
          size="lg" 
          onClick={onGenerate}
          disabled={loading || !data.name || !data.role}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              COMPILING IDENTITY...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              CRAFT MY PERSONA
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
};
