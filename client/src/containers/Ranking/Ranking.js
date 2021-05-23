import React from "react";
import styles from "./Ranking.module.css";
import RankingList from "../../components/RankingList/RankingList";

const Ranking = (props) => {
  return (
    <div className={styles.Ranking}>
      <RankingList />
    </div>
  );
};

export default Ranking;
