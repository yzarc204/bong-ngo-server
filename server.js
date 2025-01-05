require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
var io = socketIo(server, {
    cors: {
        origin: process.env.CORS_ORIGIN
    }
});
server.listen(3000, () => {
    console.log('Server đang chạy ở port 3000');
});

io.on('connection', (socket) => {
    console.log('1 client đã kết nối tới server');

    socket.on('play', (data) => {
        console.log('1 user ấn nút play');
        socket.broadcast.emit('play', data);
    });

    socket.on('pause', (data) => {
        console.log('1 user ấn nút play');
        socket.broadcast.emit('pause', data);
    });

    socket.on('seek', (data) => {
        console.log(`1 user đã tua tới ${data.time}`);
        socket.broadcast.emit('seek', data);
    });
});