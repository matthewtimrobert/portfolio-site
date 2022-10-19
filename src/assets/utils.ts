import { useEffect, useState } from "react";

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
