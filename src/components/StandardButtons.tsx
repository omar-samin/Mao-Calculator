
import React from 'react';
import { Button } from './Button';

interface StandardButtonsProps {
  onNumber: (num: string) => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onPercentage: () => void;
  activeButton?: string | null;
}

export const StandardButtons: React.FC<StandardButtonsProps> = ({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onPercentage,
  activeButton,
}) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* First Row */}
      <Button onClick={onClear} variant="secondary" className="col-span-1" isActive={activeButton === 'C'}>
        C
      </Button>
      <Button onClick={onClearEntry} variant="secondary" isActive={activeButton === 'CE'}>
        CE
      </Button>
      <Button onClick={onPercentage} variant="function" isActive={activeButton === '%'}>
        %
      </Button>
      <Button onClick={() => onOperator('÷')} variant="operator" isActive={activeButton === '÷'}>
        ÷
      </Button>

      {/* Second Row */}
      <Button onClick={() => onNumber('7')} variant="number" isActive={activeButton === '7'}>
        7
      </Button>
      <Button onClick={() => onNumber('8')} variant="number" isActive={activeButton === '8'}>
        8
      </Button>
      <Button onClick={() => onNumber('9')} variant="number" isActive={activeButton === '9'}>
        9
      </Button>
      <Button onClick={() => onOperator('×')} variant="operator" isActive={activeButton === '×'}>
        ×
      </Button>

      {/* Third Row */}
      <Button onClick={() => onNumber('4')} variant="number" isActive={activeButton === '4'}>
        4
      </Button>
      <Button onClick={() => onNumber('5')} variant="number" isActive={activeButton === '5'}>
        5
      </Button>
      <Button onClick={() => onNumber('6')} variant="number" isActive={activeButton === '6'}>
        6
      </Button>
      <Button onClick={() => onOperator('-')} variant="operator" isActive={activeButton === '-'}>
        -
      </Button>

      {/* Fourth Row */}
      <Button onClick={() => onNumber('1')} variant="number" isActive={activeButton === '1'}>
        1
      </Button>
      <Button onClick={() => onNumber('2')} variant="number" isActive={activeButton === '2'}>
        2
      </Button>
      <Button onClick={() => onNumber('3')} variant="number" isActive={activeButton === '3'}>
        3
      </Button>
      <Button onClick={() => onOperator('+')} variant="operator" isActive={activeButton === '+'}>
        +
      </Button>

      {/* Fifth Row */}
      <Button onClick={() => onNumber('0')} variant="number" className="col-span-2" isActive={activeButton === '0'}>
        0
      </Button>
      <Button onClick={() => onNumber('.')} variant="number" isActive={activeButton === '.'}>
        .
      </Button>
      <Button onClick={onEquals} variant="equals" isActive={activeButton === '='}>
        =
      </Button>
    </div>
  );
};
