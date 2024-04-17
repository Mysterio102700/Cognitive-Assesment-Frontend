import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export const ExpendableButton = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle}>
      <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
    </button>
  );
};
