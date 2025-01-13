import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import axios from 'axios';
import JokeCard from './JokeCard';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${(props) => `url(${props.imageUrl}) no-repeat center center/cover`};
`;

const JokeSwiper = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('');

  // Fetch jokes from the API
  const fetchJokes = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_ten');
      setJokes(response.data.map((joke) => `${joke.setup} ${joke.punchline}`));
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  // Handle left swipe (next joke)
  const handleSwipeLeft = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
  };

  // Handle right swipe (previous joke)
  const handleSwipeRight = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex - 1 + jokes.length) % jokes.length);
  };

  // Handle copy to clipboard
  const handleCopy = (joke) => {
    navigator.clipboard.writeText(joke);
    alert('Joke copied to clipboard!');
  };

  // Handle sharing the joke
  const handleShare = (joke) => {
    if (navigator.share) {
      navigator.share({ text: joke });
    } else {
      alert('Sharing not supported on this device.');
    }
  };

  // Handle background change
  const handleBackgroundChange = () => {
    const newImage = prompt('Enter the URL of the new background image:');
    setBackgroundImage(newImage);
  };

  // Fetch jokes when component mounts
  useEffect(() => {
    fetchJokes();
  }, []);

  // Set up swipeable handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <BackgroundImage imageUrl={backgroundImage} {...handlers}>
      {jokes.length > 0 && (
        <JokeCard
          joke={jokes[currentJokeIndex]}
          onCopy={() => handleCopy(jokes[currentJokeIndex])}
          onShare={() => handleShare(jokes[currentJokeIndex])}
          onBackgroundChange={handleBackgroundChange}
        />
      )}
    </BackgroundImage>
  );
};

export default JokeSwiper;
