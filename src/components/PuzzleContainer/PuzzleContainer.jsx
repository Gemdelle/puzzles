import React, { useEffect, useRef } from 'react';
import PuzzlePiece from '../PuzzlePiece/PuzzlePiece';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
import DifficultyContainer from '../DifficultyContainer/DifficultyContainer';
import { usePuzzle } from '../../context/PuzzleContext';
import { DIFFICULTY_LEVELS } from '../../constants/difficulty';
import './PuzzleContainer.css';

const PuzzleContainer = () => {
  const containerRef = useRef(null);
  const {
    pieces,
    isComplete,
    difficulty,
    resetCounter,
    setPieces,
    setDifficulty,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handlePlayAgain,
    handleNextLevel
  } = usePuzzle();

  useEffect(() => {
    if (!containerRef.current) return;

    const { rows, cols, image } = DIFFICULTY_LEVELS[difficulty];
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
        image: image,
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
              onDragOver={(e) => e.preventDefault()}
            />
          ))
        )}
      </div>
      {isComplete && (
        <CompletionMessage 
          onPlayAgain={handlePlayAgain}
          onNextLevel={handleNextLevel}
        />
      )}
    </div>
  );
};

export default PuzzleContainer; 