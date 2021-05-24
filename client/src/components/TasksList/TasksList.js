import React from "react";
import styles from "./TasksList.module.css";
import TopHeader from "../UX/TopHeader/TopHeader";

import SingleTask from "./SingleTask/SingleTask";
// import tasks from "./tasks.json";

const TasksList = (props) => {
  const addTask = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    console.log(date);
  };

  const headerNames = [
    "CREATOR",
    "TASK STATUS",
    "EXPIRY DATE",
    "COINS TO EARN",
  ];

  const listOfTasks = props.tasks.map((task) => (
    <SingleTask
      key={task.id}
      id={task.id}
      name={task.name}
      status={task.status}
      expiryDate={task.expiryDate}
      coins={task.coins}
      onActiveDataList={props.onActiveDataList}
    />
  ));

  return (
    <section className={styles.TasksList}>
      <TopHeader styles="ListTasks" names={headerNames} />
      <div>{listOfTasks}</div>
    </section>
  );
};

export default TasksList;
