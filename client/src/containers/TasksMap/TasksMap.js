import React, { useState } from "react";
import styles from "./TasksMap.module.css";
import Maps from "../../components/Maps/Maps";
import TasksList from "../../components/TasksList/TasksList";
import tasks from "../../components/TasksList/tasks.json";

const TasksMap = (props) => {
  const [activeDataList, setActiveDataList] = useState(0);

  return (
    <div className={styles.TasksMap}>
      <TasksList tasks={tasks} onActiveDataList={setActiveDataList} />
      <Maps tasks={tasks} activeDataList={activeDataList} />
    </div>
  );
};

export default TasksMap;
