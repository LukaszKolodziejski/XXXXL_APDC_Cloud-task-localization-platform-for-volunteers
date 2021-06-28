import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import styles from "./CurrentTasks.module.css";
import CurrentTasksMaps from "../../components/Maps/CurrentTasksMaps";
import CurrentTasksList from "../../components/CurrentTasksList/CurrentTasksList";

const CurrentTasks = (props) => {
  const [activeDataList, setActiveDataList] = useState(0);
  const [newTasksList, setNewTasksList] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const { tasks, currentTasks } = useSelector((state) => state.tasks);
  const { accounts } = useSelector((state) => state.account);
  const [creatorName, setCreatorName] = useState("");

  const dispatch = useDispatch();

  const onSaveTasksList = (tasksList) =>
    dispatch(actionCreators.saveTasksList(tasksList));

  const onAuthCheckState = () => dispatch(actionCreators.authCheckState());
  const onTasksList = () => dispatch(actionCreators.tasksList());

  useEffect(() => {
    onAuthCheckState();
    onTasksList();
  }, []);

  useEffect(() => {
    if (accounts.length) {
      const name = accounts.find(
        (account) => account.userId === userId
      ).publicUserId;
      setCreatorName(name);
    }
  }, [accounts]);

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

  const findCurrentTasks = () => tasks.find((task) => task.id === currentTasks);

  return (
    <div className={styles.CurrentTasks}>
      <CurrentTasksList
        newTasksList={findCurrentTasks().data}
        onActiveDataList={setActiveDataList}
      >
        {/* <button className={styles.SaveBtn} onClick={saveTasksHandler}> */}
        <button className={styles.SaveBtn}>Start to get Coins !!!</button>
      </CurrentTasksList>
      <CurrentTasksMaps
        tasks={findCurrentTasks()}
        activeDataList={activeDataList}
      />
    </div>
  );
};

export default CurrentTasks;
