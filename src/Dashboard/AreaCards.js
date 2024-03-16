import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { areaChartResults } from "../Api/Results";
import Table from "./Table";

const AreaCards = ({ subjects }) => {
  const AreaCard = ({ colors, correctAnswers, totalQuestions, cardInfo }) => {
    const correctValue = (correctAnswers / 10) * 360;
    const incorrectValue = 360 - correctValue;

    const data = [
      { name: "Incorrect", value: incorrectValue },
      { name: "Correct", value: correctValue },
    ];

    const renderTooltipContent = (value) => {
      return `${value} answers`;
    };

    return (
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{cardInfo.title}</h5>
            <p className="card-text">{cardInfo.text}</p>
            <div className="area-card-chart">
              <PieChart width={100} height={100}>
                <Pie
                  data={data}
                  cx={50}
                  cy={45}
                  innerRadius={20}
                  fill="#e4e8ef"
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={-270}
                  endAngle={150}
                  stroke="none"
                >
                  {colors.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={renderTooltipContent} />
              </PieChart>
            </div>
            <p className="card-text">{cardInfo.value}</p>
          </div>
        </div>
      </div>
    );
  };

  AreaCard.propTypes = {
    colors: PropTypes.array.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    cardInfo: PropTypes.object.isRequired,
  };

  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    const scoreDetails = async () => {
      const branch = localStorage.getItem("branch");
      const pinno = localStorage.getItem("pinno");

      try {
        if (subjects.length > 0) {
          const data = { pinno, branch, subjects };
          const response = await areaChartResults(data);
          setScoreData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    scoreDetails();
  }, [subjects]);

  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          <div className="container">
            <div className="row">
              {scoreData.map((item, index) => (
                <AreaCard
                  key={index}
                  colors={["#e4e8ef", "#475be8"]}
                  correctAnswers={item.marks}
                  totalQuestions={10}
                  cardInfo={{
                    title: item.subject,
                    text: `Assignment-${item.max_assignment}`,
                    value: `${item.marks}/10`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaCards;
