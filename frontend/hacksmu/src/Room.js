import React, { useState } from 'react';
import './Room.css';
import NoteModal from './components/NoteModal';
import NoteBanner from './components/NoteBanner';

function Room() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); // Array to store note objects
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextClick = () => {
    const textToCopy = window.location.href.split('3000/')[1]; // Replace with the actual text you want to copy
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };  

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
        };
        reader.readAsText(file);
      } else {
        setErrorMessage('Please upload a .txt file.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) {
      // Check if either name or text is empty
      setErrorMessage('Please fill in both name and text fields.');
    } else if (wordCount > 750) {
      // Check if word count exceeds the limit
      setErrorMessage('Word count exceeds the limit (750 words).');
    } else {
      // Create a new note object
      const newNote = {
        name: name,
        text: text,
        wordCount: wordCount,
      };

      // Add the new note to the notes array
      setNotes([...notes, newNote]);

      // Clear the input fields and word count
      setName('');
      setText('');
      setWordCount(0);
      setErrorMessage('');

      // Close the modal
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };  

  return (
    <div className="Room">
      <h1>FuzeNote</h1>
      <h2>Room Code</h2>
      <p>
        <span className="copy-text" onClick={handleTextClick}>
          {window.location.href.split('3000/')[1]} <break></break>
          <span className="tooltip">Click to Copy</span>
        </span>
      </p>

      <hr />
      <button onClick={openModal} className="new-note-button">
        New Note
      </button>
      {isModalOpen && (
        <NoteModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleTextChange={handleTextChange}
        handleFileUpload={handleFileUpload}
        errorMessage={errorMessage}
        name={name}
        text={text}
        wordCount={wordCount}
        addNote={addNote} // Pass the addNote function as a prop
      />
      
      )}
      {notes.map((note, index) => (
        <NoteBanner
          key={index}
          note={note}
          onDelete={(noteToDelete) => {
            // Remove the note from the notes array
            const updatedNotes = notes.filter((note) => note !== noteToDelete);
            setNotes(updatedNotes);
          }}
          onDownload={(noteText) => {
            // Trigger the download of the note text
            const blob = new Blob([noteText], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'note.txt';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
        />
      ))}
    </div>
  );
}

export default Room;