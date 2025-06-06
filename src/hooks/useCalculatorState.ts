
import { useState } from 'react';
import { formatNumber, unformatNumber, evaluateExpression, canEvaluateExpression, formatExpressionDisplay } from '@/utils/calculatorUtils';

export const useCalculatorState = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const updateResult = (expr: string) => {
    if (canEvaluateExpression(expr)) {
      try {
        const calculatedResult = evaluateExpression(expr);
        setResult(formatNumber(calculatedResult.toString()));
      } catch (error) {
        setResult('');
      }
    } else {
      setResult('');
    }
  };

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setExpression(num);
      setWaitingForOperand(false);
    } else {
      const newDisplay = display === '0' ? num : display + num;
      const newExpression = expression + num;
      setDisplay(newDisplay);
      setExpression(newExpression);
    }
    updateResult(expression + num);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setExpression('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      const newDisplay = display + '.';
      const newExpression = expression + '.';
      setDisplay(newDisplay);
      setExpression(newExpression);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const newExpression = expression + ` ${nextOperator} `;
    setExpression(newExpression);
    setDisplay('0');
    setWaitingForOperand(true);
    updateResult(newExpression);
  };

  const inputParenthesis = (paren: string) => {
    let newExpression = expression;
    
    if (paren === '(') {
      if (expression === '' || /[+\-×÷(]$/.test(expression.trim())) {
        newExpression = expression + '(';
      } else {
        newExpression = expression + ' × (';
      }
    } else if (paren === ')') {
      // Only add closing parenthesis if there are unclosed opening ones
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        newExpression = expression + ')';
      }
    }
    
    setExpression(newExpression);
    setDisplay(paren);
    updateResult(newExpression);
  };

  const performCalculation = () => {
    if (expression && canEvaluateExpression(expression)) {
      try {
        const calculatedResult = evaluateExpression(expression);
        const formattedResult = formatNumber(calculatedResult.toString());
        setDisplay(formattedResult);
        setExpression(formattedResult);
        setResult('');
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay('Error');
        setExpression('');
        setResult('');
        setWaitingForOperand(true);
      }
    }
  };

  const percentage = () => {
    if (expression) {
      const newExpression = expression + '%';
      setExpression(newExpression);
      updateResult(newExpression);
    } else if (display !== '0') {
      const value = parseFloat(unformatNumber(display));
      const percentResult = value / 100;
      const formattedResult = formatNumber(percentResult.toString());
      setDisplay(formattedResult);
      setExpression(formattedResult);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setResult('');
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

    const formattedResult = formatNumber(result.toString());
    setDisplay(formattedResult);
    setExpression(formattedResult);
    setWaitingForOperand(true);
  };

  return {
    display,
    expression: formatExpressionDisplay(expression),
    result,
    memory,
    inputNumber,
    inputDecimal,
    inputOperator,
    inputParenthesis,
    performCalculation,
    percentage,
    clear,
    clearEntry,
    scientificFunction,
  };
};
