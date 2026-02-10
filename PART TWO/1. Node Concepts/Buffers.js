const { Buffer } = require('node:buffer');

// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);

// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf2 = Buffer.alloc(10, 1);
console.log(buf2, 'buf2');

// create a buffer from string
const strBuf1 = Buffer.from('Hello World!');
console.log(strBuf1, 'strBuf1');

// create a buffer from array of integers
const bufFromArrOfInt = Buffer.from([1, 2, 3, 4, 5, 6]);
console.log(bufFromArrOfInt, 'bufFromArrOfInt');

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's contents.
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3, 'buf3');

// Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
// are all truncated using `(value & 255)` to fit into the range 0–255.
const buf4 = Buffer.from([257, 257.5, -255, '1']);
console.log(buf4, 'truncated using `(value & 255)');

// Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf5 = Buffer.from('tést', 'latin1');
console.log(buf5, 'Buffer containing the Latin-1');

// we can also write to buffers e.g.
buf1.write('Kevin Langat');
console.log(buf1.toString(), 'After writing to buf1'); //because buf1 only accommodates 10 bytes it cannot accomodate other bytes

// we can also read a single byte from a buffer
console.log(strBuf1[0], 'Reading the 1st byte from a buffer');

// we can also slice a buffer
console.log(strBuf1.slice(0, 4), 'sliced buffer');

// we can add or concat to buffers
const concatBuff = Buffer.concat([buf1, strBuf1]);
console.log(concatBuff, 'concatinated buffer');

// we ca also convert buffer to json
console.log(buf1.toJSON());

// we can also get the length of a buffer
console.log(buf1.length, 'length of buf1');
