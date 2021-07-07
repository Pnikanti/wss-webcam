## 📷 wss-webcam
[**Based on chuckfairy's node-webcam and its websocket example**](https://github.com/chuckfairy/node-webcam/)

    1. setup env variables -> touch .env
    2. npm install
    3. npm run wss -> start websocket server and its API
    5. npm run http -> start http client
   

server:port/start -> start websocket camera stream
server:port/stop -> stop websocket camera stream

### Example env variables

    HTTP_PORT=9090
    WSS_PORT=9091
    CLIENT_PORT=9092
    NETWORK_INTERFACE="Ethernet 3"