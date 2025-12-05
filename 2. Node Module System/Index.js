// The Node.js module system is an architecture that enables developers to organize code into reusable, self-contained units (modules) and manage dependencies efficiently. This system allows developers to export functionality from one file and import it into another, preventing variable conflicts and promoting a modular, scalable approach to application development.
// 1. CommonJS (CJS)
// 2. ECMAScript Modules (ESM)
const firstModule = require('./firstModule');
console.log(firstModule.divide(80, 40));
try {
  console.log('Trying to execute the calc...');
  console.log(firstModule.divide(1, 2));
} catch (error) {
  console.log('Something is wrong:', error.message);
}

// // Module wrapper
// (
//   function (exports, require, module, __filename, __dirname) {
//     // 
    
//   }
// )
