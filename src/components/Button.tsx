
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'function' | 'secondary';
  className?: string;
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'number', 
  className,
  isActive = false
}) => {
  const baseClasses = "h-14 rounded-xl font-semibold text-lg transition-all duration-200 active:scale-95 hover:shadow-lg";
  
  const variantClasses = {
    number: "bg-slate-700/80 hover:bg-slate-600/80 text-white border border-slate-600/50",
    operator: "bg-blue-600/90 hover:bg-blue-500/90 text-white border border-blue-500/50 shadow-blue-500/20",
    equals: "bg-green-600/90 hover:bg-green-500/90 text-white border border-green-500/50 shadow-green-500/20",
    function: "bg-orange-400/80 hover:bg-orange-300/80 text-white border border-orange-300/50 shadow-orange-300/20 text-sm",
    secondary: "bg-red-600/80 hover:bg-red-500/80 text-white border border-red-500/50 shadow-red-500/20"
  };

  const activeClasses = {
    number: "bg-slate-600/90 scale-95",
    operator: "bg-blue-500/90 scale-95",
    equals: "bg-green-500/90 scale-95", 
    function: "bg-orange-300/90 scale-95",
    secondary: "bg-red-500/90 scale-95"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        isActive && activeClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
