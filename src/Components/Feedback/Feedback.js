import React, { useState } from "react";
import { sendingFeedback } from "../../Api/Feedback";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Feedback.css"; // Assuming you have a Feedback.css file for custom styles

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setstatus] = useState("")

  const handleSubmit = async () => {
    const data = { name, email,subject, feedback };
    try {
      const response = await sendingFeedback(data);
      setstatus(response);
    } catch (error) {
      console.log(error.message);
    }
    setName("");
    setEmail("");
    setSubject("");
    setFeedback("");
  };

  return (
    <div className="login-box mirror">
      <h2>Feedback Form</h2>
      <div className="user-box">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Name:</label>
      </div>
      <div className="user-box">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email:</label>
      </div>
      <div className="user-box">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label>Subject:</label>
      </div>
      <div className="user-box">
        <textarea
          className="form-control"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          required
        ></textarea>
        <label>Feedback:</label>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="m-2 rounded p-2 text-white bg-primary" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>
      <span className="text-center">{status}</span>
    </div>
  );
};

export default Feedback;
