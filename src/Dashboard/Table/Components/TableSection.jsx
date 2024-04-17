import React, { useState, useEffect } from "react";
import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "../Hooks/useOpenController";
import { getResults } from "../../../Api/Results";
import "./Table.css";

const TableSection = ({ subject }) => {
  const { isOpen, toggle } = useOpenController(false);
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    const getScoreData = async () => {
      const pinno = localStorage.getItem("pinno");
      try {
        const response = await getResults({ pinno });
        if (response && response.data) {
          setScoreData(response.data);
        } else {
          console.error("Error: Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching score data:", error);
      }
    };

    getScoreData();
  }, []);

  const assignments = [];
  for (let i = 1; i <= 5; i++) {
    assignments.push({
      id: i,
      assignment: `Assignment ${i}`,
      completed: false,
    });
  }

  scoreData.forEach((assignment) => {
    if (assignment.subject === subject && assignment.assignment <= 5) {
      assignments[assignment.assignment - 1].completed = true;
    }
  });

  return (
    <>
          <tr className="trow" colSpan={12}>
            <td className="button-td">
              <ExpendableButton isOpen={isOpen} toggle={toggle} />
            </td>
            <td>
              <b>{subject}</b>
            </td>
            <td colSpan={4}></td>
            <td>
              <b>Attempt</b>
            </td>
          </tr>
          {isOpen &&
            assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td colSpan={1}></td>

                <td colSpan={4}>{assignment.assignment}</td>


                <td colSpan={4}
                  className={
                    assignment.completed ? "text-success" : "text-danger"
                  }
                >
                  {assignment.completed ? "Completed" : "Not Completed"}
                </td>
              </tr>
            ))}
    </>
  );
};

export default TableSection;
