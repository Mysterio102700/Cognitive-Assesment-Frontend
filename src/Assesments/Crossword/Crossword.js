import React, { useState } from 'react';
import './Crossword.css';

// Example questions for the crossword
const questions = {
  across: [
    { number: 1, clue: 'First question for across', answer: 'ANSWER1' },
    { number: 3, clue: 'Third question for across', answer: 'ANSWER3' },
    { number: 5, clue: 'Fifth question for across', answer: 'ANSWER5' },
  ],
  down: [
    { number: 2, clue: 'Second question for down', answer: 'ANSWER2' },
    { number: 4, clue: 'Fourth question for down', answer: 'ANSWER4' },
  ],
};

const CrosswordPuzzle = () => {
  const initialGrid = Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => ''));

  questions.across.forEach(({ answer, number }, index) => {
    const startRow = Math.floor(Math.random() * (15 - answer.length));
    const startCol = Math.floor(Math.random() * 15);
    answer.split('').forEach((char, i) => {
      initialGrid[startRow + i][startCol] = char.toUpperCase();
    });
  });

  questions.down.forEach(({ answer, number }, index) => {
    const startRow = Math.floor(Math.random() * 15);
    const startCol = Math.floor(Math.random() * (15 - answer.length));
    answer.split('').forEach((char, i) => {
      if (initialGrid[startRow][startCol + i] !== '') {
        initialGrid[startRow][startCol + i] = char.toUpperCase(); 
      } else {
        initialGrid[startRow][startCol + i] = char.toUpperCase(); 
      }
    });
  });

  const [grid, setGrid] = useState(initialGrid);
  const [completed, setCompleted] = useState(false);

  
  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? value.toUpperCase() : cell))
    );
    setGrid(updatedGrid);
  };

  const checkCompletion = () => {
    const flattenedGrid = grid.flat().join('').replace(/\s/g, ''); 
    const allAnswers = [...questions.across.map(q => q.answer), ...questions.down.map(q => q.answer)];
    const completed = allAnswers.every(answer => flattenedGrid.includes(answer.toUpperCase()));
    setCompleted(completed);
  };

  const getCellStyle = (rowIndex, colIndex, cell) => {
    if (cell === '') {
      return {}; 
    }
    const answer = questions.across.find(q => q.row === rowIndex && q.col === colIndex)?.answer || 
                  questions.down.find(q => q.row === rowIndex && q.col === colIndex)?.answer;
    if (cell.toUpperCase() === answer) {
      return { backgroundColor: 'lightgreen' }; 
    } else {
      return { backgroundColor: 'lightcoral' }; 
    }
  };

  return (
    <div className="crossword-container">
      <h1>Crossword Puzzle</h1>
      <div className="crossword-layout">
        <div className="crossword-questions">
          <h2>Across</h2>
          <ul>
            {questions.across.map((question, index) => (
              <li key={index}>
                <strong>{question.number}.</strong> {question.clue}
              </li>
            ))}
          </ul>
          <h2>Down</h2>
          <ul>
            {questions.down.map((question, index) => (
              <li key={index}>
                <strong>{question.number}.</strong> {question.clue}
              </li>
            ))}
          </ul>
        </div>
        <div className="crossword-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="crossword-row">
              {row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  className="crossword-cell"
                  style={getCellStyle(rowIndex, colIndex, cell)}
                  value={cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  maxLength="1"
                  onBlur={checkCompletion}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {completed && <p className="success-message">Congratulations! You completed the crossword puzzle.</p>}
    </div>
  );
};

export default CrosswordPuzzle;
