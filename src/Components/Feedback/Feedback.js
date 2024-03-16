import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send feedback data to the server or perform any desired action
    console.log("Feedback submitted:", { name, email, feedback });
    // Clear form fields after submission
    setName("");
    setEmail("");
    setFeedback("");
  };

  return (
    <div className="container mt-5 mirror">
      <h2 className="text-center mb-4 mt-4">Feedback Form</h2>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="w-50">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">
              Feedback:
            </label>
            <textarea
              className="form-control"
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>
          <div className="text-center mb-3">
            <button type="submit" className="btn btn-primary">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
