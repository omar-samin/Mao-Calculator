
import React from 'react';

interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-600/30">
      <div className="text-right">
        {/* Main display line */}
        <div className="text-4xl font-mono text-white min-h-[3rem] flex items-center justify-end overflow-hidden">
          {value}
        </div>
      </div>
    </div>
  );
};
