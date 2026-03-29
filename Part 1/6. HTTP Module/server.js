const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Hello from node.js');
});

server.listen(8000, () => {
  console.log('Server is now running on port 8000');
});
