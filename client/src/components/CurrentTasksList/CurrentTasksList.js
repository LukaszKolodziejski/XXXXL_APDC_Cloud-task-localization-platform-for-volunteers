import React, { useState } from "react";
import styles from "./CurrentTasksList.module.css";
import CurrentSingleTask from "./CurrentSingleTask/CurrentSingleTask";
import TopHeader from "../UX/TopHeader/TopHeader";

const CurrentTasksList = (props) => {
  const headerNames = ["# Number", "LOCATION", "DESCRIPTION", "COINS"];

  const listOfTasks = props.newTasksList.map((task) => (
    <CurrentSingleTask
      key={task.id}
      id={task.id}
      coins={task.coins}
      location={task.location}
      description={task.description}
      onDescription={props.descriptionHandler}
      onActiveDataList={props.onActiveDataList}
      startGettingCoins={props.startGettingCoins}
      onTasksHandler={props.onTasksHandler}
      completedTasks={props.completedTasks}
    />
  ));

  const Info =
    listOfTasks.length === 0 ? (
      <div className={styles.Info}>Click on the map to add tasks.</div>
    ) : null;

  return (
    <section className={styles.CurrentTasksList}>
      <TopHeader styles="NewTasks" names={headerNames} />
      {Info}
      <div>{listOfTasks}</div>
      {listOfTasks.length ? props.children : null}
    </section>
  );
};

export default CurrentTasksList;
