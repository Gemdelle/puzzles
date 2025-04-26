import React from 'react';
import './PuzzleCard.css';

const PuzzleCard = ({ puzzle, onClick }) => {
  const { name, logoPuzzle, difficultysLogo } = puzzle;

  return (
    <div className="puzzle-card" onClick={onClick}>
      <h3 className="puzzle-title">{name}</h3>
      <div className="puzzle-image-container">
        <img src={logoPuzzle} alt={name} className="puzzle-image" />
      </div>
      <div className="difficulty-logos">
        {difficultysLogo.map((logo, index) => (
          <img 
            key={index} 
            src={logo} 
            alt={`Dificultad ${index + 1}`} 
            className="difficulty-logo"
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleCard; 