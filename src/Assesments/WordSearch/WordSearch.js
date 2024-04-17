import React, { useState } from "react";

// Example questions for the crossword puzzle
const questions = [
  {
    number: 1,
    direction: "across",
    row: 0,
    col: 0,
    clue: "First question for across",
    answer: "ANSWER1",
  },
  {
    number: 2,
    direction: "down",
    row: 0,
    col: 2,
    clue: "First question for down",
    answer: "ANSWER2",
  },
];

const CrosswordPuzzle = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => ""))
  );

  // Function to handle input changes for each crossword cell
  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? value.toUpperCase() : cell
      )
    );
    setGrid(updatedGrid);
  };

  return (
    <div className="crossword-container">
      <h1>Crossword Puzzle</h1>
      <div className="crossword-layout">
        <div className="crossword-questions">
          {questions.map((question, index) => (
            <div key={index} className="question-container">
              <span>{`${question.number}. ${question.clue}`}</span>
              <input
                style={{ width: "25px" }}
                type="text"
                className="crossword-cell"
                value={grid[question.row][question.col]}
                onChange={(e) =>
                  handleInputChange(question.row, question.col, e.target.value)
                }
                maxLength="1" // Set maxLength to 1 for single character input
              />
            </div>
          ))}
        </div>
        <div className="crossword-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="crossword-row">
              {row.map((cell, colIndex) => (
                <span
                  key={`${rowIndex}-${colIndex}`}
                  className="crossword-cell"
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrosswordPuzzle;
