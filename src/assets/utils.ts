export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
