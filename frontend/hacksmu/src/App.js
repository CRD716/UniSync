// App.js
import { React } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import { useAuth } from './AuthContext';
import Login from './Login';
import Room from './Room';

function App() {
  const { authenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {!authenticated ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route path="/" exact element={<Home />} />
              <Route path="/" exact element={<Home />} />
              <Route path="/about" element={<About />} />
              Login.rooms.map()
            </>
          )}
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;