import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const Graph = () => {
  const data = [
    {
      "name": "Assessment 1",
      "uv": 91,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Assessment 2",
      "uv": 95,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Assessment 3",
      "uv": 80,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Assessment 4",
      "uv": 70,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Assessment 5",
      "uv": 79,
      "pv": 4800,
      "amt": 2181
    }
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Graph</h5>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
            <ReferenceLine y={100} label="Max" stroke="red" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
