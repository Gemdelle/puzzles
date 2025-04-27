import React, { useEffect, useRef } from 'react';
import PuzzlePiece from '../PuzzlePiece/PuzzlePiece';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
import { usePuzzle } from '../../context/PuzzleContext';
import { DIFFICULTY_LEVELS } from '../../constants/difficulty';
import './PuzzleContainer.css';
import Timer from '../Timer/Timer';
import TimeoutMessage from '../TimeoutMessage/TimeoutMessage';

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

  useEffect(() => {
    if (!containerRef.current) return;

    const { rows, cols } = DIFFICULTY_LEVELS[difficulty];
    const totalPieces = rows * cols;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

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
        image: getPuzzleImage(selectedPuzzle.id, difficulty),
        isDragging: false,
        backgroundX: -col * pieceWidth,
        backgroundY: -row * pieceHeight,
        backgroundWidth: containerWidth,
        backgroundHeight: containerHeight
      };
    });

    const randomizedPieces = [...newPieces]
      .sort(() => Math.random() - 0.5)
      .map((piece, index) => ({
        ...piece,
        currentX: (index % cols) * pieceWidth,
        currentY: Math.floor(index / cols) * pieceHeight
      }));

    setPieces(randomizedPieces);
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
    </div>
  );
};

export default PuzzleContainer; 