import React, { useState } from 'react';
import PuzzleContainer from './components/PuzzleContainer/PuzzleContainer';
import PuzzleMenu from './components/PuzzleMenu/PuzzleMenu';
import { PuzzleProvider, usePuzzle } from './context/PuzzleContext';
import './App.css';

function AppContent() {
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const { setSelectedPuzzleId } = usePuzzle();

  const handlePuzzleSelect = (puzzle) => {
    setSelectedPuzzle(puzzle);
    setSelectedPuzzleId(puzzle.id);
  };

  const handleReturnToMenu = () => {
    setSelectedPuzzle(null);
    setSelectedPuzzleId(null);
  };

  return (
    <div className="app">
      {selectedPuzzle ? (
        <PuzzleContainer 
          onReturnToMenu={handleReturnToMenu} 
          selectedPuzzle={selectedPuzzle}
        />
      ) : (
        <PuzzleMenu onPuzzleSelect={handlePuzzleSelect} />
      )}
    </div>
  );
}

function App() {
  return (
    <PuzzleProvider>
      <AppContent />
    </PuzzleProvider>
  );
}

export default App; 