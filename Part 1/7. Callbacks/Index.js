const fs = require('fs');
const path = require('path');

function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function address() {
  console.log('Kenya');
}

person('Kevin Langat', address);

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});
