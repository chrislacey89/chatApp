import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

let socket;

function Chat({ location }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = querystring.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    console.log(socket);
    socket.emit('join', { name, room }, () => {});

    // Fires when component unmounts - user leaves chat
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
}

export default Chat;
