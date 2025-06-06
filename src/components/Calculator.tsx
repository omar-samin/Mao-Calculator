
import React, { useState, useEffect } from 'react';
import { Display } from './Display';
import { StandardButtons } from './StandardButtons';
import { ScientificButtons } from './ScientificButtons';
import { Calculator as CalculatorIcon } from 'lucide-react';

export type CalculatorMode = 'standard' | 'scientific';

export const Calculator = () => {
  const [mode, setMode] = useState<CalculatorMode>('standard');
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Format number with thousand separators
  const formatNumber = (num: string): string => {
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // Remove formatting for calculations
  const unformatNumber = (formattedNum: string): string => {
    return formattedNum.replace(/,/g, '');
  };

  // Fix floating point precision issues
  const preciseCalculate = (firstValue: number, secondValue: number, operation: string): number => {
    let result: number;
    switch (operation) {
      case '+':
        result = firstValue + secondValue;
        break;
      case '-':
        result = firstValue - secondValue;
        break;
      case '×':
        result = firstValue * secondValue;
        break;
      case '÷':
        result = secondValue !== 0 ? firstValue / secondValue : firstValue;
        break;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
    
    // Fix floating point precision by rounding to 10 decimal places
    return Number(result.toFixed(10));
  };

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Prevent default behavior for calculator keys
      if (/[0-9+\-*/=.c%]|Enter|Escape|Backspace/.test(key)) {
        event.preventDefault();
      }

      // Visual feedback for keyboard input
      let buttonKey = key;
      if (key === '*') buttonKey = '×';
      if (key === '/') buttonKey = '÷';
      if (key === 'Enter') buttonKey = '=';
      if (key === 'Escape' || key.toLowerCase() === 'c') buttonKey = 'C';
      if (key === 'Backspace') buttonKey = 'CE';

      setActiveButton(buttonKey);
      setTimeout(() => setActiveButton(null), 150);

      // Handle number inputs
      if (/[0-9]/.test(key)) {
        inputNumber(key);
      }
      
      // Handle decimal point
      else if (key === '.') {
        inputNumber('.');
      }
      
      // Handle percentage
      else if (key === '%') {
        percentage();
      }
      
      // Handle operators
      else if (key === '+') {
        inputOperator('+');
      }
      else if (key === '-') {
        inputOperator('-');
      }
      else if (key === '*') {
        inputOperator('×');
      }
      else if (key === '/') {
        inputOperator('÷');
      }
      
      // Handle equals
      else if (key === '=' || key === 'Enter') {
        performCalculation();
      }
      
      // Handle clear
      else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clear();
      }
      
      // Handle backspace (clear entry)
      else if (key === 'Backspace') {
        clearEntry();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, previousValue, operation, waitingForOperand]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      const unformattedDisplay = unformatNumber(display);
      const newDisplay = unformattedDisplay === '0' ? num : unformattedDisplay + num;
      setDisplay(formatNumber(newDisplay));
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(unformatNumber(display));

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = preciseCalculate(currentValue, inputValue, operation);

      setDisplay(formatNumber(String(newValue)));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(unformatNumber(display));

    if (previousValue !== null && operation) {
      const newValue = preciseCalculate(previousValue, inputValue, operation);
      setDisplay(formatNumber(String(newValue)));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const percentage = () => {
    const value = parseFloat(unformatNumber(display));
    const result = value / 100;
    setDisplay(formatNumber(String(result)));
    setWaitingForOperand(true);
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const scientificFunction = (func: string) => {
    const value = parseFloat(unformatNumber(display));
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = value;
    }

    setDisplay(formatNumber(String(result)));
    setWaitingForOperand(true);
  };

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
