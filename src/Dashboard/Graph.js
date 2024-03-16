import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression from "regression";

const Graph = () => {
  const data = [
    {
      assignment: 1,
      subject: "maths",
      marks: 10,
    },
    {
      assignment: 2,
      subject: "maths",
      marks: 10,
    },
    {
      assignment: 3,
      subject: "maths",
      marks: 10,
    },
    {
      assignment: 4,
      subject: "maths",
      marks: 10,
    },
    {
      assignment: 5,
      subject: "maths",
      marks: 10,
    },
    {
      assignment: 1,
      subject: "english",
      marks: 10,
    },
    {
      assignment: 2,
      subject: "english",
      marks: 4,
    },
    {
      assignment: 3,
      subject: "english",
      marks: 4,
    },
    {
      assignment: 4,
      subject: "english",
      marks: 1,
    },
    {
      assignment: 5,
      subject: "english",
      marks: 5,
    },
  ];

  const maxAssignment = Math.max(...data.map(entry => entry.assignment));

  // Calculate averages directly in the component body
  const averages = [];
  for (let i = 1; i <= maxAssignment; i++) {
    const assignmentData = data.filter(entry => entry.assignment === i);
    const totalMarks = assignmentData.reduce((total, entry) => total + entry.marks, 0);
    const averagePercentage = assignmentData.length === 0 ? 0 : (totalMarks / (assignmentData.length * 10)) * 100; // Considering each mark out of 10
    averages.push({ assignment: i, averagePercentage });
  }

  // Calculate linear regression
  const regressionData = averages.map(entry => [entry.assignment, entry.averagePercentage]);
  const result = regression.linear(regressionData);
  const slope = result.equation[0];
  const intercept = result.equation[1];

  // Generate points for regression line
  const regressionLine = [];
  for (let i = 1; i <= maxAssignment; i++) {
    const x = i;
    const y = slope * x + intercept;
    regressionLine.push({ assignment: x, averagePercentage: y });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Graph</h5>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={averages} // Use calculated averages directly
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="assignment" tickFormatter={val => val} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <ReferenceLine
              y={100}
              label="Max"
              stroke="red"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="averagePercentage"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              data={regressionLine}
              dataKey="averagePercentage"
              stroke="green"
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
