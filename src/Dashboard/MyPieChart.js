import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import { getResults } from "../Api/Results";

const MyPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const pinno = localStorage.getItem("pinno");
      try {
        const response = await getResults({ pinno });
        // Group data by subject and calculate average marks
        const groupedData = groupData(response.data);
        setData(groupedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]; // Define colors for pie chart slices

  const groupData = (data) => {
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.subject]) {
        grouped[item.subject] = { name: item.subject, value: 0, count: 0 };
      }
      grouped[item.subject].value += parseFloat(item.marks); // Add marks to total
      grouped[item.subject].count++; // Increment count for average calculation
    });
    return Object.values(grouped).map((item) => ({
      ...item,
      value: item.value / item.count,
    })); // Calculate average marks
  }; // Define colors for pie chart slices

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    // Calculate average marks as a percentage of 100
    const averagePercentage = ((payload.value / 100) * 100).toFixed(2);

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${averagePercentage}% rate`}</text>
      </g>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="container">
        <div className="card-body">
          <h5 className="card-title">Total Scores</h5>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MyPieChart;
