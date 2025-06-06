
import React from 'react';
import { evaluateExpression } from '@/utils/calculatorUtils';

interface DisplayProps {
  expression: string;
  showResult: boolean;
}

export const Display: React.FC<DisplayProps> = ({ expression, showResult }) => {
  const getDisplayResult = () => {
    if (!expression || expression === '0') return '';
    
    // Don't show result if expression ends with an operator or is incomplete
    const endsWithOperator = /[+\-×÷]\s*$/.test(expression);
    if (endsWithOperator) return '';
    
    try {
      const result = evaluateExpression(expression);
      return result.toString();
    } catch {
      return '';
    }
  };

  const result = getDisplayResult();

  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-600/30">
      <div className="text-right">
        {/* Expression line */}
        <div className="text-2xl font-mono text-white min-h-[2rem] flex items-center justify-end overflow-hidden">
          {expression || '0'}
        </div>
        
        {/* Result line - only show if there's a valid result and we're not showing final result */}
        {result && !showResult && (
          <div className="text-lg font-mono text-gray-400 min-h-[1.5rem] flex items-center justify-end mt-1">
            = {result}
          </div>
        )}
        
        {/* Final result line - show when equals is pressed */}
        {showResult && result && (
          <div className="text-3xl font-mono text-white min-h-[2.5rem] flex items-center justify-end mt-2 border-t border-slate-600/30 pt-2">
            = {result}
          </div>
        )}
      </div>
    </div>
  );
};
