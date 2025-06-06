
import { useState } from 'react';
import { formatNumber, unformatNumber, preciseCalculate } from '@/utils/calculatorUtils';

export const useCalculatorState = () => {
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

  return {
    display,
    memory,
    inputNumber,
    inputOperator,
    performCalculation,
    percentage,
    clear,
    clearEntry,
    scientificFunction,
  };
};
