"use strict";

require("dotenv").config();
const nodewebcam = require("node-webcam");
const ws = require("ws");
const wss = new ws.Server({ port: process.env.WSS_PORT });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

wss.on("connection", function connection(ws, req) {
    console.log(`New connection: ${req.socket.remoteAddress}`);
})

const webcam = nodewebcam.create({
    callbackReturn: "base64",
    saveShots: false
});

function stream() {
    webcam.capture("picture", function (err, data) {
        if (err) {
            throw err;
        }
        wss.broadcast(data);
        setTimeout(stream, 25);
    });
}

stream()