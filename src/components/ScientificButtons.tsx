
import React from 'react';
import { Button } from './Button';

interface ScientificButtonsProps {
  onNumber: (num: string) => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onFunction: (func: string) => void;
}

export const ScientificButtons: React.FC<ScientificButtonsProps> = ({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onFunction,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {/* First Row */}
      <Button onClick={onClear} variant="secondary">
        C
      </Button>
      <Button onClick={onClearEntry} variant="secondary">
        CE
      </Button>
      <Button onClick={() => onFunction('x²')} variant="function">
        x²
      </Button>
      <Button onClick={() => onFunction('sqrt')} variant="function">
        √
      </Button>
      <Button onClick={() => onOperator('÷')} variant="operator">
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
      <Button onClick={() => onOperator('×')} variant="operator">
        ×
      </Button>

      {/* Third Row */}
      <Button onClick={() => onNumber('7')} variant="number">
        7
      </Button>
      <Button onClick={() => onNumber('8')} variant="number">
        8
      </Button>
      <Button onClick={() => onNumber('9')} variant="number">
        9
      </Button>
      <Button onClick={() => onFunction('ln')} variant="function">
        ln
      </Button>
      <Button onClick={() => onOperator('-')} variant="operator">
        -
      </Button>

      {/* Fourth Row */}
      <Button onClick={() => onNumber('4')} variant="number">
        4
      </Button>
      <Button onClick={() => onNumber('5')} variant="number">
        5
      </Button>
      <Button onClick={() => onNumber('6')} variant="number">
        6
      </Button>
      <Button onClick={() => onFunction('1/x')} variant="function">
        1/x
      </Button>
      <Button onClick={() => onOperator('+')} variant="operator">
        +
      </Button>

      {/* Fifth Row */}
      <Button onClick={() => onNumber('1')} variant="number">
        1
      </Button>
      <Button onClick={() => onNumber('2')} variant="number">
        2
      </Button>
      <Button onClick={() => onNumber('3')} variant="number">
        3
      </Button>
      <Button onClick={() => onFunction('π')} variant="function">
        π
      </Button>
      <Button onClick={onEquals} variant="equals" className="row-span-2">
        =
      </Button>

      {/* Sixth Row */}
      <Button onClick={() => onNumber('0')} variant="number" className="col-span-2">
        0
      </Button>
      <Button onClick={() => onNumber('.')} variant="number">
        .
      </Button>
      <Button onClick={() => onFunction('e')} variant="function">
        e
      </Button>
    </div>
  );
};
