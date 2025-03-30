import React, { createContext, useContext, useState, useCallback } from 'react';

const PuzzleContext = createContext(null);

export const PuzzleProvider = ({ children }) => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [resetCounter, setResetCounter] = useState(0);

  const handleDragStart = useCallback((e, piece) => {
    setDraggedPiece(piece);
    setPieces(prevPieces => 
      prevPieces.map(p => p.id === piece.id ? { ...p, isDragging: true } : p)
    );
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedPiece(null);
    setPieces(prevPieces => prevPieces.map(p => ({ ...p, isDragging: false })));
  }, []);

  const handleDrop = useCallback((e, targetPiece) => {
    e.preventDefault();
    if (!draggedPiece || draggedPiece.id === targetPiece.id) return;

    setPieces(prevPieces => {
      const newPieces = prevPieces.map(piece => {
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

      // Check if puzzle is complete
      const isPuzzleComplete = newPieces.every(piece => 
        Math.abs(piece.currentX - piece.correctX) < 10 &&
        Math.abs(piece.currentY - piece.correctY) < 10
      );

      setIsComplete(isPuzzleComplete);
      setDraggedPiece(null);
      return newPieces;
    });
  }, [draggedPiece]);

  const handlePlayAgain = useCallback(() => {
    setIsComplete(false);
    setResetCounter(prev => prev + 1);
  }, []);

  const handleNextLevel = useCallback(() => {
    const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];
    const currentIndex = DIFFICULTY_ORDER.indexOf(difficulty);
    if (currentIndex < DIFFICULTY_ORDER.length - 1) {
      setDifficulty(DIFFICULTY_ORDER[currentIndex + 1]);
    }
  }, [difficulty]);

  const value = {
    pieces,
    setPieces,
    draggedPiece,
    isComplete,
    difficulty,
    resetCounter,
    setDifficulty,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handlePlayAgain,
    handleNextLevel
  };

  return (
    <PuzzleContext.Provider value={value}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
}; 