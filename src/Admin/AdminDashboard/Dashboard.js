import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const renderComponent = () => {
    return (
      <>
        <section style={{ backgroundColor: "#D0C9C2", height: "100vh" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <Link to="/subject" style={{ textDecoration: "none" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Subject</h5>
                      <p className="card-text">Content related to subject</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-5">
                <Link to="/questions" style={{ textDecoration: "none" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Questions</h5>
                      <p className="card-text">Total number of questions</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return renderComponent();
};

export default Dashboard;
