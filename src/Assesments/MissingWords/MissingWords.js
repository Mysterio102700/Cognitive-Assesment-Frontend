import React ,{useEffect,useState}from "react";
import "./MissingWords.css"

const MissingWords = () => {
  const questions = [
    {
      question: "1. What is the C keyword for declaring a function?",
      answerWithMissingLetters: "Answer: V_I_",
      correctAnswer: "VOID",
    },
    {
      question: "2. Which C keyword is used to terminate a loop prematurely?",
      answerWithMissingLetters: "Answer: B_E_K",
      correctAnswer: "BREAK",
    },
    {
      question: "3. Loop that runs until a condition is false?",
      answerWithMissingLetters: "Answer: W_I_E",
      correctAnswer: "WHILE",
    },
    {
      question: "4. Which operator is used for equality comparison?",
      answerWithMissingLetters: "Answer: E_U_L",
      correctAnswer: "EQUAL",
    },
    {
      question: "5. Which function is used to read input from the keyboard?",
      answerWithMissingLetters: "Answer: S_A_F",
      correctAnswer: "SCANF",
    },
    {
      question:
        "6. Which function is used to allocate memory for an array of an elements?",
      answerWithMissingLetters: "Answer: C_L_O_",
      correctAnswer: "CALLOC",
    },
    {
      question: "7. Which keyword is used to define a macro?",
      answerWithMissingLetters: "Answer: _D_F_N_",
      correctAnswer: "#DEFINE",
    },
    {
      question: "8. What is the purpose of ELSE keyword?",
      answerWithMissingLetters: "Answer: A_T_R_A_I_E",
      correctAnswer: "ALTERNATIVE",
    },
    {
      question: "9. The operator || (double vertical bar) indicates?",
      answerWithMissingLetters: "Answer: L_G_C_L_R",
      correctAnswer: "LOGICALOR",
    },
    {
      question: "10. What is the purpose BREAK keyword?",
      answerWithMissingLetters: "Answer: T_R_I_A_E",
      correctAnswer: "TERMINATE",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [userAnswers, setUserAnswers] = useState(
    Array(currentQuestion.correctAnswer.length).fill("")
  );
  const [savedAnswers, setSavedAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [answerSaved, setAnswerSaved] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = event.target.value;

    // Move cursor to the next space
    if (index < newAnswers.length - 1 && event.target.value !== "") {
      document.getElementById(`answer-${index + 1}`).focus();
    }

    setUserAnswers(newAnswers);
    setAnswerSaved(false); // Reset the saved status when the answer is changed
  };

  const handleSaveClick = () => {
    setSavedAnswers((prevSavedAnswers) => {
      const newSavedAnswers = [...prevSavedAnswers];
      newSavedAnswers[currentQuestionIndex] = userAnswers.join("");
      setAnswerSaved(true); // Mark the answer as saved
      return newSavedAnswers;
    });
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswers(
        Array(questions[currentQuestionIndex + 1].correctAnswer.length).fill("")
      );
      setAnswerSaved(false); // Reset the saved status for the new question
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswers(savedAnswers[currentQuestionIndex - 1].split(""));
      setAnswerSaved(false); // Reset the saved status for the previous question
    }
  };

  const handleSubmitClick = () => {
    // Perform any necessary actions before submitting (e.g., checking answers)
    // For now, you can add your submission logic here.

    // If you want to keep track of test submission without any pop-up or action:
    setTestSubmitted(true);
  };

  return (
    <>
      <div className="main-container">
        <h1>C Programming Assessment</h1>
        <h3>Fill in the Blanks</h3>

        <div className="question-container">
          <div>
            <p>{currentQuestion.question}</p>
          </div>
          <div className="answers">
            <p>
              {currentQuestion.answerWithMissingLetters.replace(
                /_/g,
                (_, index) => userAnswers[index] || "_"
              )}
            </p>
            {userAnswers.map((answer, index) => (
              <input
                id={`answer-${index}`}
                key={index}
                type="text"
                value={answer}
                onChange={(event) => handleAnswerChange(index, event)}
                placeholder="_"
              />
            ))}
          </div>
          <div className="button-container">
            <button
              onClick={handleSaveClick}
              className={answerSaved ? "saved" : ""}
            >
              {answerSaved ? "Answer Saved" : "Save Answer"}
            </button>
            <button
              onClick={handlePreviousClick}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={handleSubmitClick}>Submit Test</button>
            ) : (
              <button
                onClick={handleNextClick}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MissingWords;
