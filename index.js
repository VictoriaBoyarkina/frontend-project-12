import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const server = createServer(app);
const io = new Server(server);

app.listen(3000);

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });

io.on("connection", (socket) => {
    console.log('hi')
    socket.emit("hello", "world");
});