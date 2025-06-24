
import { useState, useEffect } from 'react';

export function useLocalStorage<T,>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue);
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = typeof storedValue === 'function' ? (storedValue as (prevState: T) => T)(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”: ', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
