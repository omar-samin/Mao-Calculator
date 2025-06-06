
import { useState } from 'react';
import { formatNumber, unformatNumber, evaluateExpression } from '@/utils/calculatorUtils';

export const useCalculatorState = () => {
  const [expression, setExpression] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputNumber = (num: string) => {
    setShowResult(false);
    
    if (expression === '' || expression === '0') {
      setExpression(num);
    } else {
      setExpression(prev => prev + num);
    }
  };

  const inputDecimal = () => {
    setShowResult(false);
    
    // Get the last number in the expression to check if it already has a decimal
    const parts = expression.split(/[+\-×÷]/);
    const lastPart = parts[parts.length - 1].trim();
    
    if (lastPart.includes('.')) return; // Already has decimal
    
    if (expression === '' || expression === '0') {
      setExpression('0.');
    } else if (/[+\-×÷]\s*$/.test(expression)) {
      // If last character is an operator, add "0."
      setExpression(prev => prev + '0.');
    } else {
      setExpression(prev => prev + '.');
    }
  };

  const inputOperator = (operator: string) => {
    setShowResult(false);
    
    if (expression === '' || expression === '0') {
      setExpression('0 ' + operator + ' ');
    } else {
      // Replace the last operator if the expression ends with one
      const trimmed = expression.trim();
      if (/[+\-×÷]$/.test(trimmed)) {
        setExpression(trimmed.slice(0, -1) + operator + ' ');
      } else {
        setExpression(prev => prev + ' ' + operator + ' ');
      }
    }
  };

  const performCalculation = () => {
    if (!expression || expression.trim() === '') return;
    
    try {
      const result = evaluateExpression(expression);
      setExpression(result.toString());
      setShowResult(true);
    } catch (error) {
      setExpression('Error');
      setShowResult(true);
    }
  };

  const clear = () => {
    setExpression('');
    setShowResult(false);
  };

  const clearEntry = () => {
    // Remove the last entered number or operator
    const trimmed = expression.trim();
    if (trimmed === '') return;
    
    // If we're showing a result, clear everything
    if (showResult) {
      clear();
      return;
    }
    
    // Remove last character or number/operator group
    if (/[+\-×÷]\s*$/.test(trimmed)) {
      // Remove operator and trailing space
      const newExpression = trimmed.replace(/\s*[+\-×÷]\s*$/, '');
      setExpression(newExpression);
    } else {
      // Remove last number character by character
      setExpression(prev => prev.slice(0, -1));
    }
  };

  const scientificFunction = (func: string) => {
    const currentValue = expression || '0';
    let value: number;
    
    try {
      value = parseFloat(unformatNumber(currentValue));
    } catch {
      value = 0;
    }
    
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

    const formattedResult = formatNumber(result.toString());
    setExpression(formattedResult);
    setShowResult(true);
  };

  return {
    expression,
    showResult,
    memory,
    inputNumber,
    inputDecimal,
    inputOperator,
    performCalculation,
    clear,
    clearEntry,
    scientificFunction,
  };
};
