
import { useEffect } from 'react';

interface UseKeyboardInputProps {
  inputNumber: (num: string) => void;
  inputOperator: (operator: string) => void;
  performCalculation: () => void;
  percentage: () => void;
  clear: () => void;
  clearEntry: () => void;
  setActiveButton: (button: string | null) => void;
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

export const useKeyboardInput = ({
  inputNumber,
  inputOperator,
  performCalculation,
  percentage,
  clear,
  clearEntry,
  setActiveButton,
  display,
  previousValue,
  operation,
  waitingForOperand,
}: UseKeyboardInputProps) => {
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
  }, [display, previousValue, operation, waitingForOperand, inputNumber, inputOperator, performCalculation, percentage, clear, clearEntry, setActiveButton]);
};
