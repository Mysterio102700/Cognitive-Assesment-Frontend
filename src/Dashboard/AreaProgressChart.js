import React from "react";

const data = [
  {
    id: 1,
    assessment: "Assessment 1",
    score: 91,
  },
  {
    id: 2,
    assessment: "Assessment 2",
    score: 95,
  },
  {
    id: 3,
    assessment: "Assessment 3",
    score: 50,
  },
  {
    id: 4,
    assessment: "Assessment 4",
    score: 70,
  },
  {
    id: 5,
    assessment: "Assessment 5",
    score: 79,
  }
];

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

const AreaProgressChart = () => {
  return (
    <div className="card shadow">
      <div className="container mt-4">
        <h4 className="mb-4">Student Performance</h4>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {data.map((item) => (
            <div key={item.id} className="col">
              <div className="card">
                <div className="card-body">
                  <p className="mb-1">{item.assessment}</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${item.score}%` }}
                      aria-valuenow={item.score}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {item.score}%
                    </div>
                  </div>
                  <div className="mt-1">{getMedal(item.score)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaProgressChart;
