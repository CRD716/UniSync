import React from 'react';

const FileUpload = ({ onFileChange }) => {
  return (
    <div className="file-upload">
      <input
        type="file"
        accept=".txt"
        onChange={onFileChange}
        className="file-input"
      />
    </div>
  );
};

export default FileUpload;