import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import styles from "./NewTasksMap.module.css";
import CreateMapTasks from "../../components/Maps/CreateMapTasks";
import NewTasksList from "../../components/NewTasksList/NewTasksList";

const NewTasksMap = (props) => {
  const [newTasksList, setNewTasksList] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const { accounts } = useSelector((state) => state.account);
  const [creatorName, setCreatorName] = useState("");

  const dispatch = useDispatch();

  const onSaveTasksList = (tasksList) =>
    dispatch(actionCreators.saveTasksList(tasksList));

  const onAuthCheckState = () => dispatch(actionCreators.authCheckState());

  useEffect(() => {
    onAuthCheckState();
  }, []);

  useEffect(() => {
    if (accounts.length) {
      const name = accounts.find(
        (account) => account.userId === userId
      ).publicUserId;
      setCreatorName(name);
    }
  }, [accounts]);

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

  const saveTasksHandler = async () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const savedTasksList = {
      creatorId: userId,
      name: creatorName,
      status: "AVAILABLE",
      coins: newTasksList.length,
      data: newTasksList,
      expiryDate: date,
      playerName: "",
      playerId: "",
      completedTasks: 0,
    };
    onSaveTasksList(savedTasksList);
    setIsSaved(true);
  };

  if (isSaved) return <Redirect to="/" />;

  return (
    <div className={styles.NewTasksMap}>
      <NewTasksList
        newTasksList={newTasksList}
        descriptionHandler={descriptionHandler}
      >
        <button className={styles.SaveBtn} onClick={saveTasksHandler}>
          Save new tasks
        </button>
      </NewTasksList>
      <CreateMapTasks onClickLocation={locationHandler} />
    </div>
  );
};

export default NewTasksMap;
