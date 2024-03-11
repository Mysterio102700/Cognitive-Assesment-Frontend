
  import React from "react";
  import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";
  
  const initialData = [
    {
      id: 1,
      assessment: "Assessment 1",
      score: 100,
    },
    {
      id: 2,
      assessment: "Assessment 2",
      score: 80,
    },
    {
      id: 3,
      assessment: "Assessment 3",
      score: 65,
    },
    {
      id: 4,
      assessment: "Assessment 4",
      score: 71,
    },
    {
      id: 5,
      assessment: "Assessment 5",
      score: 50,
    },
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
  
  const MedalsPieChart = () => {
    const data = [...initialData]; // Create a copy of initialData to avoid modifying it
  
    const medalCounts = {
      "🥇 Gold": 0,
      "🥈 Silver": 0,
      "🥉 Bronze": 0,
    };
  
    data.forEach((item) => {
      const medal = getMedal(item.score);
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
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Your Medals</h5>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => {
                  return `${value} (${entry.payload.value})`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default MedalsPieChart;
  
