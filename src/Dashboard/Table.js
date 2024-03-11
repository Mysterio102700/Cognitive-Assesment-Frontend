import React from "react";

const TABLE_HEADS = [
  "Assessment",
  "Attempted",
  "Date",
  "Status",
];

const TABLE_DATA = [
  {
    id: 100,
    assessment: "Assessment 1",
    attempted: true,
    date: "Jun 29, 2022",
    status: "Completed",
    score: 85,
  },
  {
    id: 101,
    assessment: "Assessment 2",
    attempted: false,
    date: "Jun 30, 2022",
    status: "Pending",
    score: null,
  },
  {
    id: 102,
    assessment: "Assessment 3",
    attempted: true,
    date: "Jul 1, 2022",
    status: "Completed",
    score: 92,
  },
  {
    id: 103,
    assessment: "Assessment 3",
    attempted: true,
    date: "Jul 1, 2022",
    status: "Completed",
    score: 92,
  },
  {
    id: 104,
    assessment: "Assessment 4",
    attempted: true,
    date: "Jul 1, 2022",
    status: "Completed",
    score: 92,
  },
  {
    id: 105,
    assessment: "Assessment 5",
    attempted: true,
    date: "Jul 1, 2022",
    status: "Completed",
    score: 92,
  }
];

const Table = () => {
  return (
    <div className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Your Assessments</h4>
      </div>
      <div className="data-table-diagram">
        <table className="table table-striped">
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((dataItem) => (
              <tr key={dataItem.id}>
                <td>{dataItem.assessment}</td>
                <td>{dataItem.attempted ? "Yes" : "No"}</td>
                <td>{dataItem.date}</td>
                <td>
                  <span
                    className={`badge bg-${dataItem.status === "Completed" ? "success" : "warning"}`}
                  >
                    {dataItem.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
