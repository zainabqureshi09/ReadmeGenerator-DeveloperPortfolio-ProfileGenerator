import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Card = ({ children, className, title, description }: CardProps) => {
  return (
    <div className={cn(
      "bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl",
      className
    )}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-semibold text-zinc-100">{title}</h3>}
          {description && <p className="text-sm text-zinc-500 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
