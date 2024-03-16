import React, { useEffect, useState } from "react";
import { getResults } from "../Api/Results";

const Table = ({ subjects }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const AssignmentNo = Array.from({ length: 5 }, (_, index) => index + 1);

  useEffect(() => {
    const getScoreData = async () => {
      const pinno = localStorage.getItem("pinno");
      try {
        const response = await getResults(pinno);
        setScoreData(response.data);
      } catch (error) {
        console.error("Error fetching score data:", error);
      }
    };

    getScoreData();
  }, []);

  const isAssignmentAttempted = (subjectName, assignmentNumber) => {
    const subject = scoreData.find((item) => item.subject === subjectName);
    if (!subject) {
      return false;
    }

    const assignmentAttempt = subject.assignments.find(
      (assignment) => assignment.assignment === assignmentNumber
    );
    return !!assignmentAttempt;
  };

  const toggleRowExpansion = (subjectIndex) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(subjectIndex)
        ? prevExpandedRows.filter((id) => id !== subjectIndex)
        : [...prevExpandedRows, subjectIndex]
    );
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Attempt</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject, subjectIndex) => (
          <React.Fragment key={subjectIndex}>
            <tr>
              <td>{subject}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => toggleRowExpansion(subjectIndex)}
                >
                  {expandedRows.includes(subjectIndex) ? "-" : "+"}
                </button>
              </td>
            </tr>
            {expandedRows.includes(subjectIndex) && (
              <React.Fragment>
                {AssignmentNo.map((assignment) => (
                  <tr
                    key={`assignment-${subjectIndex}-${assignment}`}
                    className={isAssignmentAttempted(subject, assignment) ? "table-success" : "table-danger"}
                  >
                    <td>Assignment-{assignment}</td>
                    <td>
                      {isAssignmentAttempted(subject, assignment)
                        ? "Attempted"
                        : "Not Attempted"}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
