import React, { useState } from "react";
import styles from "./styles/NewSingleTask.module.css";
import { TextField } from "@material-ui/core";

const NewSingleTask = React.memo((props) => {
  const { id, location, description, coins } = props;
  const [inputValue, setInputValue] = useState("");
  const style = styles.NewSingleTask;

  const lat = location.lat().toFixed(3);
  const lng = location.lng().toFixed(3);

  // console.log(location.lat());
  // console.log(location.lng());
  const inputHandler = (e) => {
    setInputValue(e.target.value);
    props.onDescription(id, e.target.value);
  };

  const commonTasks = [
    "go with dog",
    "throw out rubbish",
    "clean the pavement",
    "take the documents",
    "order pizza",
    "buy purchases",
    "buy cat food",
  ];

  const fillInputHandler = () => {
    const randomTask =
      commonTasks[Math.floor(Math.random() * commonTasks.length)];
    setInputValue(randomTask);
    props.onDescription(id, randomTask);
  };

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
        value={inputValue}
        onChange={inputHandler}
      />
      <span className={styles.Coin} onClick={fillInputHandler}>
        {coins}
      </span>
    </div>
  );
});

export default NewSingleTask;
