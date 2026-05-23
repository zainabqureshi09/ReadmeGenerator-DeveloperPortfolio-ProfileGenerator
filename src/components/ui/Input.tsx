import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ className, label, ...props }: InputProps) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm font-medium text-zinc-400 ml-1">{label}</label>}
      <input 
        className={cn(
          "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const Select = ({ className, label, options, ...props }: SelectProps) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm font-medium text-zinc-400 ml-1">{label}</label>}
      <select 
        className={cn(
          "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none",
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
