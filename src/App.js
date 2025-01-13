// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import JokeSwiper from './JokeSwipe'; // Importing JokeSwiper instead of JokesPage

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/jokes" element={<JokeSwiper />} /> {/* This points to JokeSwiper */}
    </Routes>
  </Router>
);

export default App;
