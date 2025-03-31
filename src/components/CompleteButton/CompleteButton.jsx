import React from 'react';
import { usePuzzle } from '../../context/PuzzleContext';
import './CompleteButton.css';

function CompleteButton() {
  const { isComplete, handleCompletePuzzle } = usePuzzle();

  if (isComplete) return null;

  return (
    <button 
      className="complete-button"
      onClick={handleCompletePuzzle}
    >
      Completar Puzzle
    </button>
  );
}

export default CompleteButton; 