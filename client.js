const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("ws://localhost:3000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "You> ",
});


socket.on("connect", () => {
    console.log("Connected to the server!");

    rl.prompt();

    rl.on("line", (line) => {
        socket.emit("message", line.trim());
        rl.prompt();
    });
});

// Listen for messages from the server
socket.on("message", (data) => {
    console.log(`\nBroadcast: ${data}`);
    rl.prompt();
});

// On disconnection
socket.on("disconnect", () => {
    console.log("Disconnected from the server");
    rl.close();
});
