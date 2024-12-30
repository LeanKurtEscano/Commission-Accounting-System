
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
  