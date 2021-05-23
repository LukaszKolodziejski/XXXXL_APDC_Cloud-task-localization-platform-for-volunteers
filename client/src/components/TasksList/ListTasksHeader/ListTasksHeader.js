import React from "react";
import styles from "./styles/ListTasksHeader.module.css";

const ListServersHeader = (props) => {
  return (
    <p className={styles.ListTasksHeader}>
      <span>CREATOR</span>
      <span>TASK STATUS</span>
      <span>EXPIRY DATE</span>
      <span>COINS</span>
    </p>
  );
};

export default ListServersHeader;
