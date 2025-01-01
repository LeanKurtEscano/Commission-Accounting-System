
export const validateAgentName = (name: string): string | null => {
    // Check if the name consists of only spaces
    if (/^\s*$/.test(name)) {
        return "Agent name cannot be only spaces.";
    }

    // Check if the name is made of the same letter repeated (case-insensitive)
    if (/^([a-zA-Z])\1*$/.test(name)) {
        return "Agent name cannot contain all the same letters.";
    }

    return null;  // Return null if no errors
};

export const validateNumberInput = (value: string): string | null => {
  // Regular expression to match a valid number (allowing for decimals)
  const numberPattern = /^[0-9]+(\.[0-9]{1,2})?$/;

  // Check if the value matches the number pattern
  if (!numberPattern.test(value)) {
    return "Invalid input. Only numbers are allowed, up to two decimal places.";
  }

  // If valid, return null (no error)
  return null;
};


export const validateNumber = (value: any): string => {
   
    
  
    // Check if the value is within the range of 0 to 50
    if (value < 0) {
      return 'Percentage cannot be less than 0';
    }
    if (value > 50) {
      return 'Percentage cannot be greater than 50';
    }
  
    return ''; // If the value is valid, return an empty string (no error)
  };
  