import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const PuzzleContext = createContext(null);

export const PuzzleProvider = ({ children }) => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [resetCounter, setResetCounter] = useState(0);
  const [time, setTime] = useState(0);

  // Efecto para resetear el tiempo cuando cambia la dificultad
  useEffect(() => {
    setTime(0);
  }, [difficulty]);

  // Efecto para el timer
  useEffect(() => {
    let intervalId;

    if (!isComplete) {
      intervalId = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isComplete]);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

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
      // Primero reseteamos todo
      setTime(0);
      setIsComplete(false);
      
      // Pequeño delay para asegurar que el CompletionMessage se cierre antes de cambiar la dificultad
      setTimeout(() => {
        setDifficulty(DIFFICULTY_ORDER[currentIndex + 1]);
        setResetCounter(prev => prev + 1);
      }, 100);
    }
  }, [difficulty]);

  const handleCompletePuzzle = useCallback(() => {
    // Colocar cada pieza en su posición correcta
    setPieces(prevPieces => 
      prevPieces.map(piece => ({
        ...piece,
        currentX: piece.correctX,
        currentY: piece.correctY,
        isDragging: false
      }))
    );
    
    // Marcar como completo
    setIsComplete(true);
  }, []);

  // Handler para cambiar dificultad
  const handleDifficultyChange = useCallback((e) => {
    setTime(0); // Resetear el tiempo
    setDifficulty(e.target.value);
    setIsComplete(false);
    setResetCounter(prev => prev + 1);
  }, []);

  const value = {
    pieces,
    setPieces,
    draggedPiece,
    isComplete,
    difficulty,
    resetCounter,
    time,
    formatTime,
    setDifficulty,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handlePlayAgain,
    handleNextLevel,
    handleCompletePuzzle,
    handleDifficultyChange,
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