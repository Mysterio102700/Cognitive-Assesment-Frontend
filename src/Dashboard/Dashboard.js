import React, { useState, useEffect } from "react";
import AreaCards from "./AreaCards";
import MedalsPieChart from "./MedalsPieChart";
import MyPieChart from "./MyPieChart";
import Graph from "./Graph";
import Table from "./Table";
import AreaProgressChart from "./AreaProgressChart";
import { subjectData } from "../Api/Subjects";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getSubjects = async () => {
      const year = localStorage.getItem("year");
      const sem = localStorage.getItem("semester");
      const branch = localStorage.getItem("branch");
      const sub = { year, sem, branch };

      try {
        const response = await subjectData(sub);
        setSubjects(response.data.subjects);
      } catch (error) {
        console.log(error);
      }
    };

    getSubjects();
  },[]); 
  return (
    <>
      <h1>Welcome back, {username}!</h1>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="">
                <AreaCards subjects={subjects} />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <MedalsPieChart />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <MyPieChart />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <Graph />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <AreaProgressChart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <Table subjects={subjects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
