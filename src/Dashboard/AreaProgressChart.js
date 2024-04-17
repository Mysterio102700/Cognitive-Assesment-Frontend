import React, { useState, useEffect } from "react";
import { getResults } from "../Api/Results";

const AreaProgressChart = ({ subjects }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pinno = localStorage.getItem("pinno");
      try {
        const response = await getResults({ pinno });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getMedal = (score) => {
    if (score >= 80) {
      return "🥇 Gold";
    } else if (score >= 60) {
      return "🥈 Silver";
    } else if (score >= 40) {
      return "🥉 Bronze";
    } else {
      return "No Medal";
    }
  };

  const calculateAverage = (subjectData) => {
    const validAssignments = subjectData.filter((item) => item.assignment <= 5);
    const totalMarks = validAssignments.reduce((acc, item) => acc + parseInt(item.marks), 0);
    const average = totalMarks / Math.min(validAssignments.length, 5) * 10; // Assuming 1 mark = 10%
    return average;
  };

  return (
    <div className="card shadow">
      <div className="container mt-4">
        <h4 className="card-title mb-4">Student Performance</h4>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {subjects.map((subject, index) => {
            const subjectData = data.filter((item) => item.subject === subject);
            const average = calculateAverage(subjectData);
            const medal = getMedal(average);

            return (
              <div key={index} className="col">
                <div className="card">
                  <div className="card-body">
                    <p className="mb-1">{subject}</p>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${average}%` }}
                        aria-valuenow={average}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {`${average}%`}
                      </div>
                    </div>
                    <div className="mt-1">{medal}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AreaProgressChart;
