
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

