export function formatNumberWithCommas(value: number | string): string {
    const number =
      typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  
    if (isNaN(number)) {
      return "Invalid number";
    }
  
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2, // Ensures consistent decimal formatting
      maximumFractionDigits: 2,
    }).format(number);
  }
  