const wrapperExplorer = require('./WrapperExplorer');
console.log('In wrappertest.js file');
console.log('__fileName wrappertest', __filename);
console.log('__dirname wrappertest', __dirname);

wrapperExplorer.greet('Kevin Langat');
console.log(global);
