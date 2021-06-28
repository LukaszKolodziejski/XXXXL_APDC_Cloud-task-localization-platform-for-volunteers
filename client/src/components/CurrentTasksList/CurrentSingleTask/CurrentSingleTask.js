import React, { useState } from "react";
import styles from "./styles/CurrentSingleTask.module.css";

const CurrentSingleTask = React.memo((props) => {
  const { id, location, description, coins, onActiveDataList } = props;
  const style = styles.CurrentSingleTask;

  const lat = location.lat.toFixed(3);
  const lng = location.lng.toFixed(3);

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
      <button>CONFIRM</button>
    </div>
  );
});

export default CurrentSingleTask;