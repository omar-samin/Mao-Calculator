
import { useEffect } from 'react';

interface UseKeyboardInputProps {
  inputNumber: (num: string) => void;
  inputDecimal: () => void;
  inputOperator: (operator: string) => void;
  performCalculation: () => void;
  clear: () => void;
  clearEntry: () => void;
  setActiveButton: (button: string | null) => void;
}

export const useKeyboardInput = ({
  inputNumber,
  inputDecimal,
  inputOperator,
  performCalculation,
  clear,
  clearEntry,
  setActiveButton,
}: UseKeyboardInputProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Prevent default behavior for calculator keys
      if (/[0-9+\-*/=.c]|Enter|Escape|Backspace/.test(key)) {
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
        inputDecimal();
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

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputNumber, inputDecimal, inputOperator, performCalculation, clear, clearEntry, setActiveButton]);
};
