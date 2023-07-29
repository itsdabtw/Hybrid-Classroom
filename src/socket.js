import {io} from "socket.io-client"

const socket = new io('http://54.253.92.7:4024', {
    autoConnect: false,
    query: {
        token: localStorage.getItem("id")
    }
});

export default socket;