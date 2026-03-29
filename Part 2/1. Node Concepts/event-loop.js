const fs = require('fs');
const crypto = require('crypto');

console.log('1. Script start');

setTimeout(() => {
  console.log('2. setTimeout 0s callback(macrotask)');
}, 0);

setTimeout(() => {
  console.log('3. setTimeout 0s callback(macrotask)');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate callback (check)');
});

Promise.resolve().then(() => {
  console.log('5. Promise resolved (microtask)');
});
crypto.pbkdf2('secret', 'salt', 2000, 64, 'sha512', (err, key) => {
  if (err) throw err;

  console.log('6. pbkdf2 operation done(CPU Intensive task)');
});

process.nextTick(() => {
  console.log('7. process.nextTick callback(microtask');
});

fs.readFile(__filename, () => {
  console.log('8. file read operation (I/O callback');
});

console.log('9. script ends');
