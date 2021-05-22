import React from "react";
import styles from "./TasksMap.module.css";
import Maps from "../../components/Maps/Maps";
import TasksList from "../../components/TasksList/TasksList";

const TasksMap = (props) => {
  return (
    <div className={styles.TasksMap}>
      <TasksList />
      <Maps />
    </div>
  );
};

export default TasksMap;
