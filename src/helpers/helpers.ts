type GroupedData = {
  primitives: Record<string, any>;
  arrayStrings: Record<string, any>;
  arrayObjects: Record<string, any>;
  objects: Record<string, any>;
};

export const groupDataByType = (data: Record<string, any>): GroupedData => {
  const grouped = Object.entries(data).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        if (typeof value[0] === 'string') {
          acc.arrayStrings[key] = value;
        } else if (typeof value[0] === 'object') {
          acc.arrayObjects[key] = value;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      acc.objects[key] = value;
    } else {
      acc.primitives[key] = value;
    }
    return acc;
  }, {
    primitives: {},
    arrayStrings: {},
    arrayObjects: {},
    objects: {}
  } as GroupedData);

  // Sort primitives: numbers first, then strings by length ascending
  const sortedPrimitives = Object.entries(grouped.primitives)
    .sort(([, a], [, b]) => {
      const aIsNumber = typeof a === 'number';
      const bIsNumber = typeof b === 'number';
      
      // If both are numbers or both are not numbers, sort normally
      if (aIsNumber === bIsNumber) {
        if (aIsNumber) return a - b; // Sort numbers ascending
        return String(a).length - String(b).length; // Sort strings by length ascending
      }
      
      // Numbers come before non-numbers
      return aIsNumber ? -1 : 1;
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);

  return {
    ...grouped,
    primitives: sortedPrimitives
  };
}; 