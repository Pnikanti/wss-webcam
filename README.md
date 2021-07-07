## 📷 wss-webcam
[**Based on chuckfairy's node-webcam and its websocket example**](https://github.com/chuckfairy/node-webcam/)

    1. setup env variables -> touch .env
    2. npm install
    3. npm run wss -> start websocket server and its API
    5. npm run http -> start http client
   
### endpoints

    /start -> start websocket camera stream
    /stop -> stop websocket camera stream

### example env variables

    HTTP_PORT=9090
    WSS_PORT=9091
    CLIENT_PORT=9092
    NETWORK_INTERFACE="Ethernet 3"

- HTTP_PORT is wss.js's API port
- WSS_PORT is wss.js's websocket server's port
- CLIENT_PORT is http_client.js's HTTP port
- NETWORK_INTERFACE is the network interface's name (E.g. "Ethernet 3" for Win or "eth0" for Linux) where the system is meant to be used in. Used for API returns/logging guidance for users.