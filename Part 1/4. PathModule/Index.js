//provides utilities for working with directory and file paths

const path = require('path');
// use path.dirname to get the absolute path of the directory
console.log('Directory', path.dirname(__filename));
// use path.basename to the name of the file
console.log('File Name', path.basename(__filename));
// we can get the extension name also
console.log('File Extension', path.extname(__filename));

// we can combine multiple path segments into one

const Joinedsegments = path.join('/user', 'admin', 'node', 'concepts');

console.log(Joinedsegments);

// we can also resolve path
const resolvePath = path.resolve('user', 'documents', 'node', 'projects');
console.log('resolve path', resolvePath);

// normalize path
const normalizePath = path.normalize('/user/.documents/../node/projects');

console.log('normalizedPath', normalizePath);
