async function example() {
  console.log('This is the first message');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(
    'This is the last message after the awaiting promise to be resolved'
  );
}
example();

async function divide(numOne, numTwo) {
  try {
    if (numTwo === 0) {
      throw new Error('Cannot divide the number by 0');
    } else {
      console.log('The answer is', numOne / numTwo);
    }
  } catch (error) {
    console.log('An  error occured:', error);
  }
}
async function mainFn() {
  await divide(6, 2);
  console.log(await divide(5, 0));
}
mainFn();
