
export type CalculatorMode = 'standard' | 'scientific';

export interface CalculatorState {
  display: string;
  expression: string;
  result: string;
  waitingForOperand: boolean;
  memory: number;
  lastOperation: string | null;
}

export type OperatorType = '+' | '-' | '×' | '÷' | '=' | '%';
export type FunctionType = 'sin' | 'cos' | 'tan' | 'log' | 'ln' | 'sqrt' | 'x²' | '1/x' | 'π' | 'e';
