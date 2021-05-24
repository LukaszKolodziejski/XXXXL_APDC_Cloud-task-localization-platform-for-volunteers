import React, { useState } from "react";
import styles from "./NewTasksMap.module.css";
import CreateMapTasks from "../../components/Maps/CreateMapTasks";
import NewTasksList from "../../components/NewTasksList/NewTasksList";

const NewTasksMap = (props) => {
  const [newTasksList, setNewTasksList] = useState([]);
  const [newTask, setNewTask] = useState({
    id: 0,
    location: {},
    description: "",
    coins: 1,
  });

  const descriptionHandler = (id, description) => {
    const updateList = newTasksList.map((task) => ({
      id: task.id,
      location: task.location,
      description: task.id === id ? description : task.description,
      coins: task.coins,
    }));
    setNewTasksList(updateList);
  };

  const locationHandler = (markerId, latLng) => {
    // console.log(latLng.lat());
    // console.log(latLng.lng());
    setNewTasksList((prevStates) => [
      ...prevStates,
      {
        id: markerId,
        location: latLng,
        description: "",
        coins: 1,
      },
    ]);
  };

  return (
    <div className={styles.NewTasksMap}>
      <NewTasksList
        newTasksList={newTasksList}
        descriptionHandler={descriptionHandler}
      />
      <CreateMapTasks onClickLocation={locationHandler} />
    </div>
  );
};

export default NewTasksMap;
