import React, { useState, useEffect } from "react";
import AreaCards from "./AreaCards";
import MedalsPieChart from "./MedalsPieChart";
import MyPieChart from "./MyPieChart";
import Graph from "./Graph";
import AreaProgressChart from "./AreaProgressChart";
import { subjectData } from "../Api/Subjects";
import Table from "./Table/Components/Table";

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
  }, []);

  return (
    <>
      <h1>Welcome back, {username}!</h1>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <AreaCards subjects={subjects} />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body mb-3">
                <MedalsPieChart />
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 mt-1">
          <div className="col-md-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <MyPieChart />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <Graph />
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 mt-4">
          <div className="col">
            <div className="card shadow-sm ">
              <div className="card-body">
                <AreaProgressChart subjects={subjects} />
              </div>
            </div>
          </div>
          <div className="col">
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
