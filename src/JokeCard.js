// src/JokeCard.js
import React from 'react';

const JokeCard = ({ joke, onCopy, onShare, onBackgroundChange }) => {
  return (
    <div className="joke-card">
      <p>{joke}</p>
      <div className="actions">
        <button onClick={onCopy}>Copy</button>
        <button onClick={onShare}>Share</button>
        <button onClick={onBackgroundChange}>Change Background</button>
      </div>
    </div>
  );
};

export default JokeCard;
