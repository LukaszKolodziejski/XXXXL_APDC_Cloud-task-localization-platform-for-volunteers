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
  const [startGettingCoins, setStartGettingCoins] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const { tasks, currentTasks } = useSelector((state) => state.tasks);
  const { accounts } = useSelector((state) => state.account);
  const [creatorName, setCreatorName] = useState("");
  const [completedTasks, setCompletedTasks] = useState(1);
  const [redirectDoneTasks, setRedirectDoneTasks] = useState(false);

  const tasksHandler = () => setCompletedTasks((prev) => prev + 1);

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

  const findCurrentTasks = () => tasks.find((task) => task.id === currentTasks);
  const getCoinsHandler = () => {
    setStartGettingCoins(true);
    changeAccountsStatusHandler(userId, "GETTING_COINS");
  };
  const doneHandler = () => setRedirectDoneTasks(true);

  const changeAccountsStatusHandler = (userId, status) => {
    const user = accounts.find((account) => account.userId === userId);
    if (user.status !== status)
      dispatch(actionCreators.changeAccountsStatus(accounts, user.id, status));
  };

  useEffect(() => {
    if (findCurrentTasks().data.length < completedTasks)
      changeAccountsStatusHandler(userId, "ONLINE");
  }, [completedTasks]);

  if (redirectDoneTasks) return <Redirect to="/" />;
  return (
    <div className={styles.CurrentTasks}>
      <CurrentTasksList
        newTasksList={findCurrentTasks().data}
        onActiveDataList={setActiveDataList}
        startGettingCoins={startGettingCoins}
        completedTasks={completedTasks}
        onTasksHandler={tasksHandler}
      >
        {!startGettingCoins && userId ? (
          <button className={styles.SaveBtn} onClick={() => getCoinsHandler()}>
            Start to get Coins !!!
          </button>
        ) : findCurrentTasks().data.length < completedTasks ? (
          <button className={styles.DoneBtn} onClick={() => doneHandler()}>
            Wait for confirmation !!!
          </button>
        ) : null}
      </CurrentTasksList>
      <CurrentTasksMaps
        tasks={findCurrentTasks()}
        activeDataList={activeDataList}
      />
    </div>
  );
};

export default CurrentTasks;
