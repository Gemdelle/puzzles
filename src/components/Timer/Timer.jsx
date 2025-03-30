import React, { useState, useEffect } from 'react';
import './Timer.css';
import { usePuzzle } from '../../context/PuzzleContext';

function Timer() {
  const { time, formatTime, showTimeoutMessage } = usePuzzle();

  // No mostrar el timer cuando aparece el mensaje de timeout
  if (showTimeoutMessage) return null;

  return (
    <div className="timer">
      <h2>Tiempo Restante</h2>
      <div className="time-display">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Timer; 