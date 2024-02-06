import React, { useEffect, useState } from "react";
import "./Quiz.css";
import "bootstrap/dist/css/bootstrap.css";
import { getQuestionsData } from "../../Api/Questions";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false); // New state variable

  useEffect(() => {
    // Fetch questions when the component mounts
    const subject = localStorage.getItem("subject");
    const assignment = localStorage.getItem("assignment");
    const fetchQuestions = async () => {
      const que = { subject, assignment };
      console.log(que);
      try {
        const response = await getQuestionsData(que);
        const assignmentData = response.data[0];

        const questions = Object.keys(assignmentData.questions).map(
          (question) => ({
            question: question,
            answer: assignmentData.questions[question],
          })
        );
        console.log(questions);
        setQuestions(questions);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const shuffleQuestions = (array) => {
    // Shuffles an array using the Fisher-Yates algorithm
    let currentIndex = array.length,
      randomIndex,
      temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

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
      // If there are more questions, move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz is complete, no more questions
      // You can add your own logic here for what to do when the quiz ends
      setQuizComplete(true); // Set quizComplete to true
    }
  };

  const renderQuestion = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (quizComplete) {
      return (
        <div style={{ backgroundColor: "#4F709C" }}>
          <h2 style={{ backgroundColor: "#4F709C" }}>Quiz Complete</h2>
          <p style={{ backgroundColor: "#4F709C" }}>Your Score is: {score}</p>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div style={{ backgroundColor: "#4F709C" }}>
        <h2 style={{ color: "#E5D283", backgroundColor: "#4F709C" }}>
          {currentQuestion.question}
        </h2>
        <input
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="Your Answer"
          className="form-control"
          style={{ width: "50%", marginLeft: "25%" }}
        />
        <p style={{ backgroundColor: "#4F709C" }}>Score: {score}</p>
        <button onClick={nextQuestion}>Next Question</button>
      </div>
    );
  };

  return (
    <>
      <section
        className="quiz"
        style={{ backgroundColor: "#000000", height: "100vh", padding: "5%" }}
      >
        <div className="container">
          <h1 style={{ backgroundColor: "#4F709C" }}>Quiz</h1>
          {renderQuestion()}
        </div>
      </section>
    </>
  );
};

export default Quiz;
