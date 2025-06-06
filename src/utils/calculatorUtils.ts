
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
    // Replace calculator symbols with standard operators
    let processedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    
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
