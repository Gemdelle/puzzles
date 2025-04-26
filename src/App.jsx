import React, { useState } from 'react';
import PuzzleContainer from './components/PuzzleContainer/PuzzleContainer';
<<<<<<< Updated upstream
=======
import PuzzleMenu from './components/PuzzleMenu/PuzzleMenu';
import { PuzzleProvider, usePuzzle } from './context/PuzzleContext';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="app">
      <PuzzleContainer />
    </div>
=======
    <PuzzleProvider>
      <AppContent />
    </PuzzleProvider>
>>>>>>> Stashed changes
  );
}

export default App; 