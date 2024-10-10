export function removeUndefinedFields<T extends Record<string, any>>(data: T): Partial<T> {
	return Object.keys(data).reduce((acc, key) => {
    const value = (data as any)[key];  // Access dynamic keys
    if (value !== undefined) {
      (acc as any)[key] = value;  // Add key-value to result if it's defined
    }
    return acc;
  }, {} as Partial<T>);
}
