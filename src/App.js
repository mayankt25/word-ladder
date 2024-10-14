import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import GamePage from './GamePage';
import SolvePage from './SolvePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/solve" element={<SolvePage />} />
      </Routes>
    </Router>
  );
}

export default App;