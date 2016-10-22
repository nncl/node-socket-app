/**
 * @description
 * Module responsible for building realtime communication.
 */

'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    let nickname;
    console.log('a user is connected');

    socket.on('chat message', (obj) => {
        console.log('message: ' + JSON.stringify(obj));
        io.emit('chat message', obj);
    });

    socket.on('nickname', (nick) => {
        nickname = nick;
        console.log('nickname: ' + nick);
        io.emit('nickname', nick);
    });

    socket.on('typing', (typing_message) => {
        console.log('nickname: ' + typing_message);
        io.emit('typing', typing_message);
    });

    socket.on('disconnect', () => {
        console.log(nickname + ' has disconnected');
        io.emit('disconnect', nickname + " disconnected");
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});