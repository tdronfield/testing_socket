const socket = io();

// Send data or a message in the view (browser)
// socket.on('message', function(data){document.write(data)});

// Emit an event to the browser to listen for (after 4s timeout)
// socket.on('testerEvent', function(data) {document.write(data.description)});

// Send data back to server (emit)
socket.emit('clientEvent', 'Sent an event from the client');

// Broadcast
socket.on('broadcast', function(data) {
    document.body.innerHTML = '';
    document.write(data.description);
});

// Broadcast welcome msg to new client, update others on connected clients
socket.on('newclientconnect', function(data) {
    document.body.innerHTML = '';
    document.write(data.description);
});

// Declare custom namespace
// const socket = io ('/my-namespace');
// socket.on ('hi', function(data) {
//     document.body.innerHTML = '';
//     document.write(data);
// });

// Handling connectToRoom event
socket.on('connectToRoom', function(data) {
    document.body.innerHTML = '';
    document.write(data);
})