import {React, useState} from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import postData from './ApiAccess'


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

export default function Modal({open, onClose}) {
    function handleMouseOver(event) {
        event.target.style.backgroundColor='#aaa'
    }

    function handleMouseOut (event) {
        event.target.style.backgroundColor='#fff'
    }

    const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordCount <= 750) {
      // Word count is within the limit, create the object and log it
      const dataObject = {
        name: name,
        text: text,
        wordCount: wordCount,
      };
      console.log('Submitted Data:', dataObject);
      const roomCode = window.location.href.split('3000/')[1];
      console.log(window.location.href);
      postData(roomCode, text)
    } else {
      // Word count exceeds the limit, show an error message
      alert('Word count exceeds the limit (750 words).');
    }
  };  

  const handleDownload = () => {
    // Create a Blob from the text content
    const blob = new Blob([text], { type: 'text/plain' });
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);
    // Create a temporary link element
    const a = document.createElement('a');
    a.href = url;
    a.download = uploadedFileName || 'uploaded_text.txt'; // Set the filename
    // Simulate a click on the link to trigger the download
    a.click();
    // Clean up by revoking the URL object
    window.URL.revokeObjectURL(url);
  };

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div className='modalflex' style={MODAL_STYLES}>
                <button className='close' onClick={onClose} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>x</button>
                <div className="NewPost">
      <h1>New Post</h1>
      <div className="mcontainer">
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="submit-button">
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
        </form>
      </div>
      <div className="error-message">{errorMessage}</div>
    </div>
            </div>
        </>,
        document.getElementById('portal')
  )
}