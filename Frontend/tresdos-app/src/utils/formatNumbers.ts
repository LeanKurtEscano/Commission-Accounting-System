export function formatNumberWithCommas(value: number | string): string {
    const number =
      typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  
    if (isNaN(number)) {
      return "Invalid number";
    }
  
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2,
    }).format(number);
  }
  

export function formatNumberInput(value: string): number | null {
   
    const numericValue = value.replace(/,/g, '');
  
  
    const parsedValue = parseFloat(numericValue);
  
    
    if (isNaN(parsedValue)) return null;
  
   
    return parseFloat(parsedValue.toFixed(2));
  }
  