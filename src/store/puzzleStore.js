import create from 'zustand';

const usePuzzleStore = create((set, get) => ({
  pieces: [],
  draggedPiece: null,
  isComplete: false,
  difficulty: 'easy',
  resetCounter: 0,

  setPieces: (pieces) => set({ pieces }),
  setDraggedPiece: (piece) => set({ draggedPiece: piece }),
  setIsComplete: (isComplete) => set({ isComplete }),
  setDifficulty: (difficulty) => set({ difficulty }),
  incrementResetCounter: () => set((state) => ({ resetCounter: state.resetCounter + 1 })),

  // Handlers
  handleDragStart: (e, piece) => {
    const { setDraggedPiece, setPieces } = get();
    setDraggedPiece(piece);
    setPieces(get().pieces.map(p => 
      p.id === piece.id ? { ...p, isDragging: true } : p
    ));
  },

  handleDragEnd: () => {
    const { setDraggedPiece, setPieces } = get();
    setDraggedPiece(null);
    setPieces(get().pieces.map(p => ({ ...p, isDragging: false })));
  },

  handleDrop: (e, targetPiece) => {
    e.preventDefault();
    const { draggedPiece, pieces, setPieces, setDraggedPiece, setIsComplete } = get();
    
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
  },

  handlePlayAgain: () => {
    const { setIsComplete, incrementResetCounter } = get();
    setIsComplete(false);
    incrementResetCounter();
  },

  handleNextLevel: () => {
    const { difficulty, setDifficulty } = get();
    const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];
    const currentIndex = DIFFICULTY_ORDER.indexOf(difficulty);
    if (currentIndex < DIFFICULTY_ORDER.length - 1) {
      setDifficulty(DIFFICULTY_ORDER[currentIndex + 1]);
    }
  }
}));

export default usePuzzleStore; 