import React, { useState } from 'react';

const Input = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSubmit(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Input;
