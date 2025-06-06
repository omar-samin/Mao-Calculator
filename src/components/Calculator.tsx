
import React, { useState } from 'react';
import { Display } from './Display';
import { StandardButtons } from './StandardButtons';
import { ScientificButtons } from './ScientificButtons';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { CalculatorMode } from '@/types/calculator';
import { useCalculatorState } from '@/hooks/useCalculatorState';
import { useKeyboardInput } from '@/hooks/useKeyboardInput';

export const Calculator = () => {
  const [mode, setMode] = useState<CalculatorMode>('standard');
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const {
    display,
    memory,
    inputNumber,
    inputOperator,
    performCalculation,
    percentage,
    clear,
    clearEntry,
    scientificFunction,
  } = useCalculatorState();

  useKeyboardInput({
    inputNumber,
    inputOperator,
    performCalculation,
    percentage,
    clear,
    clearEntry,
    setActiveButton,
    display,
    previousValue: null, // These values are managed internally by useCalculatorState
    operation: null,
    waitingForOperand: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-3xl shadow-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <CalculatorIcon className="w-8 h-8 text-blue-400 mr-3" />
          <h1 className="text-2xl font-bold text-white">Calculator</h1>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-700/50 rounded-xl p-1 mb-6">
          {(['standard', 'scientific'] as CalculatorMode[]).map((modeOption) => (
            <button
              key={modeOption}
              onClick={() => setMode(modeOption)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === modeOption
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
              }`}
            >
              {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Display */}
        <Display value={display} />

        {/* Button Grid */}
        <div className="mt-6">
          {mode === 'standard' && (
            <StandardButtons
              onNumber={inputNumber}
              onOperator={inputOperator}
              onEquals={performCalculation}
              onClear={clear}
              onClearEntry={clearEntry}
              onPercentage={percentage}
              activeButton={activeButton}
            />
          )}
          {mode === 'scientific' && (
            <ScientificButtons
              onNumber={inputNumber}
              onOperator={inputOperator}
              onEquals={performCalculation}
              onClear={clear}
              onClearEntry={clearEntry}
              onFunction={scientificFunction}
              onPercentage={percentage}
              activeButton={activeButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};
