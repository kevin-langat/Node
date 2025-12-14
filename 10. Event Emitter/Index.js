const EventEmitter = require('node:events');

const eventEmmitter = new EventEmitter();

eventEmmitter.on('start', (name) => {
  console.log(`Hey  ${name} from Node.js`);
});

eventEmmitter.emit('start', 'Kevin');
