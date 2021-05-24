import React from "react";
import styles from "./styles/RankingListHeader.module.css";

const RankingListHeader = (props) => {
  return (
    <p className={styles.RankingListHeader}>
      <span># RANK</span>
      <span>PLAYER</span>
      <span>STATUS</span>
      <span>RECEIVED COINS</span>
      <span>COMPLETED ROUND</span>
    </p>
  );
};

export default RankingListHeader;
