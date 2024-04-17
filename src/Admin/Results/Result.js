import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubjects } from "../../Api/Subjects";
import { getResults } from "../../Api/Results";

const Result = () => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [pinno, setPinno] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [assignment, setAssignment] = useState("");
  const [subject, setSubject] = useState("");
  const [results, setResults] = useState([]);
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

  const getResultsData = async () => {
    const data = {
      year,
      semester,
      branch,
      assignment,
      subject,
      pinno,
    };
    try {
      const response = await getResults(data);
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchResults = async () => {
    try {
      const response = await getResults({ pinno });
      setResults(response.data);
    } catch (error) {
      console.log(error);
      alert("No record found");
    }
  };

  return (
    <>
      <section
        className="edit-questions-section py-5"
        style={{ backgroundColor: "#D0C9C2" }}
      >
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => setYear(e.target.value)}
                value={year}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option
                    key={`year-${year}`}
                    value={year}
                  >{`${year} Year`}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => setSemester(e.target.value)}
                value={semester}
              >
                <option value="">Semester</option>
                {semesters.map((semester) => (
                  <option
                    key={`semester-${semester}`}
                    value={semester}
                  >{`Semester ${semester}`}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
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

          <div className="row mt-3">
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) => setAssignment(e.target.value)}
                value={assignment}
              >
                <option value="">Assignment</option>
                {assignments.map((assignment) => (
                  <option
                    key={`assignment-${assignment}`}
                    value={assignment}
                  >{`Assignment ${assignment}`}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
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
          <div className="row mt-3 d-flex justify-content-center">
            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={getResultsData}
              >
                Search
              </button>
            </div>
          </div>

          <div className="row mt-3  d-flex justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by pin-no"
                  value={pinno}
                  onChange={(e) => setPinno(e.target.value)}
                />
                <button className="btn btn-primary" onClick={searchResults}>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            {results.map((result, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Pin-no: <span style={{color:"red"}}>{result.pinno}</span>
                    </h5>
                    <h5 className="card-title">
                      Assignment: <span style={{color:"red"}}>{result.assignment}</span>
                    </h5>
                    <h5 className="card-title">
                      Marks: <span style={{color:"red"}}>{result.subject}</span>
                    </h5>

                    <h5 className="card-title">
                      Marks: <span style={{color:"red"}}>{result.marks}</span>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Result;
