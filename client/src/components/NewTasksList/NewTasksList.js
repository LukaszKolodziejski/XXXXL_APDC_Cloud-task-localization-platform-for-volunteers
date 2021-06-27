import React from "react";
import styles from "./NewTasksList.module.css";
import NewSingleTask from "./NewSingleTask/NewSingleTask";
import TopHeader from "../UX/TopHeader/TopHeader";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const NewTasksList = (props) => {
  const dispatch = useDispatch();

  const onSaveTasksList = (tasksList) =>
    dispatch(actionCreators.saveTasksList(tasksList));

  //TODO: przenieść logike i BTN do NewTasksMap
  //TODO: creatorId >> to obecnie zalogowany
  //TODO: creatorId & 'name' dla wszystkich >> zmienić w firebase jak tast.json
  //TODO: New TASK widoczne tylko jak jestem zalogowany

  const saveTasksHandler = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const savedTasksList = {
      creatorId: "-MXviEpTOOJMNC5QLaiN",
      name: "Staci",
      status: "AVAILABLE",
      coins: props.newTasksList.length,
      data: props.newTasksList,
      expiryDate: date,
      playerName: "",
      playerId: "",
      completedTasks: 0,
    };
    onSaveTasksList(savedTasksList);
  };

  const headerNames = ["# Number", "LOCATION", "DESCRIPTION", "COINS"];

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
      <TopHeader styles="NewTasks" names={headerNames} />
      <div>{listOfTasks}</div>
      {listOfTasks.length ? (
        <button className={styles.SaveBtn} onClick={saveTasksHandler}>
          Save new tasks
        </button>
      ) : null}
    </section>
  );
};

export default NewTasksList;
