// Login.js
import React, { useState } from 'react';
import './Login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Room from './Room';


function generateRoomCode() {
  // Generate a random 6-letter room code
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const code = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]);
  return code.join('');
}


function Login(props) {
  const [isJoining, setIsJoining] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const { updateRooms } = props;
  const navigate = useNavigate();


  function HandleCreateRoom() {
    const newRoomCode = generateRoomCode();
    updateRooms(rooms => ([...rooms, newRoomCode]));
    //console.log(rooms);
    console.log('Creating room with code:', newRoomCode);
    navigate(('/'+newRoomCode));
  }

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
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Room Code:</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          Join Room
        </button>
        <div className="separator">or</div>
        <button onClick={HandleCreateRoom} className="form-button">
          Create A Room
        </button>
      </form>
    </div>
  );
}

export default Login;
