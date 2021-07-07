"use strict";

require("dotenv").config();

const nodewebcam = require("node-webcam");
const express = require("express")
const ws = require("ws");
const ip = require("ip");

const app = express();
const wss = new ws.Server({ port: process.env.WSS_PORT });
const serverIp = ip.address(process.env.NETWORK_INTERFACE)

let webcam = null;

let stream = () => {
    try {
        webcam.capture("picture", (err, data) => {
            wss.broadcast(data);
            setTimeout(stream, 25);
        });
    }
    catch (err) {
        console.log("Stopped websocket camera stream!");
        return;
    }
}

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        client.send(data);
    });
};

wss.on("connection", (ws, req) => {
    console.log(`New connection: ${req.socket.remoteAddress}`);
})

app.get("/", (req, res) => {
    res.status(200).send({ endpoints: ["/start", "/stop"] })
})

app.get("/start", (req, res) => {
    if (webcam !== null) {
        res.status(200).send({ message: "Websocket camera stream already running!", url: `${serverIp}:${process.env.WSS_PORT}` })
    }
    else if (webcam === null) {
        console.log(`Starting a websocket camera stream on port ${process.env.WSS_PORT}`)
        webcam = nodewebcam.create({
            callbackReturn: "base64",
            saveShots: false
        });
        res.status(201).send({ message: "Started a websocket camera stream!", url: `${serverIp}:${process.env.WSS_PORT}` })
        stream()
    }
})

app.get("/stop", (req, res) => {
    if (webcam !== null) {
        webcam = null
        res.status(204).send({ message: "Websocket camera stream closed!" })
    }
    else {
        res.status(200).send({ message: "Websocket camera stream already shutdown!" })
    }
})

app.listen(process.env.HTTP_PORT, () => console.log(`Visit ${serverIp}:${process.env.HTTP_PORT}`))