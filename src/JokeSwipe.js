import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import axios from 'axios';
import JokeCard from './JokeCard';
import styled, { keyframes } from 'styled-components';

// Pop animation for the circles
const popAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
`;

// Styled component for the circles
const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  z-index: 0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &.popping {
    animation: ${popAnimation} 0.5s forwards;
  }
`;

// Background image with moving gradient effect
const BackgroundImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${(props) => `url(${props.imageUrl}) no-repeat center center/cover`};
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }

  &::before {
    width: 150px;
    height: 150px;
    top: 20%;
    left: 15%;
    z-index: 0;
  }

  &::after {
    width: 200px;
    height: 200px;
    bottom: 20%;
    right: 15%;
    z-index: 0;
  }
`;

const JokeSwiper = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [circles, setCircles] = useState(generateCircles(31));
  const [cardPosition, setCardPosition] = useState(0);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/forty');
      setJokes(response.data.map((joke) => `${joke.setup} ${joke.punchline}`));
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setCardPosition(direction === 1 ? -100 : 100);
    setTimeout(() => {
      setCurrentJokeIndex((prevIndex) => (prevIndex + direction + jokes.length) % jokes.length);
      setCardPosition(0);
    }, 300);
  };

  const handleCircleClick = (index) => {
    const newCircles = [...circles];
    newCircles[index] = { ...newCircles[index], popping: true };
    setCircles(newCircles);

    setTimeout(() => {
      newCircles[index] = generateCircle();
      setCircles(newCircles);
    }, 500);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
  });

  const generateCircle = () => ({
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    size: `${Math.floor(Math.random() * 100) + 50}px`,
    top: Math.floor(Math.random() * 80),
    left: Math.floor(Math.random() * 80),
  });

  const generateCircles = (count) => Array.from({ length: count }, generateCircle);

  const handleBackgroundChange = () => {
    const newImage = prompt('Enter the URL of the new background image:');
    if (newImage) {
      setBackgroundImage(newImage);
    }
  };

  return (
    <BackgroundImage imageUrl={backgroundImage} {...handlers}>
      {jokes.length > 0 && (
        <JokeCard
          joke={jokes[currentJokeIndex]}
          swipeDirection={swipeDirection}
          cardPosition={cardPosition}
          onCopy={() => navigator.clipboard.writeText(jokes[currentJokeIndex])}
          onShare={() => {
            if (navigator.share) {
              navigator.share({ text: jokes[currentJokeIndex] });
            } else {
              alert('Sharing is not supported on this browser.');
            }
          }}
          onBackgroundChange={handleBackgroundChange}
        />
      )}
      {circles.map((circle, index) => (
        <Circle
          key={index}
          color={circle.color}
          size={circle.size}
          top={circle.top}
          left={circle.left}
          className={circle.popping ? 'popping' : ''}
          onClick={() => handleCircleClick(index)}
        />
      ))}
    </BackgroundImage>
  );
};

export default JokeSwiper;
