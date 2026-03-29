import sum from './sum.js';

console.log('Hello World');

// Using settimeout method

setTimeout(() => {
  console.log('This is the delayed output');
}, 2000);
console.log('This is the last code of sync code');
console.log(sum(2, 3));
