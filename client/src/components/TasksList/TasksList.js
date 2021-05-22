import React from "react";
import styles from "./TasksList.module.css";

const TasksList = (props) => {
  return (
    <section className={styles.TasksList}>
      <div>
        <div>Nick</div>
        <div>Go out with dog.</div>
        <div>data</div>
        <div>10 Coin</div>
      </div>
    </section>
  );
};

export default TasksList;
