const server = require('express')();
const path = require('path');
const http = require('http').Server(server);


// Creates new socket instance attached to http server
const io = require('socket.io')(http);
const express = require('express');

const port = process.env.PORT || 3000;

// instantiate clients to later broadcast
let clients = 0;

// Declare room
const roomno = 1;


// Set views dir
server.set('views', path.join(__dirname, 'views'));

// Set static (public) dir
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'views/index.html'));
});

// Create a custom namespace (View)
// const nsp = io.of('/my-namespace');
// nsp.on ('connection', function(socket) {
//     console.log('someone connected');
//     nsp.emit('hi', 'Hello everyone!');
// });

// io.on is an event handler for connection, disconnection, etc.
// Handles events within by using socket object
// When a user connects, run this:
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Set to timeout and send a message after 4s
//     setTimeout(() => {
//     //     socket.send('Sent a message 4s after connection!');
//     // }, 4000);

//         // Send and object when emitting a custom event
//         socket.emit('testerEvent', { description: 'A custom event named testerEvent!' });
//     }, 4000);

//     // When user disconnects, run this:
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

// Rooms - Joining a room
// io.on('connection', function(socket) {
//     // increase roomno when 2 clients present
//     if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
//     socket.join("room-"+roomno);

//     // Send event to everyone in room
//     io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
// })


io.on('connection', function(socket) {
    socket.on('clientEvent', function(data) {
        console.log(data);
    });
});

io.on('connection', function(socket) {
    clients++;
    socket.emit('newclientconnect', { description: 'Hey, Welcome!'});

    socket.broadcast.emit('newclientconnect', {description: clients + ' clients connected!'})
    socket.on('disconnect', function() {
        clients--;
        socket.broadcast.emit('newclientconnect', {description: clients + ' clients connected!'})
    });
});




http.listen(port, () => {
   console.log(`listening on ${port}/`);
});