import React, { useState, useEffect, useRef } from 'react';
import PuzzlePiece from '../PuzzlePiece/PuzzlePiece';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
import DifficultyContainer from '../DifficultyContainer/DifficultyContainer';
import './PuzzleContainer.css';

const DIFFICULTY_LEVELS = {
  easy: { 
    name: 'Fácil', 
    rows: 3, 
    cols: 5, 
    color: '#4CAF50',
    image: '/images/puzzle-1-3_5.png'
  },
  medium: { 
    name: 'Medio', 
    rows: 5, 
    cols: 8, 
    color: '#FFC107',
    image: '/images/puzzle-2-5_8.png'
  },
  hard: { 
    name: 'Difícil', 
    rows: 7, 
    cols: 12, 
    color: '#F44336',
    image: '/images/puzzle-3-7_12.png'
  }
};

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];

const PuzzleContainer = () => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { rows, cols, image } = DIFFICULTY_LEVELS[difficulty];
    const totalPieces = rows * cols;

    // Obtener el tamaño actual del contenedor
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Calcular el tamaño de cada pieza basado en el tamaño del contenedor
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    // Crear las piezas iniciales
    const newPieces = Array.from({ length: totalPieces }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      return {
        id: i.toString(),
        currentX: col * pieceWidth,
        currentY: row * pieceHeight,
        correctX: col * pieceWidth,
        correctY: row * pieceHeight,
        width: pieceWidth,
        height: pieceHeight,
        image: image,
        isDragging: false,
        backgroundX: -col * pieceWidth,
        backgroundY: -row * pieceHeight,
        backgroundWidth: containerWidth,
        backgroundHeight: containerHeight
      };
    });

    // Mezclar y establecer las piezas
    const randomizedPieces = [...newPieces]
      .sort(() => Math.random() - 0.5)
      .map((piece, index) => ({
        ...piece,
        currentX: (index % cols) * pieceWidth,
        currentY: Math.floor(index / cols) * pieceHeight
      }));

    setPieces(randomizedPieces);
  }, [difficulty]);

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece);
    setPieces(pieces.map(p => 
      p.id === piece.id ? { ...p, isDragging: true } : p
    ));
  };

  const handleDragEnd = () => {
    setDraggedPiece(null);
    setPieces(pieces.map(p => ({ ...p, isDragging: false })));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetPiece) => {
    e.preventDefault();
    if (!draggedPiece || draggedPiece.id === targetPiece.id) return;

    const newPieces = pieces.map(piece => {
      if (piece.id === draggedPiece.id) {
        return {
          ...piece,
          currentX: targetPiece.currentX,
          currentY: targetPiece.currentY,
          isDragging: false
        };
      }
      if (piece.id === targetPiece.id) {
        return {
          ...piece,
          currentX: draggedPiece.currentX,
          currentY: draggedPiece.currentY,
          isDragging: false
        };
      }
      return piece;
    });

    setPieces(newPieces);
    setDraggedPiece(null);

    // Check if puzzle is complete
    const isPuzzleComplete = newPieces.every(piece => 
      Math.abs(piece.currentX - piece.correctX) < 10 &&
      Math.abs(piece.currentY - piece.correctY) < 10
    );

    setIsComplete(isPuzzleComplete);
  };

  const handleNextLevel = () => {
    const currentIndex = DIFFICULTY_ORDER.indexOf(difficulty);
    if (currentIndex < DIFFICULTY_ORDER.length - 1) {
      setDifficulty(DIFFICULTY_ORDER[currentIndex + 1]);
    }
  };

  return (
    <div className="puzzle-game">
      <h1>Dinopuzzle</h1>
      <DifficultyContainer 
        difficulty={difficulty}
        onDifficultyChange={(e) => setDifficulty(e.target.value)}
        difficultyLevels={DIFFICULTY_LEVELS}
      />
      <div className={`puzzle-container ${isComplete ? 'completed' : ''}`} ref={containerRef}>
        {isComplete ? (
          <img 
            src={DIFFICULTY_LEVELS[difficulty].image}
            alt="Puzzle completado" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              margin: 'auto',
              display: 'block'
            }}
          />
        ) : (
          pieces.map((piece) => (
            <PuzzlePiece
              key={piece.id}
              piece={piece}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              gridSize={DIFFICULTY_LEVELS[difficulty].cols}
              isComplete={isComplete}
            />
          ))
        )}
      </div>
      {isComplete && (
        <CompletionMessage 
          onPlayAgain={() => setDifficulty(difficulty)}
          onNextLevel={handleNextLevel}
        />
      )}
    </div>
  );
};

export default PuzzleContainer; 