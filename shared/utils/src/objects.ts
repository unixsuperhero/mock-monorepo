/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;

  const source = sources.shift();
  if (!source) return target;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        (target as any)[key] = deepMerge({} as any, targetValue, sourceValue);
      } else {
        (target as any)[key] = sourceValue;
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Pick specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific keys from an object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Check if an object is empty
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Get nested property value safely
 */
export function get<T>(obj: unknown, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return (result as T) ?? defaultValue;
}

/**
 * Set nested property value
 */
export function set<T extends object>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current: unknown = obj;

  for (const key of keys) {
    if (
      (current as Record<string, unknown>)[key] === undefined ||
      (current as Record<string, unknown>)[key] === null
    ) {
      (current as Record<string, unknown>)[key] = {};
    }
    current = (current as Record<string, unknown>)[key];
  }

  (current as Record<string, unknown>)[lastKey] = value;
  return obj;
}

/**
 * Convert object keys to camelCase
 */
export function keysToCamelCase<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    const value = obj[key];
    result[camelKey] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? keysToCamelCase(value as Record<string, unknown>)
        : value;
  }
  return result as T;
}

/**
 * Convert object keys to snake_case
 */
export function keysToSnakeCase<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    const value = obj[key];
    result[snakeKey] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? keysToSnakeCase(value as Record<string, unknown>)
        : value;
  }
  return result as T;
}
