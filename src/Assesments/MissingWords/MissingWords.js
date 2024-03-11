import React, { useState, useEffect } from "react";
import { getQuestionsData } from "../../Api/Questions";
import { useNavigate } from "react-router-dom";
import { postResults } from "../../Api/Results";

const MissingWords = () => {
  const [words, setWords] = useState([]);
  const [currentWordObj, setCurrentWordObj] = useState({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizComplete, setQuizComplete] = useState(false);
  const navigate = useNavigate();
  const [scorePosted, setScorePosted] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !quizComplete) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        if (!quizComplete) {
          navigate("/Dashboard");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizComplete, navigate]);

  const postScore = async () => {
    const subject = localStorage.getItem("subject");
    const assignment = localStorage.getItem("assignment");
    const branch = localStorage.getItem("branch");
    const pinno = localStorage.getItem("pinno");
    const data = { subject, assignment, branch, pinno, score };
    try {
      const response = await postResults(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (quizComplete && !scorePosted) {
      postScore();
      setScorePosted(true);
    }

    if (quizComplete) {
      const timeout = setTimeout(() => {
        navigate("/Dashboard");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [quizComplete]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const subject = localStorage.getItem("subject");
      const assignment = localStorage.getItem("assignment");
      const que = { subject, assignment };
      try {
        const response = await getQuestionsData(que);
        const questionsData = response.data;
        setWords(questionsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    chooseWord();
  }, [words]);

  const chooseWord = () => {
    if (words.length === 0) return;
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex].answer;
    const wordArray = word.split("");
    const userInputs = [];

    for (let i = 0; i < wordArray.length; i++) {
      if (Math.random() < 0.5) {
        userInputs.push(wordArray[i]);
      } else {
        userInputs.push("");
      }
    }

    setCurrentWordObj({ ...words[randomIndex], userInputs });
  };

  const handleInputChange = (event, index) => {
    const newInputs = [...currentWordObj.userInputs];
    newInputs[index] = event.target.value;
    setCurrentWordObj({ ...currentWordObj, userInputs: newInputs });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userWord = currentWordObj.userInputs.join("").toLowerCase();
    const correctWord = currentWordObj.answer.toLowerCase();

    if (userWord === correctWord) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect! Try again.");
    }

    setCurrentWordObj({});
    chooseWord();
  };

  const renderWordWithMissingLetter = () => {
    if (!currentWordObj.answer) return "";

    const wordArray = currentWordObj.answer.split("");
    const inputs = [];

    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] !== " ") {
        const predefinedValue =
          currentWordObj.userInputs[i] !== undefined
            ? currentWordObj.userInputs[i]
            : "";
        inputs.push(
          <input
            key={i}
            type="text"
            value={predefinedValue}
            onChange={(event) => handleInputChange(event, i)}
            maxLength={1}
            style={{
              width: "50px",
              backgroundColor: "#F8F7EF",
              color: "#2B2925",
              border: "1px solid #D0C9C2",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
            }}
          />
        );
      } else {
        inputs.push(<span key={i}>&nbsp;</span>);
      }
    }

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>{inputs}</div>
    );
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#E8BE71",
      }}
    >
      <div style={{ textAlign: "center", color: "#2B2925" }}>
        <h1>Missing Words Quiz</h1>
        <p>Question: {currentWordObj.questions}</p>
        <form onSubmit={handleSubmit}>
          {renderWordWithMissingLetter()}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
        <p>Score: {score}</p>
        <p>{feedback}</p>
        <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
      </div>
    </section>
  );
};

export default MissingWords;
