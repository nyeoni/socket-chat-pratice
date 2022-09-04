import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection / ~~') -> socket listening on ~
io.on('connection', socket => {
  console.log('a user connected');
  // special event
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    console.log('done');
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log('🚀 Server listening on', PORT);
});
