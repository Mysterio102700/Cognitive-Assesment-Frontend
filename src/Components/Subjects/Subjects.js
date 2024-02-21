import React, { useEffect, useState } from "react";
import { subjectData } from "../../Api/Subjects";
import PopUp from "../PopUp/PopUp";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getSubjects = async () => {
    const year = localStorage.getItem("year");
    const sem = localStorage.getItem("semester");
    const branch = localStorage.getItem("branch");
    const sub = { year, sem, branch };

    try {
      const response = await subjectData(sub);
      setSubjects(response.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleConfirm = (button) => {
    setSelectedSubject(button);
    localStorage.setItem("subject", selectedSubject);
  };

  useEffect(() => {
    getSubjects();
  }, []);
  
  useEffect(() => {
    if (selectedSubject !== null) {
      localStorage.setItem("subject", selectedSubject);
    }
  }, [selectedSubject]);
  
  return (
    <>
      <h1>Subjects</h1>
      <div className="container">
        <div className="row justify-content-center">
          {subjects.map((button, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-12 mb-2">
              <button
                type="button"
                className="btn btn-dark btn-lg form-control"
                onClick={() => toggleConfirm(button)}
              >
                {button}
              </button>
              {selectedSubject === button && (
                <PopUp
                  subject={selectedSubject}
                  open={true}
                  onClose={() => setSelectedSubject(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subjects;
