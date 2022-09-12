import express from 'express';
import path from 'path';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use('/public', express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: './server'});
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
