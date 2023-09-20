// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import { useAuth } from './AuthContext';
import Login from './Login';
import Room from './Room';
import Modal from './Modal'

function App() {
  const { authenticated } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const updateRooms = (newRooms) => {
    setRooms(newRooms);
  };
  console.log(rooms);

  return (
    <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* {!authenticated ? ( */}
            
            {/* ) : ( */}
              <>
                <Route path="/" element={<Login updateRooms={updateRooms} rooms={rooms}/>} />
                {/* <Route path="/" exact element={<Home />} /> */}
                <Route path="/about" element={<About />} />
                {rooms.map((item) => (<Route path={"/" + item} element={<Room />} /> ))}
              </>
            {/* )} */}
          </Routes>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}/>
        </div>
    </Router>
  );
}

export default App;