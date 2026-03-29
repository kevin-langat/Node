const sum = (a, b) => {
  return a + b;
};
function subtract(a, b) {
  return a / b;
}
function divide(a, b) {
  if (b === 0) {
    throw new Error('Dividing this number by 0 is infinite');
  }
  return a / b;
}
module.exports = {
  sum,
  subtract,
  divide,
};
