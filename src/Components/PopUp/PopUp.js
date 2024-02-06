import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopUp.css";
import { useNavigate } from "react-router-dom";
import { getQuestionsData } from "../../Api/Questions";
import Quiz from "../../Assesments/Quiz/Quiz";

const PopUp = ({ open, onClose, subject }) => {
  const [oneClick, setOneClick] = useState(false);
  const Assignments = Array.from({ length: 5 }, (_, index) => index + 1);
  const components = ["quiz", "wordsearch","MissingWords"];
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setOneClick(true);
    onClose();
  };

  const redirect = (assignment) => {
    localStorage.setItem("assignment",assignment);
    const randomComponent =
      components[Math.floor(Math.random() * components.length)];
    navigate(`/${randomComponent}`);
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="popup-overlay">
        <div className="confirmation-card container bg-light shadow">
          <div className="confirmation-heading">Assignment</div>
          <div className="seats row">
            {Assignments.map((assignment) => (
              <div key={`assignment-${assignment}`} className="col-md-4 mb-2">
                <button
                  onClick={() => redirect(assignment)}
                  className="btn btn-dark btn-lg form-control"
                >{`Assignment-${assignment}`}</button>
              </div>
            ))}
          </div>
          <div className="row">
            <button
              className="btn btn-secondary close-button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
