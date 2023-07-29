import { useState, useEffect } from "react";
import socket from "../socket";

const useSocketSetup = () => {
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log('Connected to the server');
        });
        socket.on('message', (data) => {
            console.log('Received message:', data);
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        socket.emit('message', 'Hello from client');
  });
    }, [] );
}

export default useSocketSetup;