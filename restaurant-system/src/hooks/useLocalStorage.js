import { useEffect, useState } from "react";

// Like useState, but the value is saved to / restored from localStorage.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable or full: ignore, app still works in memory
    }
  }, [key, value]);

  return [value, setValue];
}
