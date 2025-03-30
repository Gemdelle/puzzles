import React, { useState, useEffect } from 'react';
import './Timer.css';
import { usePuzzle } from '../../context/PuzzleContext';

function Timer() {
  const { time, formatTime } = usePuzzle();

  return (
    <div className="timer">
      <h2>Tiempo</h2>
      <div className="time-display">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Timer; 