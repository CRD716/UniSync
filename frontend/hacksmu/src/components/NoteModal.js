import React, { useState } from 'react';
import './NoteModal.css';
import postData from '../ApiAccess';

function NoteModal({ closeModal, addNote }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    const words = inputText.split(/\s+/).filter((word) => word !== '');
    setWordCount(words.length);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileText = event.target.result;
          setText(fileText);
          const words = fileText.split(/\s+/).filter((word) => word !== '');
          setWordCount(words.length);
          setErrorMessage('');
          setUploadedFileName(file.name); // Set the uploaded file name
        };
        reader.readAsText(file);
      } else {
        setErrorMessage('Please upload a .txt file.');
      }
    }
  };


  const handleSubmit = () => {
    // Check if either name or text is empty
    if (!name || !text) {
      setErrorMessage('Please fill in both name and text fields.');
    } 
    else if (wordCount > 750) {
      // Check if word count exceeds the limit
      setErrorMessage('Word count exceeds the limit (750 words).');
    } else {
      // Create a new note object
      const newNote = {
        name: name,
        text: text,
        wordCount: wordCount,
      };
  
      // Call the addNote function to add the new note to the array
      addNote(newNote);
      console.log(window.location.href.split('3001/')[1]);
      postData(name, window.location.href.split('3001/')[1], text)
  
      // Clear the input fields and word count
      setName('');
      setText('');
      setWordCount(0);
      setErrorMessage('');
  
      // Close the modal
      closeModal();
    }
  };  


  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = uploadedFileName || 'uploaded_text.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-button" onClick={closeModal}>X</div>
        <div className="name-input">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="file-upload">
          <label htmlFor="file-input" className="upload-button">
            Upload File
          </label>
          <input
            type="file"
            accept=".txt"
            id="file-input"
            onChange={handleFileUpload}
            className="file-input"
          />
          {uploadedFileName && (
            <span className="uploaded-file-name">{uploadedFileName}</span>
          )}
        </div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter text..."
          onChange={handleTextChange}
          value={text}
          className="text-input"
        />
        <div className="word-count-and-button">
          <span className="word-count">{wordCount}/750 words</span>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {text && (
          <button
            className="download-button"
            type="button"
            onClick={handleDownload}
          >
            Download File
          </button>
        )}
        <div className="error-message">{errorMessage}</div>
      </div>
    </div>
  );
}

export default NoteModal;