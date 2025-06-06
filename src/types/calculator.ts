
export type CalculatorMode = 'standard' | 'scientific';

export interface CalculatorState {
  display: string;
  waitingForOperand: boolean;
  memory: number;
}

export type OperatorType = '+' | '-' | '×' | '÷' | '=';
export type FunctionType = 'sin' | 'cos' | 'tan' | 'log' | 'ln' | 'sqrt' | 'x²' | '1/x' | 'π' | 'e';
