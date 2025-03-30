import React from 'react';
import './TimeoutMessage.css';

function TimeoutMessage({ onClose }) {
  return (
    <>
      <div className="timeout-overlay" />
      <div className="timeout-message">
        <h2>¡Tiempo Agotado!</h2>
        <p>No lograste completar el puzzle a tiempo</p>
        <p>¿Quieres intentarlo de nuevo?</p>
        <button 
          className="timeout-button"
          onClick={onClose}
        >
          Reiniciar Nivel
        </button>
      </div>
    </>
  );
}

export default TimeoutMessage; 