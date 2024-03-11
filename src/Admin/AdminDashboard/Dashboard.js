import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const renderComponent = () => {
    return (
      <>
        <section style={{  backgroundColor: "#D0C9C2"}}>
          <div className="container pt-5">
            <div className="row pt-5" >
              <div className="col-md-4">
                <Link to="/EditSubject" style={{ textDecoration: "none" }}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-center">Subject</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/EditQuestions" style={{ textDecoration: "none" }}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-center">Questions</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/Results" style={{ textDecoration: "none" }}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-center">Results</h5>
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
