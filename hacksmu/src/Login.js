// Login.js
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [isJoining, setIsJoining] = useState(true);
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isJoining) {
      // Handle joining a room with roomCode
      console.log('Joining room with code:', roomCode);
    } else {
      // Handle creating a room with roomCode
      console.log('Creating room with code:', roomCode);
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
      </form>
      <p onClick={() => setIsJoining(!isJoining)}>
        {isJoining ? 'Create a new room instead.' : 'Join an existing room.'}
      </p>
    </div>
  );
}

export default Login;
