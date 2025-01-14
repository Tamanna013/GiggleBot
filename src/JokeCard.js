import React from 'react';
import './JokeCard.css';

const JokeCard = ({ joke, onCopy, onShare, onBackgroundChange, swipeDirection, cardPosition }) => {
  const transformStyle = {
    transform: `translateX(${cardPosition}%) rotate(${swipeDirection * (cardPosition / 2)}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="joke-card" style={transformStyle}>
      <p>{joke}</p>
      <div className="actions">
        <button className="copy" onClick={onCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 1.99-.9 1.99-2L20 4c0-1.1-.89-2-1.99-2zM18 18H6V4h12v14z"/></svg>
        </button>
        <button className="share" onClick={onShare}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2v3.28l6 4.67-1.41 1.41-4.59-3.41v7.68l4.59-3.41 1.41 1.41-6 4.67V22h-4v-3.28l-6-4.67 1.41-1.41 4.59 3.41V9.72l-4.59 3.41L6 10.28l6-4.67V2h4z"/></svg>
        </button>
        <button className="background" onClick={onBackgroundChange}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 10h-4V6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v4H3c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM17 10h-4v4h-4v-4H7v-4h4V6h4v4h4v4h-4z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default JokeCard;
