
// Format number with thousand separators
export const formatNumber = (num: string): string => {
  const parts = num.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// Remove formatting for calculations
export const unformatNumber = (formattedNum: string): string => {
  return formattedNum.replace(/,/g, '');
};

// Fix floating point precision issues
export const preciseCalculate = (firstValue: number, secondValue: number, operation: string): number => {
  let result: number;
  switch (operation) {
    case '+':
      result = firstValue + secondValue;
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    case '×':
      result = firstValue * secondValue;
      break;
    case '÷':
      result = secondValue !== 0 ? firstValue / secondValue : firstValue;
      break;
    case '=':
      return secondValue;
    default:
      return secondValue;
  }
  
  // Fix floating point precision by rounding to 10 decimal places
  return Number(result.toFixed(10));
};

// Evaluate mathematical expression with proper precedence
export const evaluateExpression = (expression: string): number => {
  try {
    // Handle percentage operations first
    let processedExpression = expression;
    
    // Convert percentage operations (e.g., "100 - 30%" becomes "100 - (100 * 0.30)")
    processedExpression = processedExpression.replace(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)%/g, (match, base, percent) => {
      const baseNum = parseFloat(base);
      const percentNum = parseFloat(percent);
      const percentageValue = (baseNum * percentNum) / 100;
      return `${baseNum} - ${percentageValue}`;
    });
    
    processedExpression = processedExpression.replace(/(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)%/g, (match, base, percent) => {
      const baseNum = parseFloat(base);
      const percentNum = parseFloat(percent);
      const percentageValue = (baseNum * percentNum) / 100;
      return `${baseNum} + ${percentageValue}`;
    });
    
    // Handle standalone percentages (e.g., "30%" becomes "0.30")
    processedExpression = processedExpression.replace(/(\d+(?:\.\d+)?)%/g, (match, num) => {
      return `${parseFloat(num) / 100}`;
    });
    
    // Replace calculator symbols with standard operators
    processedExpression = processedExpression.replace(/×/g, '*').replace(/÷/g, '/');
    
    // Remove formatting commas
    processedExpression = unformatNumber(processedExpression);
    
    // Use Function constructor for safe evaluation with proper precedence
    const result = new Function('return ' + processedExpression)();
    
    return Number(result.toFixed(10));
  } catch (error) {
    console.error('Expression evaluation error:', error);
    return 0;
  }
};

// Check if expression is complete and can be evaluated
export const canEvaluateExpression = (expression: string): boolean => {
  if (!expression || expression.trim() === '') return false;
  
  // Check for balanced parentheses
  let openParens = 0;
  for (const char of expression) {
    if (char === '(') openParens++;
    if (char === ')') openParens--;
    if (openParens < 0) return false;
  }
  
  // Expression is complete if parentheses are balanced and doesn't end with an operator
  return openParens === 0 && !/[+\-×÷]$/.test(expression.trim());
};

// Format expression for display
export const formatExpressionDisplay = (expression: string): string => {
  return expression.replace(/\*/g, '×').replace(/\//g, '÷');
};
