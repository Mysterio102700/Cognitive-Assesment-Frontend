import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getFeedbackData } from "../../Api/Feedback";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeedbackData();
        setFeedbacks(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggle = (id) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  const filteredFeedbacks = selectedSubject
    ? feedbacks.filter((feedback) => feedback.subject === selectedSubject)
    : feedbacks;

  return (
    <section
      className="edit-subject-section"
      style={{
        backgroundColor: "#D0C9C2",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div
          className="row justify-content-center mb-3"
          style={{ paddingTop: "10%" }}
        >
          <div className="col-md-10">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((feedback) => (
                  <React.Fragment key={feedback.id}>
                    <tr>
                      <td>
                        <button
                          className="btn btn-link"
                          onClick={() => toggle(feedback.id)}
                        >
                          <FontAwesomeIcon
                            icon={isOpen[feedback.id] ? faAngleUp : faAngleDown}
                          />
                        </button>
                      </td>
                      <td>{feedback.name}</td>
                      <td>{feedback.email}</td>
                      <td>
                        <span>{feedback.subject}</span>
                      </td>
                    </tr>
                    {isOpen[feedback.id] && (
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <p>Feedback: {feedback.feedback}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;
