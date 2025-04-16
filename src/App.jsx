import React from 'react';
import PuzzleContainer from './components/PuzzleContainer/PuzzleContainer';
import { PuzzleProvider } from './context/PuzzleContext';
import './App.css';

function App() {
  return (
    <PuzzleProvider>
      <div className="app">
        <PuzzleContainer />
      </div>
    </PuzzleProvider>
  );
}

export default App; 