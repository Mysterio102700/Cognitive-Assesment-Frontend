import React, { useState, useEffect } from "react";
import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "../Hooks/useOpenController";
import { getResults } from "../../../Api/Results";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Table.css"; // Your custom CSS
import TableSection from "./TableSection";

const Table = ({ subjects }) => {
  return (
    <div className="card shadow">
      <div className="container p-4">
        <h4 className="card-title">Status</h4>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th colSpan={12}>Subject</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <TableSection key={index} subject={subject} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
