import React from "react";
import styles from "./styles/NewTasksHeader.module.css";

const NewTasksHeader = (props) => {
  return (
    <p className={styles.NewTasksHeader}>
      <span># Number</span>
      <span>LOCATION</span>
      <span>DESCRIPTION</span>
      <span>COINS</span>
    </p>
  );
};

export default NewTasksHeader;
