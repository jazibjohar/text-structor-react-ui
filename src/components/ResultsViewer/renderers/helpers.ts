// Add helper function
export const toTitleCase = (str: string) => {
    return str
      .split(/(?=[A-Z])|[_\s]/) // Split on capital letters, underscores, or spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  