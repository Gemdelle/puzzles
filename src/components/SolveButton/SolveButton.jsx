import React from 'react';
import { usePuzzle } from '../../context/PuzzleContext';
import './SolveButton.css';

function SolveButton() {
  const { handleSolvePuzzle, isComplete } = usePuzzle();

  if (isComplete) return null;

  return (
    <button 
      className="solve-button"
      onClick={handleSolvePuzzle}
    >
      Resolver Puzzle
    </button>
  );
}

export default SolveButton; 