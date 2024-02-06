// import React, { useState, useEffect,useRef  } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./WordSearch.css";

// const WordSearch = () => {
//   const initialGrid = Array(20)
//     .fill(null)
//     .map(() => Array(20).fill(""));
//   const [grid, setGrid] = useState(initialGrid);

//   const [selectedCells, setSelectedCells] = useState([]);
//   const [foundWords, setFoundWords] = useState([]);
//   const [timer, setTimer] = useState(0);
//   const [remainingWords, setRemainingWords] = useState([
//     "HTML",
//     "CSS",
//     "JavaScript",
//     "SQL",
//     "Node.js",
//     "HTTPS",
//     "Heroku",
//   ]);

//   const timerRef = useRef(0);

//   useEffect(() => {
//     const newGrid = [...grid];
//     const placedWords = new Set(); // Track placed words to avoid repetition

//     const placeWord = (word) => {
//       if (placedWords.has(word)) {
//         return; // Word is already placed
//       }

//       const directions = [
//         [0, 1], // right
//         [1, 0], // down
//         [1, 1], // diagonal right-down
//       ];

//       const maxLength = Math.max(newGrid.length, newGrid[0].length);
//       const maxAttempts = 10; // Number of attempts to place a word

//       for (let attempt = 0; attempt < maxAttempts; attempt++) {
//         const direction =
//           directions[Math.floor(Math.random() * directions.length)];
//         const [dx, dy] = direction;

//         const row = Math.floor(
//           Math.random() * (newGrid.length - dx * (word.length - 1))
//         );
//         const col = Math.floor(
//           Math.random() * (newGrid[0].length - dy * (word.length - 1))
//         );

//         let validPlacement = true;

//         for (let i = 0; i < word.length; i++) {
//           const newRow = row + i * dx;
//           const newCol = col + i * dy;

//           if (
//             newGrid[newRow][newCol] === "" ||
//             newGrid[newRow][newCol] === word[i]
//           ) {
//             newGrid[newRow][newCol] = word[i];
//           } else {
//             validPlacement = false;
//             break;
//           }
//         }

//         if (validPlacement) {
//           placedWords.add(word); // Mark word as placed
//           return;
//         }
//       }
//     };
//     remainingWords.forEach((word) => placeWord(word));

//     setGrid(newGrid);

//     const intervalId = setInterval(() => {
//       timerRef.current += 1;
//     }, 1000);

//     return () => {
//       // Clear the interval when the component unmounts
//       clearInterval(intervalId);
//     };
//   }, [grid, remainingWords]);

//   const handleCellClick = (rowIndex, colIndex) => {
//     const cell = grid[rowIndex][colIndex];

//     if (cell !== "") {
//       const isSelected = selectedCells.some((cellInfo) =>
//         cellInfo.row === rowIndex && cellInfo.col === colIndex
//       );

//       if (!isSelected) {
//         setSelectedCells([...selectedCells, { row: rowIndex, col: colIndex }]);
//       } else {
//         setSelectedCells(selectedCells.filter((cellInfo) =>
//           cellInfo.row !== rowIndex || cellInfo.col !== colIndex
//         ));
//       }

//       checkWords();
//     }
//   };

//   const checkWords = () => {
//     const currentWord = selectedCells
//       .sort((a, b) => a.row - b.row || a.col - b.col)
//       .map((cellInfo) => grid[cellInfo.row][cellInfo.col])
//       .join("");

//     if (remainingWords.includes(currentWord)) {
//       setFoundWords([...foundWords, currentWord]);
//       setRemainingWords(remainingWords.filter((word) => word !== currentWord));
//       setSelectedCells([]);
//     }
//   };

//   // Check if all words are found
//   useEffect(() => {
//     if (remainingWords.length === 0) {
//       clearInterval(timerRef.current);
//       alert(`Congratulations! You found all the words in ${timerRef.current} seconds.`);
//     }
//   }, [remainingWords]);

//   return (
//     <div className="container1">
//       <h1 className="text-center mt-3">Word Search Puzzle</h1>
//       <div className="row">
//         <div className="col-md-8">
//           <table className="table table-bordered text-center">
//             <tbody>
//               {grid.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {row.map((cell, colIndex) => (
//                     <td
//                       key={colIndex}
//                       onClick={() => handleCellClick(rowIndex, colIndex)}
//                       className={`${
//                         selectedCells.some(
//                           (cellInfo) =>
//                             cellInfo.row === rowIndex && cellInfo.col === colIndex
//                         )
//                           ? "selected"
//                           : ""
//                       } ${
//                         foundWords.includes(cell) ? "found-word-cell" : ""
//                       } ${cell === " " ? "active bg-primary" : ""}`}
//                     >
//                       {cell}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="col-md-4">
//           <h2>Words Found:</h2>
//           <div className="found-words">
//             {foundWords.map((word, index) => (
//               <span key={index} className="found-word">
//                 {word}
//               </span>
//             ))}
//           </div>
//           <h2>Timer: {timerRef.current} seconds</h2>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-4">
//           <h2>Words Remaining:</h2>
//           <ul>
//             {remainingWords.map((word) => (
//               <li key={word}>{word}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WordSearch;

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WordSearch.css";
import { getQuestionsData } from "../../Api/Questions";
// import { getWords } from "../../Api/wordFounder/wordFounder";

const WordSearch = () => {
  const initialGrid = Array(20)
    .fill(null)
    .map(() => Array(20).fill(""));
  const [grid, setGrid] = useState(initialGrid);
  const [AssignmentData, setAssignmentData] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState(
    [].map((word) =>
      word
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .replace(/[<>?,.{}[\]()!@#$%^&* ]/g, "")
    )
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds

  const timerRef = useRef(0);

  useEffect(() => {
    const fetchWords = async () => {
      const subject = localStorage.getItem("subject");
      const assignment = localStorage.getItem("assignment");
      const que = { subject, assignment };
  
      try {
        const response = await getQuestionsData(que);
        const wordsArray = response.data[0];
        const questions = Object.keys(wordsArray.questions).map((question) => ({
          question: question,
          answer: wordsArray.questions[question],
        }));
  
        console.log(questions);
  
        // Extract only the answers from the questions array
        const answers = questions.map((question) => question.answer);
  
        setRemainingWords(answers);
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
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const [dx, dy] = direction;

        const row = Math.floor(
          Math.random() * (newGrid.length - dx * (word.length - 1))
        );
        const col = Math.floor(
          Math.random() * (newGrid[0].length - dy * (word.length - 1))
        );

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

          if (
            newGrid[newRow][newCol] === "" ||
            newGrid[newRow][newCol] === word[i]
          ) {
            newGrid[newRow][newCol] = word[i];
          } else {
            validPlacement = false;
            break;
          }
        }

        if (validPlacement) {
          placedWords.add(word); // Mark word as placed
          return;
        }
      }
    };

    remainingWords.forEach((word) => placeWord(word));

    setGrid(newGrid);

    const intervalId = setInterval(() => {
      if (timerRef.current > 0) {
        timerRef.current -= 1;
        setTimer(timerRef.current);
      } else {
        clearInterval(intervalId);
        alert("Time's up! You have reached 10 minutes.");
      }
    }, 1000);

    timerRef.current = timer; // Initialize timerRef with the initial value

    return () => {
      clearInterval(intervalId);
    };
  }, [grid, remainingWords, timer]);

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
    }
  };

  // useEffect(() => {
  //   if (remainingWords.length === 0) {
  //     clearInterval(timerRef.current);
  //     alert(
  //       `Congratulations! You found all the words in ${Math.floor(
  //         (timer - timerRef.current) / 60
  //       )} minutes and ${timer - timerRef.current} seconds.`
  //     );
  //   }
  // }, [remainingWords]);

  return (
    <div
      className="container1"
      style={{ backgroundColor: "#000000", overflowY: "hidden" }}
    >
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
                      } ${foundWords.includes(cell) ? "found-word-cell" : ""} ${
                        cell === " " ? "active bg-primary" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <h2>Words Found:</h2>
          <div className="found-words">
            {foundWords.map((word, index) => (
              <span key={index} className="found-word">
                {word}
              </span>
            ))}
          </div>
          <h2>
            Timer: {Math.floor(timerRef.current / 60)} minutes{" "}
            {timerRef.current % 60} seconds
          </h2>
          <div className="row">
            <div className="col-md-4">
              <h2>Words Remaining:</h2>
              <ul style={{ color: "white" }}>
                {remainingWords.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
