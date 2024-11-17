const { Server } = require('socket.io');

const io = new Server(3000);

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Listen for messages from clients
    socket.on('message', (data) => {
        console.log(`Received from ${socket.id}: ${data}`);

        // Broadcast to all clients, including sender
        io.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
