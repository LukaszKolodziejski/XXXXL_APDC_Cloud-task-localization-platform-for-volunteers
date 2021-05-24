import React from "react";
import styles from "./TasksList.module.css";
import ListTasksHeader from "./ListTasksHeader/ListTasksHeader";
import SingleTask from "./SingleTask/SingleTask";
// import tasks from "./tasks.json";

const TasksList = (props) => {
  const addTask = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    console.log(date);
  };

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
      <ListTasksHeader />
      <div>{listOfTasks}</div>
    </section>
  );
};

export default TasksList;
