import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WordSearch.css";
import { getQuestionsData } from "../../Api/Questions";
import { useNavigate } from "react-router-dom"; 


const WordSearch = () => {
  const initialGrid = Array(20).fill(null).map(() => Array(20).fill(""));
  const [grid, setGrid] = useState(initialGrid);
  const [AssignmentData, setAssignmentData] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); // 10 minutes in seconds
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook


  useEffect(() => {
    const fetchWords = async () => {
      const subject = localStorage.getItem("subject");
      const assignment = localStorage.getItem("assignment");
      const que = { subject, assignment };

      try {
        const response = await getQuestionsData(que);
        setAssignmentData(response.data);
        setRemainingWords(
          response.data.map((item) => item.answer.toLowerCase())
        );
        setGameStarted(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (!gameStarted) {
      fetchWords();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0 && remainingWords.length > 0 && !quizComplete) {
        setTimeLeft(timeLeft - 1);
      } else {
        setQuizComplete(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, remainingWords, quizComplete]);

  useEffect(() => {
    const newGrid = [...grid];
    const placedWords = new Set();

    const placeWord = (word) => {
      if (placedWords.has(word)) {
        return;
      }

      const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
      ];

      const maxLength = Math.max(newGrid.length, newGrid[0].length);
      const maxAttempts = 10;

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const [dx, dy] = direction;

        const row = Math.floor(Math.random() * (newGrid.length - dx * (word.length - 1)));
        const col = Math.floor(Math.random() * (newGrid[0].length - dy * (word.length - 1)));

        // Check if the placement is within the bounds of the grid
        if (
          row < 0 ||
          col < 0 ||
          row + dx * (word.length - 1) >= newGrid.length ||
          col + dy * (word.length - 1) >= newGrid[0].length
        ) {
          continue; // Try a different placement
        }

        let validPlacement = true;

        for (let i = 0; i < word.length; i++) {
          const newRow = row + i * dx;
          const newCol = col + i * dy;

          if (newGrid[newRow][newCol] === "" || newGrid[newRow][newCol] === word[i]) {
            newGrid[newRow][newCol] = word[i];
          } else {
            validPlacement = false;
            break;
          }
        }

        if (validPlacement) {
          placedWords.add(word); 
          return;
        }
      }
    };

    remainingWords.forEach((word) => placeWord(word));

    setGrid(newGrid);
  }, [grid, remainingWords]);

  const handleCellClick = (rowIndex, colIndex) => {
    const cell = grid[rowIndex][colIndex];

    if (cell !== "") {
      const isSelected = selectedCells.some(
        (cellInfo) => cellInfo.row === rowIndex && cellInfo.col === colIndex
      );

      if (!isSelected) {
        setSelectedCells([...selectedCells, { row: rowIndex, col: colIndex }]);
      } else {
        setSelectedCells(
          selectedCells.filter(
            (cellInfo) => cellInfo.row !== rowIndex || cellInfo.col !== colIndex
          )
        );
      }

      checkWords();
    }
  };

  const checkWords = () => {
    const currentWord = selectedCells
      .sort((a, b) => a.row - b.row || a.col - b.col)
      .map((cellInfo) => grid[cellInfo.row][cellInfo.col])
      .join("");

    if (remainingWords.includes(currentWord)) {
      setFoundWords([...foundWords, currentWord]);
      setRemainingWords(remainingWords.filter((word) => word !== currentWord));
      setSelectedCells([]);
      setScore(score + 1); 
    }
  };
  useEffect(() => {
    if (quizComplete) {
      const timeout = setTimeout(() => {
        navigate("/Dashboard");
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [quizComplete, navigate]);


  return (
    <>
      <section style={{ backgroundColor: "#D0C9C2", height: "100vh", overflow: "hidden" }}>
        <div className="container-fluid">
          <div className="timer" style={{ position: "absolute", top: "90px", right: "10px" }}>
            Time Left: {formatTime(timeLeft)}
          </div>
          <h1 className="text-center mt-3" style={{ color: "#E5D283" }}>
            Word Search Puzzle
          </h1>
          <div className="row">
            <div className="col-md-8">
              <table className="table table-bordered text-center">
                <tbody>
                  {grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                          className={`${
                            selectedCells.some(
                              (cellInfo) =>
                                cellInfo.row === rowIndex &&
                                cellInfo.col === colIndex
                            )
                              ? "selected"
                              : ""
                          } ${
                            foundWords.includes(cell) ? "found-word-cell" : ""
                          } ${cell === " " ? "active bg-primary" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 ">
              <h2>Words Found:</h2>
              <div className="found-words mirror">
                {foundWords.map((word, index) => (
                  <span key={index} className="found-word">
                    {word}
                  </span>
                ))}
              </div>
              <h2>Words Remaining:</h2>
              <div className="col-md-12 mirror">
                <ul style={{ color: "white" }}>
                  {remainingWords.map((word, index) => (
                    <li key={index}>
                      {index + 1}.{" "}
                      {AssignmentData.map((data) => {
                        if (data.answer === word) {
                          return data.questions;
                        }
                        return null;
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {(quizComplete || timeLeft <= 0) && (
            <div
              className="text-light p-4 d-flex justify-content-center align-items-center"
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "black" }}
            >
              <div>
                <h2>{quizComplete ? "Test Completed" : "Time's Up!"}</h2>
                <p>Your Score is: {score}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const formatTime = (timeLeft) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default WordSearch;
