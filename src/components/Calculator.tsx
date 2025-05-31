
import React, { useState } from 'react';
import { Display } from './Display';
import { StandardButtons } from './StandardButtons';
import { ScientificButtons } from './ScientificButtons';
import { ProgrammerButtons } from './ProgrammerButtons';
import { Calculator as CalculatorIcon } from 'lucide-react';

export type CalculatorMode = 'standard' | 'scientific' | 'programmer';

export const Calculator = () => {
  const [mode, setMode] = useState<CalculatorMode>('standard');
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : firstValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
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
    const value = parseFloat(display);
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

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const programmerFunction = (func: string) => {
    const value = parseInt(display, 10);
    let result: string;

    switch (func) {
      case 'HEX':
        result = value.toString(16).toUpperCase();
        break;
      case 'DEC':
        result = value.toString(10);
        break;
      case 'OCT':
        result = value.toString(8);
        break;
      case 'BIN':
        result = value.toString(2);
        break;
      case 'AND':
      case 'OR':
      case 'XOR':
        // For bitwise operations, we need two operands
        inputOperator(func);
        return;
      case 'NOT':
        result = (~value).toString();
        break;
      default:
        result = display;
    }

    setDisplay(result);
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
          {(['standard', 'scientific', 'programmer'] as CalculatorMode[]).map((modeOption) => (
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
            />
          )}
          {mode === 'programmer' && (
            <ProgrammerButtons
              onNumber={inputNumber}
              onOperator={inputOperator}
              onEquals={performCalculation}
              onClear={clear}
              onClearEntry={clearEntry}
              onFunction={programmerFunction}
            />
          )}
        </div>
      </div>
    </div>
  );
};
