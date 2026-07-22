import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {

    autoConnect: false,

    transports: ["websocket"]

});

// Atualiza o token antes de ligar
socket.on("connect_error", (err) => {

    console.error("Socket Error:", err.message);

});

export const connectSocket = () => {

    socket.auth = {

        token: localStorage.getItem("token")

    };

    if (!socket.connected) {

        socket.connect();

    }

};

export default socket;