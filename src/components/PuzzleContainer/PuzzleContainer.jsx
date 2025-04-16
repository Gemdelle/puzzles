import React, { useEffect, useRef } from 'react';
import PuzzlePiece from '../PuzzlePiece/PuzzlePiece';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
import DifficultyContainer from '../DifficultyContainer/DifficultyContainer';
import { usePuzzle } from '../../context/PuzzleContext';
import { DIFFICULTY_LEVELS } from '../../constants/difficulty';
import './PuzzleContainer.css';
import Timer from '../Timer/Timer';
import TimeoutMessage from '../TimeoutMessage/TimeoutMessage';

const PuzzleContainer = () => {
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
    handleDifficultyChange,
    showTimeoutMessage,
    handleTimeoutClose
  } = usePuzzle();

  useEffect(() => {
    if (!containerRef.current) return;

    const { rows, cols, imagePuzzle } = DIFFICULTY_LEVELS[difficulty];
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
        image: imagePuzzle,
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
  }, [difficulty, resetCounter, setPieces]);

  return (
    <div className="puzzle-game">
      <h1>Dinopuzzle</h1>
      <DifficultyContainer 
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        difficultyLevels={DIFFICULTY_LEVELS}
      />
      <div className='puzzle-box'>
        <Timer />
        <div className="puzzle-layout">
          <div className={`puzzle-container ${isComplete ? 'completed' : ''}`} ref={containerRef}>
            {isComplete ? (
              <img 
                className='puzzle-completed'
                src={DIFFICULTY_LEVELS[difficulty].imageCompleted}
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
      {isComplete && <CompletionMessage />}
      {showTimeoutMessage && <TimeoutMessage onClose={handleTimeoutClose} />}
    </div>
  );
};

export default PuzzleContainer; 