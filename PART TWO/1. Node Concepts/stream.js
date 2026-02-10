// A stream is an abstract interface for working with streaming data in Node.js. The node:stream module provides an API for implementing the stream interface.
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Transform } = require('stream');

class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
    this.push(encrypted);
    callback();
  }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs.createReadStream('input.txt');

// new gzip object to compress the stream of data
const gzipStream = zlib.createGzip();

const encryptedStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream('output.txt.gz.enc');

// read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptedStream).pipe(writableStream);
