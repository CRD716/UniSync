import React, { useState } from 'react';
import './Room.css'; // You can create a CSS file for styling

function Room() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  // A function to handle box click and display the popup
  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    setShowPopup(true);
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
      Box {index + 1}
    </div>
  ));

  return (
    <div className="room-container">
      <h1>Room Component</h1>
      <div className="box-container">{boxes}</div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Popup Box {selectedBox + 1}</h2>
            <p>Popup content goes here.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;