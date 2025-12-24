const lodash = require('lodash');

const names = ['sangam', 'john', 'kevin', 'alex', 'mia'];
const capitalize = lodash.map(names, lodash.capitalize);
console.log(capitalize);
