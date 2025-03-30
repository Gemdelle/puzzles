import React from 'react';
import './DifficultyContainer.css';

const DifficultyContainer = ({ difficulty, onDifficultyChange, difficultyLevels }) => {
  return (
    <div className="difficulty-container">
      <label htmlFor="difficulty">Dificultad:</label>
      <select 
        id="difficulty" 
        value={difficulty} 
        onChange={onDifficultyChange}
        style={{ color: difficultyLevels[difficulty].color }}
      >
        {Object.entries(difficultyLevels).map(([key, value]) => (
          <option key={key} value={key} style={{ color: value.color }}>
            {value.name} ({value.rows}x{value.cols})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultyContainer; 