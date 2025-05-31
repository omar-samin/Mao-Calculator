
import React from 'react';
import { Button } from './Button';

interface StandardButtonsProps {
  onNumber: (num: string) => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
}

export const StandardButtons: React.FC<StandardButtonsProps> = ({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
}) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* First Row */}
      <Button onClick={onClear} variant="secondary" className="col-span-2">
        C
      </Button>
      <Button onClick={onClearEntry} variant="secondary">
        CE
      </Button>
      <Button onClick={() => onOperator('÷')} variant="operator">
        ÷
      </Button>

      {/* Second Row */}
      <Button onClick={() => onNumber('7')} variant="number">
        7
      </Button>
      <Button onClick={() => onNumber('8')} variant="number">
        8
      </Button>
      <Button onClick={() => onNumber('9')} variant="number">
        9
      </Button>
      <Button onClick={() => onOperator('×')} variant="operator">
        ×
      </Button>

      {/* Third Row */}
      <Button onClick={() => onNumber('4')} variant="number">
        4
      </Button>
      <Button onClick={() => onNumber('5')} variant="number">
        5
      </Button>
      <Button onClick={() => onNumber('6')} variant="number">
        6
      </Button>
      <Button onClick={() => onOperator('-')} variant="operator">
        -
      </Button>

      {/* Fourth Row */}
      <Button onClick={() => onNumber('1')} variant="number">
        1
      </Button>
      <Button onClick={() => onNumber('2')} variant="number">
        2
      </Button>
      <Button onClick={() => onNumber('3')} variant="number">
        3
      </Button>
      <Button onClick={() => onOperator('+')} variant="operator">
        +
      </Button>

      {/* Fifth Row */}
      <Button onClick={() => onNumber('0')} variant="number" className="col-span-2">
        0
      </Button>
      <Button onClick={() => onNumber('.')} variant="number">
        .
      </Button>
      <Button onClick={onEquals} variant="equals">
        =
      </Button>
    </div>
  );
};
