// AboutModule.js
import React from 'react';
import './AboutModule.css';

function AboutModule({ name, biography, imageUrl }) {
  return (
    <div className="about-module">
      <div className="module-image">
        <img src={imageUrl} alt={`${name}'s image`} />
      </div>
      <div className="module-details">
        <h2>{name}</h2>
        <p>{biography}</p>
      </div>
    </div>
  );
}

export default AboutModule;