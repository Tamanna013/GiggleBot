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
  background-size: cover;
  animation: ${keyframes`
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  `} 15s ease infinite;
`;

// Generate a random circle
const generateCircle = () => ({
  color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
  size: `${Math.floor(Math.random() * 100) + 50}px`,
  top: Math.floor(Math.random() * 80),
  left: Math.floor(Math.random() * 80),
});

// Generate an array of circles
const generateCircles = (count) => Array.from({ length: count }, generateCircle);

const JokeSwiper = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [circles, setCircles] = useState(generateCircles(31)); // Initial circles
  const [cardPosition, setCardPosition] = useState(0);

  // Fetch flirty lines from the API
  useEffect(() => {
    const fetchFlirtyLines = async () => {
      try {
        const response = await axios.get('https://rizz-api.vercel.app/api');
        setJokes(response.data);
      } catch (error) {
        console.error('Error fetching flirty lines:', error);
      }
    };

    fetchFlirtyLines();
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setCardPosition(direction === 1 ? -100 : 100); // Move the card accordingly
    setTimeout(() => {
      setCurrentJokeIndex((prevIndex) => (prevIndex + direction + jokes.length) % jokes.length);
      setCardPosition(0); // Reset card position after swipe
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

  // Setup swipeable handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1), // Swipe left to next joke
    onSwipedRight: () => handleSwipe(-1), // Swipe right to previous joke
  });

  // Handle background change
  const handleBackgroundChange = () => {
    const newImage = prompt('Enter the URL of the new background image:');
    setBackgroundImage(newImage);
  };

  return (
    <BackgroundImage imageUrl={backgroundImage} {...handlers}>
      {jokes.length > 0 && (
        <JokeCard
          joke={jokes[currentJokeIndex]}
          swipeDirection={swipeDirection}
          cardPosition={cardPosition}
          onCopy={() => navigator.clipboard.writeText(jokes[currentJokeIndex])}
          onShare={() => navigator.share({ text: jokes[currentJokeIndex] })}
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
