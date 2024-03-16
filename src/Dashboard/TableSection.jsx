import React, { useState } from "react";
import { ExpendableButton } from "./ExpendableButton";
import { TableRow } from "./TableRow";
import useOpenController from "./useOpenController";

export const TableSection = ({ personDetails, index, subjectData }) => {
  const [subjects, setsubjects] = useState(subjectData)
  console.log(subjects)
  const { isOpen, toggle } = useOpenController(false);
  console.log(subjects)
  return (
    <tbody>
      <tr>
        <td className="button-td">
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>
          {subjects.map((subject) => (
              <b className="text-primary">{subject}</b>
          ))}
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      {isOpen && <TableRow personDetails={personDetails} />}
    </tbody>
  );
};
