/**
 * Safely reads a value from browser localStorage when storage is available.
 *
 * @param key - The storage key to read.
 * @returns The stored value, or null when unavailable.
 */
export const readStorage = (key: string): null | string => {
  try {
    return typeof window === 'undefined'
      ? null
      : globalThis.localStorage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * Safely writes a value to browser localStorage.
 *
 * @param key - The storage key to write.
 * @param value - The value to store.
 * @returns Whether the write succeeded.
 */
export const writeStorage = (key: string, value: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    globalThis.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely removes a value from browser localStorage.
 *
 * @param key - The storage key to remove.
 * @returns Whether the removal succeeded.
 */
export const removeStorage = (key: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    globalThis.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
