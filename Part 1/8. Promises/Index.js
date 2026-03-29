function exampleOfPromise(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
console.log('Promise start');
exampleOfPromise(200).then((data) =>
  console.log('After 2 seconds the promise is resolved')
);
console.log('Promise end');

function divide(numOne, numTwo) {
  return new Promise((resolve, reject) => {
    if (numTwo === 0) {
      reject('Cannot divide by 0');
    } else {
      resolve(`The result is ${numOne / numTwo}`);
    }
  });
}
divide(10, 2)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
