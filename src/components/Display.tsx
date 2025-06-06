
import React from 'react';

interface DisplayProps {
  value: string;
  expression?: string;
  result?: string;
}

export const Display: React.FC<DisplayProps> = ({ value, expression, result }) => {
  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-600/30">
      <div className="text-right">
        {/* Expression line */}
        {expression && (
          <div className="text-lg font-mono text-slate-400 min-h-[1.5rem] flex items-center justify-end overflow-hidden mb-2">
            {expression}
          </div>
        )}
        
        {/* Main display line */}
        <div className="text-4xl font-mono text-white min-h-[3rem] flex items-center justify-end overflow-hidden">
          {value}
        </div>
        
        {/* Result preview line */}
        {result && result !== value && (
          <div className="text-lg font-mono text-slate-500 min-h-[1.5rem] flex items-center justify-end overflow-hidden mt-2">
            = {result}
          </div>
        )}
      </div>
    </div>
  );
};
