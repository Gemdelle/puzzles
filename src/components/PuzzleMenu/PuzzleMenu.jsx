import React from 'react';
import PuzzleCard from '../PuzzleCard/PuzzleCard';
import './PuzzleMenu.css';

const puzzles = [
  {
    id: 1,
    name: "Dinosaurio",
    logoPuzzle: "/images/puzzle-1/puzzle-1.jpg",
    difficultysLogo: [
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png"
    ]
  },
  {
    id: 2,
    name: "Fósil",
    logoPuzzle: "/images/puzzle-2/puzzle-2.jpeg",
    difficultysLogo: [
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png"
    ]
  },
  {
    id: 3,
    name: "Era Mesozoica",
    logoPuzzle: "/images/puzzle-3/puzzle-3.jpg",
    difficultysLogo: [
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png"
    ]
  },
  {
    id: 4,
    name: "Paleontología",
    logoPuzzle: "/images/puzzle-4/puzzle-4.jpg",
    difficultysLogo: [
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png"
    ]
  },
  {
    id: 5,
    name: "Excavación",
    logoPuzzle: "/images/puzzle-5/puzzle-5.jpg",
    difficultysLogo: [
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png"
    ]
  },
  {
    id: 6,
    name: "Museo",
    logoPuzzle: "/images/puzzle-6/puzzle-6.jpg",
    difficultysLogo: [
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png",
      "/images/dificultad/incomplete.png"
    ]
  }
];

const PuzzleMenu = ({ onPuzzleSelect }) => {
  return (
    <div className="puzzle-menu">
      <h1>Selecciona un Puzzle</h1>
      <div className="puzzles-grid">
        {puzzles.map((puzzle) => (
          <PuzzleCard 
            key={puzzle.id} 
            puzzle={puzzle}
            onClick={() => onPuzzleSelect(puzzle)}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleMenu; 