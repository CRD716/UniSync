import React, { useState } from 'react';
import './Room.css'; // You can create a CSS file for styling
import Modal from './Modal'

function Room() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  // A function to handle box click and display the popup
  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    setIsOpen(true);
  };

  // A function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Create an array of boxes (you can adjust the number of boxes as needed)
  const boxes = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      className="box"
      onClick={() => handleBoxClick(index)}
    >
      <button className="box-button"># {index + 1} - name</button>
    </div>
  ));

  return (
    <div className="room-container">
      <h1>Room Component</h1>
      <div className="box-container">{boxes}</div>

      {/* Popup */}
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <Modal open={isOpen} onClose={() => setIsOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;