import React, { useEffect, useState } from "react";
import { getQuestionsData } from "../../Api/Questions";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Quiz.css";
import { postResults } from "../../Api/Results";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [scorePosted, setScorePosted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const subject = localStorage.getItem("subject");
    const assignment = localStorage.getItem("assignment");

    const fetchQuestions = async () => {
      const que = { subject, assignment };
      try {
        const response = await getQuestionsData(que);
        const questionsData = response.data;
        setQuestions(questionsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !quizComplete) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizComplete]);

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
  }, [quizComplete, navigate, scorePosted]);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    const userEnteredAnswer = userAnswer.toLowerCase();

    if (correctAnswer === userEnteredAnswer) {
      return "Correct!";
    } else {
      return "Incorrect. Try again.";
    }
  };

  const nextQuestion = () => {
    const feedback = checkAnswer();

    if (feedback === "Correct!") {
      setScore(score + 1);
    }

    setResult(feedback);
    setUserAnswer("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <section
      className="quiz d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#F8F7EF", color: "#2B2925", height: "100vh" }}
    >
      <div className="container">
        <h1 className="text-light text-center">Quiz</h1>
        {!quizComplete && timeLeft > 0 && (
          <div
            className="row justify-content-center align-items-center shadow-lg p-3"
            style={{ width: "100%" }}
          >
            <div className="col-md-12 text-center">
              <div className="text-light p-1 d-flex flex-column align-items-center justify-content-center">
                <h2 style={{ color: "#2B2925" }}>
                  {questions[currentQuestionIndex]?.questions}
                </h2>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleAnswerChange}
                  placeholder="Your Answer"
                  className="form-control border border-dark "
                  style={{ width: "50%" }}
                />
                <button
                  className="btn btn-light custom-button mt-3"
                  onClick={nextQuestion}
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        )}

        {(quizComplete || timeLeft <= 0) && (
          <div
            className="text-light p-4 d-flex justify-content-center align-items-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div>
              <h2>{quizComplete ? "Quiz Complete" : "Time's Up!"}</h2>
              <p>Your Score is: {score}</p>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 10,
          borderRadius: 5,
        }}
      >
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toLocaleString("en-US", { minimumIntegerDigits: 2 })}
      </div>
    </section>
  );
};

export default Quiz;
