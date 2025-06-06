
import React from 'react';
import { Button } from './Button';

interface ScientificButtonsProps {
  onNumber: (num: string) => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onFunction: (func: string) => void;
  onPercentage: () => void;
  activeButton?: string | null;
}

export const ScientificButtons: React.FC<ScientificButtonsProps> = ({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onFunction,
  onPercentage,
  activeButton,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {/* First Row */}
      <Button onClick={onClear} variant="secondary" isActive={activeButton === 'C'}>
        C
      </Button>
      <Button onClick={onClearEntry} variant="secondary" isActive={activeButton === 'CE'}>
        CE
      </Button>
      <Button onClick={() => onFunction('x²')} variant="function">
        x²
      </Button>
      <Button onClick={() => onFunction('sqrt')} variant="function">
        √
      </Button>
      <Button onClick={() => onOperator('÷')} variant="operator" isActive={activeButton === '÷'}>
        ÷
      </Button>

      {/* Second Row */}
      <Button onClick={() => onFunction('sin')} variant="function">
        sin
      </Button>
      <Button onClick={() => onFunction('cos')} variant="function">
        cos
      </Button>
      <Button onClick={() => onFunction('tan')} variant="function">
        tan
      </Button>
      <Button onClick={() => onFunction('log')} variant="function">
        log
      </Button>
      <Button onClick={() => onOperator('×')} variant="operator" isActive={activeButton === '×'}>
        ×
      </Button>

      {/* Third Row */}
      <Button onClick={() => onNumber('7')} variant="number" isActive={activeButton === '7'}>
        7
      </Button>
      <Button onClick={() => onNumber('8')} variant="number" isActive={activeButton === '8'}>
        8
      </Button>
      <Button onClick={() => onNumber('9')} variant="number" isActive={activeButton === '9'}>
        9
      </Button>
      <Button onClick={() => onFunction('ln')} variant="function">
        ln
      </Button>
      <Button onClick={() => onOperator('-')} variant="operator" isActive={activeButton === '-'}>
        -
      </Button>

      {/* Fourth Row */}
      <Button onClick={() => onNumber('4')} variant="number" isActive={activeButton === '4'}>
        4
      </Button>
      <Button onClick={() => onNumber('5')} variant="number" isActive={activeButton === '5'}>
        5
      </Button>
      <Button onClick={() => onNumber('6')} variant="number" isActive={activeButton === '6'}>
        6
      </Button>
      <Button onClick={() => onFunction('1/x')} variant="function">
        1/x
      </Button>
      <Button onClick={() => onOperator('+')} variant="operator" isActive={activeButton === '+'}>
        +
      </Button>

      {/* Fifth Row */}
      <Button onClick={() => onNumber('1')} variant="number" isActive={activeButton === '1'}>
        1
      </Button>
      <Button onClick={() => onNumber('2')} variant="number" isActive={activeButton === '2'}>
        2
      </Button>
      <Button onClick={() => onNumber('3')} variant="number" isActive={activeButton === '3'}>
        3
      </Button>
      <Button onClick={() => onFunction('π')} variant="function">
        π
      </Button>
      <Button onClick={onEquals} variant="equals" className="row-span-2" isActive={activeButton === '='}>
        =
      </Button>

      {/* Sixth Row */}
      <Button onClick={() => onNumber('0')} variant="number" className="col-span-2" isActive={activeButton === '0'}>
        0
      </Button>
      <Button onClick={() => onNumber('.')} variant="number" isActive={activeButton === '.'}>
        .
      </Button>
      <Button onClick={onPercentage} variant="function" isActive={activeButton === '%'}>
        %
      </Button>
    </div>
  );
};
