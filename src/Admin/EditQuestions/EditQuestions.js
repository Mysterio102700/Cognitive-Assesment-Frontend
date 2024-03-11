import React, { useEffect, useState } from "react";
import {
  getQuestions,
  insertQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../Api/Questions";
import { getSubjects } from "../../Api/Subjects";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import QuestionGeneration from "./QuestionGeneration";

const EditQuestions = () => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [assignment, setAssignment] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState("");
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [updatedAssignment, setUpdatedAssignment] = useState("");

  const semesters = [1, 2];
  const branches = ["CSE", "CSM", "CSC", "ECE", "EEE", "MECH", "CIVIL"];
  const years = Array.from({ length: 4 }, (_, index) => index + 1);
  const assignments = Array.from({ length: 5 }, (_, index) => index + 1);

  useEffect(() => {
    const getSubjectsData = async () => {
      try {
        const response = await getSubjects({
          year,
          sem: semester,
          Branch: branch,
        });
        setSubjects(response.data.subjects);
      } catch (error) {
        console.log(error);
      }
    };
    getSubjectsData();
  }, [year, semester, branch]);

  useEffect(() => {
    getQuestionsData();
  }, [subject, assignment]);

  const getQuestionsData = async () => {
    const queryParams = { subject, assignment };
    try {
      const response = await getQuestions(queryParams);
      setQuestions(response.data);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };

  const handleInsertQuestion = async () => {
    const insertData = {
      assignment,
      subject,
      questions: newQuestion,
      answer: newAnswer,
    };
    try {
      await insertQuestion(insertData);
      setNewQuestion("");
      setNewAnswer("");
      getQuestionsData();
    } catch (error) {
      console.error("Error inserting question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      getQuestionsData();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdateQuestion = async (questionId) => {
    const data = {
      questionId,
      questions: updatedQuestion,
      answer: updatedAnswer,
      assignment: updatedAssignment,
      subject,
    };
    try {
      await updateQuestion(data);
      setEditingQuestionId("");
      getQuestionsData();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };



  return (
    <section
      className="edit-questions-section py-5"
      style={{ backgroundColor: "#D0C9C2"}}
    >
      <div className="py-3 ">
        {" "} 
        <Link
          to="/AdminDashboard"
          style={{ textDecoration: "none", paddingLeft: "10px" }}
        >
          &gt; Home
        </Link>
      </div>
      <div className="container pt-5">
        <div className="row d-flex justify-content-center align-item-center mb-3">
          <div className="col-md-3">
            <select
              className="form-select mb-2"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={`year-${year}`} value={year}>
                  {`${year} Year`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select mb-2"
              onChange={(e) => setSemester(e.target.value)}
              value={semester}
            >
              <option value="">Semester</option>
              {semesters.map((semester) => (
                <option key={`semester-${semester}`} value={semester}>
                  {`Semester ${semester}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select mb-2"
              onChange={(e) => setBranch(e.target.value)}
              value={branch}
            >
              <option value="">Branch</option>
              {branches.map((branch) => (
                <option key={`${branch}`} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-center align-item-center">
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => setAssignment(e.target.value)}
              value={assignment}
            >
              <option value="">Assignment</option>
              {assignments.map((assignment) => (
                <option key={`assignment-${assignment}`} value={assignment}>
                  {`Assignment ${assignment}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            >
              <option value="">Subject</option>
              {subjects.map((subject) => (
                <option key={`${subject}`} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3 d-flex justify-content-center align-item-center">
          <div className="col-md-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Insert new Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Insert new Answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleInsertQuestion}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {questions.map((question) => (
            <div key={question.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Question: {question.questions}</h5>
                  <h5 className="card-title">Answer: {question.answer}</h5>
                  <div className="">
                    {editingQuestionId === question.id ? (
                      <div className="" style={{ width: "100%" }}>
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
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={updatedAssignment}
                          onChange={(e) => setUpdatedAssignment(e.target.value)}
                          placeholder="Enter updated assignment"
                        />
                        <div className="d-flex flex-column mb-2">
                          <button
                            className="btn btn-outline-success  "
                            type="button"
                            onClick={() => handleUpdateQuestion(question.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                              setEditingQuestionId("");
                              setUpdatedQuestion("");
                              setUpdatedAnswer("");
                              setUpdatedAssignment("");
                            }}
                          >
                            Cancel
                          </button> 
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column">
                        <button
                          className="btn btn-sm btn-outline-primary mb-2"
                          onClick={() => {
                            setEditingQuestionId(question.id);
                            setUpdatedQuestion(question.questions);
                            setUpdatedAnswer(question.answer);
                            setUpdatedAssignment(question.assignment);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger ml-2"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row">
        <QuestionGeneration subject={subject} assignment={assignment} />
        </div>
      </div>
    </section>
  );
};

export default EditQuestions;
