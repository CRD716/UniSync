// Login.js
import React, { useState } from 'react';
import './Login.css';
import { Navigate, useNavigate } from 'react-router-dom';

function generateRoomCode() {
  // Generate a random 6-letter room code
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const code = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]);
  return code.join('');
}

function handleCreateRoom() {
  const newRoomCode = generateRoomCode();
  console.log('Creating room with code:', newRoomCode);
  Navigate('/room');
}

function Login() {
  const [isJoining, setIsJoining] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isJoining) {
      // Handle joining a room with roomCode
      console.log('Joining room with code:', roomCode);
    } else {
      // Handle creating a room with roomCode
      const newRoomCode = generateRoomCode();
      console.log('Creating room with code:', newRoomCode);
      Navigate('/room/room');
    }
  };

  return (
    <div className="login-container">
      <h2>Join A Room!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Code:</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </div>
        <button type="submit">Join Room</button>
        <div />
        <button onClick={handleCreateRoom}>Create A Room</button>
      </form>
    </div>
  );
}

export default Login;
