import React from "react";
import AreaCards from "./AreaCards";
import MedalsPieChart from "./MedalsPieChart";
import MyPieChart from "./MyPieChart";
import Graph from "./Graph";
import Table from "./Table";
import AreaProgressChart from "./AreaProgressChart";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="">
              <AreaCards />
            </div>
          </div>
        </div>
        {/* <>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <MedalsPieChart />
            </div>
          </div>
        </div>
        </> */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <Table />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <MyPieChart />
            </div>
          </div>
        </div>
        <div className="col-md-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
