import React from 'react';
import './NoteBanner.css';

function NoteBanner({ note, onDelete, onDownload }) {
  const { name, text, wordCount } = note;

  const handleDelete = () => {
    onDelete(note); // Pass the note to the onDelete function
  };

  const handleDownload = () => {
    onDownload(text); // Pass the text to the onDownload function
  };

  return (
    <div className="note-banner">
      <p>Uploaded By {name}</p>
      <p>Word Count: {wordCount}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
      <button className="download-button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}

export default NoteBanner;