const EventEmitter = require('node:events');

class MyCustomEmmitter extends EventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello';
  }
  greet(name) {
    this.emit('greeting', `${this.greeting} ${name}`);
  }
}

const myCustomEmitter = new MyCustomEmmitter();

myCustomEmitter.on('greeting', (input) => {
  console.log('Greeting event:', input);
});
myCustomEmitter.greet('Kevin Kipkirui');
