import React, { useState, useEffect, useRef } from 'react';
import PuzzlePiece from '../PuzzlePiece/PuzzlePiece';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
<<<<<<< Updated upstream
import DifficultyContainer from '../DifficultyContainer/DifficultyContainer';
=======
import { usePuzzle } from '../../context/PuzzleContext';
import { DIFFICULTY_LEVELS } from '../../constants/difficulty';
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const PuzzleContainer = () => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const containerRef = useRef(null);
=======
const PuzzleContainer = ({ onReturnToMenu, selectedPuzzle }) => {
  const containerRef = useRef(null);
  const {
    pieces,
    isComplete,
    difficulty,
    resetCounter,
    setPieces,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    showTimeoutMessage,
    handleTimeoutClose,
    getPuzzleImage,
    getCompletedImage,
    setSelectedPuzzleId
  } = usePuzzle();
>>>>>>> Stashed changes

  useEffect(() => {
    if (!containerRef.current) return;

<<<<<<< Updated upstream
=======
    const { rows, cols } = DIFFICULTY_LEVELS[difficulty];
    const totalPieces = rows * cols;
    
>>>>>>> Stashed changes
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const { rows, cols, image } = DIFFICULTY_LEVELS[difficulty];
    const totalPieces = rows * cols;

    // Calcular el tamaño de cada pieza
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    // Crear las piezas
    const newPieces = [];
    for (let i = 0; i < totalPieces; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      newPieces.push({
        id: i.toString(),
        currentX: col * pieceWidth,
        currentY: row * pieceHeight,
        correctX: col * pieceWidth,
        correctY: row * pieceHeight,
        width: pieceWidth,
        height: pieceHeight,
<<<<<<< Updated upstream
        image: image,
=======
        image: getPuzzleImage(selectedPuzzle.id, difficulty),
>>>>>>> Stashed changes
        isDragging: false,
        backgroundX: -col * pieceWidth,
        backgroundY: -row * pieceHeight,
        backgroundWidth: containerWidth,
        backgroundHeight: containerHeight
      });
    }

    // Mezclar las piezas
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    // Asignar posiciones aleatorias a las piezas mezcladas
    const randomizedPieces = shuffledPieces.map((piece, index) => ({
      ...piece,
      currentX: (index % cols) * pieceWidth,
      currentY: Math.floor(index / cols) * pieceHeight
    }));

    setPieces(randomizedPieces);
<<<<<<< Updated upstream
    setIsComplete(false);
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
            src={"/images/puzzle-1.jpg"} 
            alt="Puzzle completado" 
            style={{
              width: '800px',
              height: '800px',
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
=======
  }, [difficulty, resetCounter, setPieces, selectedPuzzle.id, getPuzzleImage]);

  return (
    <div className="puzzle-game">
      <div className="puzzle-header">
        <h1>{selectedPuzzle.name}</h1>
        <button className="return-to-menu" onClick={onReturnToMenu}>
          Volver al menú
        </button>
      </div>
      <div className='puzzle-box'>
        <div className="puzzle-layout">
          <div className={`puzzle-container ${isComplete ? 'completed' : ''}`} ref={containerRef}>
            {isComplete ? (
              <img 
                className='puzzle-completed'
                src={getCompletedImage(selectedPuzzle.id)}
                alt="Puzzle completado" 
              />
            ) : (
              pieces.map((piece) => (
                <PuzzlePiece
                  key={piece.id}
                  piece={piece}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="timer-container">
        <Timer />
      </div>
      {isComplete && <CompletionMessage />}
      {showTimeoutMessage && <TimeoutMessage onClose={handleTimeoutClose} />}
>>>>>>> Stashed changes
    </div>
  );
};

export default PuzzleContainer; 