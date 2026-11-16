import { useEffect, useState } from "react";

// Like useState, but the value is saved to / restored from browser storage
// (localStorage by default; pass sessionStorage for per-tab data).
// It also listens for changes made in OTHER browser tabs, so an admin tab
// sees new customer orders without a refresh.
export default function useLocalStorage(key, initialValue, storage = localStorage) {
  const [value, setValue] = useState(() => {
    try {
      const saved = storage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable or full: ignore, app still works in memory
    }
  }, [key, value, storage]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        // ignore malformed data
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [value, setValue];
}
