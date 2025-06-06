
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
