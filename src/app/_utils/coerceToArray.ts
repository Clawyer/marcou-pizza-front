export const coerceToArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];
