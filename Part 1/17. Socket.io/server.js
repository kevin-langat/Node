const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// initiate socket.io and attach this to the http
const io = socketIo(server);
app.use(express.static('public'));

const users = new Set();
io.on('connection', (socket) => {
  console.log('A user is now connected');

  // handle User when they wil join the chat
  socket.on('join', (userName) => {
    users.add(userName);

    // broadcast to all users that a new user has joined
    io.emit('userJoined', userName);
    // send the updated the userlist
    io.emit('chatUsersList', Array.from(users));
  });

  // handle incomeing msgs
});
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server is now running on PORT ${PORT}`);
});
