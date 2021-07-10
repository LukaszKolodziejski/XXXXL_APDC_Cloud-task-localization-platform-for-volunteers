import React, { useState } from "react";
import styles from "./styles/CurrentSingleTask.module.css";

const CurrentSingleTask = React.memo((props) => {
  const {
    id,
    location,
    description,
    coins,
    onActiveDataList,
    startGettingCoins,
    onTasksHandler,
    completedTasks,
  } = props;
  const style = styles.CurrentSingleTask;

  const lat = location.lat.toFixed(3);
  const lng = location.lng.toFixed(3);

  const [disable, setDisable] = useState(true);

  let button;
  if (startGettingCoins) {
    if (completedTasks === id) {
      button = <button onClick={onTasksHandler}>CONFIRM</button>;
    } else if (completedTasks > id) {
      button = null;
    } else {
      button = <button disabled>CONFIRM</button>;
    }
  }

  return (
    <div
      className={style}
      onMouseEnter={() => onActiveDataList(id)}
      onMouseLeave={() => onActiveDataList(0)}
    >
      <span>{id}</span>
      <span style={{ color: "#aaa" }}>
        Lat: {lat} & Lng: {lng}
      </span>
      <span style={{ textTransform: "capitalize" }}>{description}</span>
      <span className={styles.Coin}>{coins}</span>
      {button}
    </div>
  );
});

export default CurrentSingleTask;
// {/* <button disabled>CONFIRM</button> */}
