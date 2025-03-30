import React from 'react';
import './CompletionMessage.css';

const CompletionMessage = ({ onPlayAgain, onNextLevel }) => {
  return (
    <>
      <div className="overlay" />
      <div className="completion-message">
        <button className="close-button" onClick={onPlayAgain}>×</button>
        <h2>¡Felicitaciones!</h2>
        <p>Has completado el puzzle</p>
        <div className="button-container">
          <button onClick={onPlayAgain}>Jugar de nuevo</button>
          <button onClick={onNextLevel} className="next-level">Siguiente nivel</button>
        </div>
      </div>
    </>
  );
};

export default CompletionMessage; 