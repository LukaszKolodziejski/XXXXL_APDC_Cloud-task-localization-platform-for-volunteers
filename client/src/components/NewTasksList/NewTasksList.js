import React from "react";
import styles from "./NewTasksList.module.css";
import NewTasksHeader from "./NewTasksHeader/NewTasksHeader";
import NewSingleTask from "./NewSingleTask/NewSingleTask";

const NewTasksList = (props) => {
  const addTask = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    console.log(date);
  };

  console.log(props.newTasksList);
  const listOfTasks = props.newTasksList.map((task) => (
    <NewSingleTask
      key={task.id}
      id={task.id}
      coins={task.coins}
      location={task.location}
      description={task.description}
      onDescription={props.descriptionHandler}
    />
  ));

  return (
    <section className={styles.NewTasksList}>
      <NewTasksHeader />
      <div>{listOfTasks}</div>
    </section>
  );
};

export default NewTasksList;
