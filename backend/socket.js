const http = require('http');
const socketIo = require('socket.io');
const app = require('express')();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 4100;
 
// Graceful shutdown
const exitHandler = () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(1);
    });

    // if server not closing promptly, force close
    setTimeout(() => {
        console.error('Forcing server close due to timeout');
        process.exit(1);
    }, 10000); // 10 seconds timeout
};

// catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

// catches uncaught exceptions
process.on('uncaughtException', exitHandler);

server.listen(PORT, () => {
    console.log(`Socket is listening on port ${PORT}`);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

module.exports = { io, server };
