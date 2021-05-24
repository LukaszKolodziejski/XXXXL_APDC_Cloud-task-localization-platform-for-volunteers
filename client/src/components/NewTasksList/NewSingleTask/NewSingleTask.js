import React from "react";
import styles from "./styles/NewSingleTask.module.css";
import { TextField } from "@material-ui/core";

const NewSingleTask = React.memo((props) => {
  const { id, location, description, coins } = props;
  const style = styles.NewSingleTask;

  const lat = location.lat().toFixed(3);
  const lng = location.lng().toFixed(3);

  console.log(location.lat());
  console.log(location.lng());
  const inputHandler = (e) => props.onDescription(id, e.target.value);

  return (
    <div className={style}>
      <span>{id}</span>
      <span>
        Lat: {lat} & Lng: {lng}
      </span>
      <TextField
        id="outlined-basic"
        label={`Task ${id}`}
        variant="outlined"
        size="small"
        onChange={inputHandler}
      />
      <span className={styles.Coin}>{coins}</span>
    </div>
  );
});

export default NewSingleTask;
