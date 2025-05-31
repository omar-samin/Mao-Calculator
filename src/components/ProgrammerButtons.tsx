
import React from 'react';
import { Button } from './Button';

interface ProgrammerButtonsProps {
  onNumber: (num: string) => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onFunction: (func: string) => void;
}

export const ProgrammerButtons: React.FC<ProgrammerButtonsProps> = ({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onFunction,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Number System Row */}
      <Button onClick={() => onFunction('HEX')} variant="function" className="text-xs">
        HEX
      </Button>
      <Button onClick={() => onFunction('DEC')} variant="function" className="text-xs">
        DEC
      </Button>
      <Button onClick={() => onFunction('OCT')} variant="function" className="text-xs">
        OCT
      </Button>
      <Button onClick={() => onFunction('BIN')} variant="function" className="text-xs">
        BIN
      </Button>

      {/* First Row */}
      <Button onClick={onClear} variant="secondary">
        C
      </Button>
      <Button onClick={onClearEntry} variant="secondary">
        CE
      </Button>
      <Button onClick={() => onFunction('AND')} variant="function" className="text-xs">
        AND
      </Button>
      <Button onClick={() => onOperator('÷')} variant="operator">
        ÷
      </Button>

      {/* Hex Letters */}
      <Button onClick={() => onNumber('A')} variant="number" className="text-blue-300">
        A
      </Button>
      <Button onClick={() => onNumber('B')} variant="number" className="text-blue-300">
        B
      </Button>
      <Button onClick={() => onFunction('OR')} variant="function" className="text-xs">
        OR
      </Button>
      <Button onClick={() => onOperator('×')} variant="operator">
        ×
      </Button>

      {/* More Hex Letters */}
      <Button onClick={() => onNumber('C')} variant="number" className="text-blue-300">
        C
      </Button>
      <Button onClick={() => onNumber('D')} variant="number" className="text-blue-300">
        D
      </Button>
      <Button onClick={() => onFunction('XOR')} variant="function" className="text-xs">
        XOR
      </Button>
      <Button onClick={() => onOperator('-')} variant="operator">
        -
      </Button>

      {/* Hex Letters */}
      <Button onClick={() => onNumber('E')} variant="number" className="text-blue-300">
        E
      </Button>
      <Button onClick={() => onNumber('F')} variant="number" className="text-blue-300">
        F
      </Button>
      <Button onClick={() => onFunction('NOT')} variant="function" className="text-xs">
        NOT
      </Button>
      <Button onClick={() => onOperator('+')} variant="operator">
        +
      </Button>

      {/* Numbers */}
      <Button onClick={() => onNumber('7')} variant="number">
        7
      </Button>
      <Button onClick={() => onNumber('8')} variant="number">
        8
      </Button>
      <Button onClick={() => onNumber('9')} variant="number">
        9
      </Button>
      <Button onClick={onEquals} variant="equals" className="row-span-3">
        =
      </Button>

      <Button onClick={() => onNumber('4')} variant="number">
        4
      </Button>
      <Button onClick={() => onNumber('5')} variant="number">
        5
      </Button>
      <Button onClick={() => onNumber('6')} variant="number">
        6
      </Button>

      <Button onClick={() => onNumber('1')} variant="number">
        1
      </Button>
      <Button onClick={() => onNumber('2')} variant="number">
        2
      </Button>
      <Button onClick={() => onNumber('3')} variant="number">
        3
      </Button>

      <Button onClick={() => onNumber('0')} variant="number" className="col-span-3">
        0
      </Button>
    </div>
  );
};
