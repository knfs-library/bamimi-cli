const socket = require("@knfs-tech/bamimi-socket.io");

const demo = async (io, socket) => {
    console.log("____________demo_______________");

    const roomNumber = socket.handshake.query.number;
    const room = `room:${roomNumber}`
    await socket.join(room);

    await socket.on('push-message', (data) => {
        console.log('Received message:', data);
        io.of('/demo').to(room).emit("get-message", data);
    });
};

socket.on("/demo", function (socket, next) {
    console.log("__________________Middleware 1 socket_______________________-");
    next();
}, function (socket, next) {
    console.log("__________________Middleware 2 socket_______________________-");
    next();
}, function (socket, next) {
    console.log("__________________Middleware 3 socket_______________________-");
    next();
}, demo);