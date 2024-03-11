import React, { useState } from "react";
import { questionGeneration, sendGeneratedData } from "../../Api/Questions";

const QuestionGeneration = ({ subject, assignment }) => {
  const [paragraph, setParagraph] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [insertionSuccess, setinsertionSuccess] = useState("");

  const generate = async () => {
    try {
      setLoading(true);
      const response = await questionGeneration({ paragraph });
      const questionData = response.data;
      console.log(questionData);
      setGeneratedQuestions(questionData);
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendGenerateddata = async () => {
    const dataToSend = generatedQuestions.map((question) => ({
      assignment: assignment,
      subject: subject,
      question: question.question,
      answer: question.answer,
    }));

    console.log(dataToSend);

    try {
      const response = await sendGeneratedData(dataToSend);
      setinsertionSuccess(response.data.message);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    setEditingQuestionIndex(index);
    const question = generatedQuestions[index];
    setUpdatedQuestion(question.question);
    setUpdatedAnswer(question.answer);
  };

  const handleCancelEdit = () => {
    setEditingQuestionIndex(null);
    setUpdatedQuestion("");
    setUpdatedAnswer("");
  };

  const handleSaveEdit = (index) => {
    setEditingQuestionIndex(null);
    setUpdatedQuestion("");
    setUpdatedAnswer("");
  };

  const handleDelete = (index) => {};

  return (
    <>
      <div className="row mb-2 d-flex justify-content-center align-item-center">
        <textarea
          className="form-control mb-3 mirror"
          name=""
          id=""
          cols="30"
          rows="10"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        ></textarea>
        <button className="form-control " onClick={generate}>
          Generate
        </button>
      </div>
      <div className="row">
        {loading ? (
          <div className="text-center mt-3">Loading...</div>
        ) : (
          generatedQuestions.map((question, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Question: {question.question}</h5>
                  <h5 className="card-title">Answer: {question.answer}</h5>
                  {editingQuestionIndex === index ? (
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={updatedQuestion}
                        onChange={(e) => setUpdatedQuestion(e.target.value)}
                        placeholder="Enter updated question"
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={updatedAnswer}
                        onChange={(e) => setUpdatedAnswer(e.target.value)}
                        placeholder="Enter updated answer"
                      />

                      <div className="d-flex flex-column mb-2">
                        <button
                          className="btn btn-outline-success mb-2"
                          onClick={() => handleSaveEdit(index)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column">
                      <button
                        className="btn btn-sm btn-outline-primary mb-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger ml-2"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {generatedQuestions.length > 0 && (
          <button className="btn btn-primary" onClick={sendGenerateddata}>
            Send Data
          </button>
        )}
      </div>
      <h3>{insertionSuccess}</h3>
    </>
  );
};

export default QuestionGeneration;
