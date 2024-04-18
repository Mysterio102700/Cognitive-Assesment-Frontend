import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { getResults } from "../Api/Results";

const MedalsPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const pinno = localStorage.getItem("pinno");
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await getResults({ pinno });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getMedal = (score) => {
    if (score >= 10) {
      return "🥇 Gold";
    } else if (score >= 8) {
      return "🥈 Silver";
    } else if (score >= 6) {
      return "🥉 Bronze";
    } else {
      return "No Medal";
    }
  };

  const medalCounts = {
    "🥇 Gold": 0,
    "🥈 Silver": 0,
    "🥉 Bronze": 0,
  };

  data.forEach((item) => {
    console.log(item.marks)
    const medal = getMedal(parseInt(item.marks)); 
    if (medal !== "No Medal") {
      medalCounts[medal]++;
    }
  });

  const pieData = Object.keys(medalCounts).map((medal) => ({
    name: medal,
    value: medalCounts[medal],
  }));

  const COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">Your Medals</h5>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => {
                return `${value} (${entry.payload.value})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center mt-2">Total Medals: {data.length}</p>
      </div>
    </div>
  );
};

export default MedalsPieChart;
