export const arrayOfNumbers = function (first, length) {
  const numbers = [];
  for (let i = first; i < first + length; i++) numbers.push(i);
  return numbers;
};

export const randomFromArray = function (array) {
  const index = Math.floor(Math.random() * array.length);
  const value = array[index];
  return { index, value };
};

export const randomBetweenNumbers = function (min, max) {
  return Math.floor(Math.random() * (min + max + 1) + min);
};

export const getTimestamp = function () {
  return new Date().getTime();
};
