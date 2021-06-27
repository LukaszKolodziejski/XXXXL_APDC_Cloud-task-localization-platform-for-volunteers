import React from "react";
import styles from "./NewTasksList.module.css";
import NewSingleTask from "./NewSingleTask/NewSingleTask";
import TopHeader from "../UX/TopHeader/TopHeader";

const NewTasksList = (props) => {
  const headerNames = ["# Number", "LOCATION", "DESCRIPTION", "COINS"];

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

  const Info =
    listOfTasks.length === 0 ? (
      <div className={styles.Info}>Click on the map to add tasks.</div>
    ) : null;

  return (
    <section className={styles.NewTasksList}>
      <TopHeader styles="NewTasks" names={headerNames} />
      {Info}
      <div>{listOfTasks}</div>
      {listOfTasks.length ? props.children : null}
    </section>
  );
};

export default NewTasksList;
