import React from 'react';
import { cn } from '@/lib/utils';

export type Theme = 'vercel' | 'cyberpunk' | 'matrix' | 'minimal' | 'purple';

interface ThemeSelectorProps {
  current: Theme;
  onChange: (theme: Theme) => void;
}

export const ThemeSelector = ({ current, onChange }: ThemeSelectorProps) => {
  const themes: { id: Theme; label: string; colors: string[] }[] = [
    { id: 'vercel', label: 'Vercel', colors: ['#000000', '#ffffff'] },
    { id: 'purple', label: 'Midnight', colors: ['#581c87', '#9333ea'] },
    { id: 'cyberpunk', label: 'Cyber', colors: ['#fde047', '#000000'] },
    { id: 'matrix', label: 'Matrix', colors: ['#052e16', '#22c55e'] },
    { id: 'minimal', label: 'Classic', colors: ['#18181b', '#f4f4f5'] },
  ];

  return (
    <div className="flex gap-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "p-2 rounded-lg transition-all border",
            current === t.id 
              ? "border-blue-500/50 bg-blue-500/10" 
              : "border-transparent hover:border-zinc-700"
          )}
          title={t.label}
        >
          <div className="flex gap-0.5">
            {t.colors.map((c, i) => (
              <div key={i} className="w-2 h-4 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};
