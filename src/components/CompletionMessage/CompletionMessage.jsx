import React, { useEffect } from 'react';
import './CompletionMessage.css';
import { usePuzzle } from '../../context/PuzzleContext';

function CompletionMessage() {
  const { 
    elapsedTime,
    formatTime, 
    handlePlayAgain, 
    handleNextLevel,
    difficulty 
  } = usePuzzle();

  const isLastLevel = difficulty === 'hard';

  return (
    <>
      <div className="overlay" />
      <div className="completion-message">
        <button className="close-button" onClick={handlePlayAgain}>×</button>
        {isLastLevel ? (
          // Mensaje para el último nivel
          <>
            <h2>¡Felicitaciones!</h2>
            <p>Has completado todos los niveles</p>
            <p>¡Eres un maestro del puzzle!</p>
            <p className="completion-time">
              Lo resolviste en: {formatTime(elapsedTime)}
            </p>
          </>
        ) : (
          // Mensaje normal para otros niveles
          <>
            <h2>¡Felicitaciones!</h2>
            <p>Has completado el puzzle</p>
            <p className="completion-time">
              Lo resolviste en: {formatTime(elapsedTime)}
            </p>
            <div className="button-container">
              <button onClick={handlePlayAgain}>Jugar de nuevo</button>
              <button 
                onClick={handleNextLevel} 
                className="next-level"
              >
                Siguiente nivel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CompletionMessage; 