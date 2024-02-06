import React from "react";
import "./Dashboard.css";
import Graph from "./Graph";
import PieCharts from "./PieCharts";
import SimpleRadar from "./SimpleRadar";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  return (
    <>
      <h1> Hi Welcome <span style={{color:"#D9A0B3"}}>{username}</span></h1>
      <div className="dash">
        <Graph />
        <PieCharts />
        <SimpleRadar />
      </div>
    </>
  );
};

export default Dashboard;
