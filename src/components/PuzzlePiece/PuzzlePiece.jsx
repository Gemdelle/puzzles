import React from 'react';
import './PuzzlePiece.css';

const PuzzlePiece = ({ piece, onDragStart, onDragEnd, onDrop, onDragOver, gridSize, isComplete, isDragging }) => {
  // Determinar qué lados tienen protuberancias basado en la posición
  const getProtuberanceClass = () => {
    const row = Math.floor(piece.id / gridSize);
    const col = piece.id % gridSize;
    let protuberanceClass = 'puzzle-piece';
    
    // Protuberancia superior
    if (row > 0) protuberanceClass += ' top-protuberance';
    
    // Protuberancia derecha
    if (col < gridSize - 1) protuberanceClass += ' right-protuberance';
    
    // Protuberancia inferior
    if (row < gridSize - 1) protuberanceClass += ' bottom-protuberance';
    
    // Protuberancia izquierda
    if (col > 0) protuberanceClass += ' left-protuberance';

    // Añadir clase completed si el puzzle está completo
    if (isComplete) protuberanceClass += ' completed';
    
    return protuberanceClass;
  };

  return (
    <div
      className={`puzzle-piece ${isDragging ? 'dragging' : ''} ${isComplete ? 'completed' : ''}`}
      style={{
        left: `${piece.currentX}px`,
        top: `${piece.currentY}px`,
        width: `${piece.width}px`,
        height: `${piece.height}px`,
        backgroundImage: `url(${piece.image})`,
        backgroundSize: `${piece.backgroundWidth}px ${piece.backgroundHeight}px`,
        backgroundPosition: `${piece.backgroundX}px ${piece.backgroundY}px`,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, piece)}
      onDragEnd={(e) => onDragEnd(e, piece)}
      onDrop={(e) => onDrop(e, piece)}
      onDragOver={(e) => onDragOver(e, piece)}
    />
  );
};

export default PuzzlePiece; 