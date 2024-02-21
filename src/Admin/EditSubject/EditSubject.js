import React, { useEffect, useState } from "react";
import {
  getSubjects,
  insertSubject,
  updateSubject,
  deleteSubject,
} from "../../Api/Subjects";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditSubject.css"; // Import the CSS file where the colors are defined

const EditSubject = () => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [updatedSubject, setUpdatedSubject] = useState("");
  const [editingSubject, setEditingSubject] = useState("");
  const branches = ["CSE", "CSM", "CSC", "ECE", "EEE", "MECH", "CIVIL"];
  const semesters = [1, 2];
  const years = Array.from({ length: 4 }, (_, index) => index + 1);

  const getSubjectsData = async () => {
    const sub = { year, sem: semester, Branch: branch };

    try {
      const response = await getSubjects(sub);
      setSubjects(response.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInsertSubject = async () => {
    try {
      await insertSubject({
        year,
        sem: semester,
        Branch: branch,
        subject: newSubject,
      });
      getSubjectsData();
      setNewSubject("");
    } catch (error) {
      console.error("Error inserting subject:", error);
    }
  };

  const handleDeleteSubject = async (subject) => {
    try {
      await deleteSubject({ year, sem: semester, Branch: branch, subject });
      getSubjectsData();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleUpdateSubject = async (oldSubject) => {
    try {
      await updateSubject({
        year,
        sem: semester,
        Branch: branch,
        oldSubject,
        newSubject: updatedSubject,
      });
      getSubjectsData();
      setEditingSubject("");
      setUpdatedSubject("");
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  useEffect(() => {
    getSubjectsData();
  }, [year, semester, branch]);

  return (
    <section className="edit-subject-section" style={{ height: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center align-items-center mb-3" style={{paddingTop:"10%"}}>
          <div className="col-md-3" >
            <select
              id="years"
              className="form-select"
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
              id="semesters"
              className="form-select"
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
              id="branches"
              className="form-select"
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
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Insert new subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleInsertSubject}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {subjects.map((subject, index) => (
            <div key={index} className="col-md-3 mb-2">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{subject}</h5>
                  {editingSubject === subject ? (
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={updatedSubject}
                        onChange={(e) => setUpdatedSubject(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleUpdateSubject(subject)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary mt-auto mb-2"
                      onClick={() => {
                        setEditingSubject(subject);
                        setUpdatedSubject(subject);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteSubject(subject)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditSubject;
