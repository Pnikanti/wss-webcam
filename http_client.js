"use strict";

require("dotenv").config();

const http = require("http");
const ejs = require("ejs");
const fs = require("fs");
const ip = require("ip")

const serverIp = ip.address(process.env.NETWORK_INTERFACE)

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(__dirname + "/www/index.html", "utf-8", (err, content) => {
        if (err) {
            res.end("Error occurred!");
            return;
        }
        let renderedHtml = ejs.render(content, { serverIp: serverIp, wssPort: process.env.WSS_PORT });
        res.end(renderedHtml);
    });
}).listen(process.env.CLIENT_PORT, () => console.log(`Visit ${serverIp}:${process.env.CLIENT_PORT}`));