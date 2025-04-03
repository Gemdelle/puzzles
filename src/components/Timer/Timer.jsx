import React from 'react';
import './Timer.css';
import { usePuzzle } from '../../context/PuzzleContext';
import { DIFFICULTY_LEVELS } from '../../constants/difficulty';

function Timer() {
  const { time, formatTime, showTimeoutMessage, difficulty } = usePuzzle();

  // No mostrar el timer cuando aparece el mensaje de timeout
  if (showTimeoutMessage) return null;

  // Calcular el porcentaje de tiempo restante
  const totalTime = DIFFICULTY_LEVELS[difficulty].time;
  const timePercentage = (time / totalTime) * 100;

  // Determinar si queda poco tiempo (menos del 25%)
  const isWarning = timePercentage <= 25;

  return (
    <div className="timer">
      <h2>Tiempo</h2>
      <div className="time-display">
        {formatTime(time)}
      </div>
      <div className="timeline-container">
        <div 
          className={`timeline-progress ${isWarning ? 'warning' : ''}`}
          style={{ height: `${timePercentage}%` }}
        />
      </div>
    </div>
  );
}

export default Timer; 