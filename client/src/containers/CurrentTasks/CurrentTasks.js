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
  const [completedTasks, setCompletedTasks] = useState(0);
  const [redirectDoneTasks, setRedirectDoneTasks] = useState(false);
  const [btnMode, setBtnMode] = useState("START");

  const tasksHandler = () => setCompletedTasks((prev) => prev + 1);

  const dispatch = useDispatch();
  const onSaveTasksList = (tasksList) =>
    dispatch(actionCreators.saveTasksList(tasksList));

  const onAuthCheckState = () => dispatch(actionCreators.authCheckState());
  const onTasksList = () => dispatch(actionCreators.tasksList());
  const onChangeAccountsStatus = (accounts, id, status) =>
    dispatch(actionCreators.changeAccountsStatus(accounts, id, status));

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
    changeTaskStatusHandler(currentTasks, "INPROGRESS");
  };

  const doneHandler = () => {
    setRedirectDoneTasks(true);
    changeTaskStatusHandler(currentTasks, "DONE");
  };

  const changeAccountsStatusHandler = (userId, status) => {
    const user = accounts.find((account) => account.userId === userId);
    if (user && user.status !== status)
      onChangeAccountsStatus(accounts, user.id, status);
  };

  const changeTaskStatusHandler = (currentTasks, status) => {
    const task = tasks.find((task) => task.id === currentTasks);
    if (task.status !== status)
      dispatch(actionCreators.changeTaskStatus(tasks, task.id, status));
  };

  useEffect(() => {
    const findTasks = findCurrentTasks();
    // if (findTasks)
    if (findTasks && findTasks.data.length <= completedTasks)
      changeAccountsStatusHandler(userId, "ONLINE");
  }, [completedTasks]);

  useEffect(() => {
    const findTasks = findCurrentTasks();
    if (findTasks) {
      const tasksLength = findTasks.data.length;
      if (!startGettingCoins && userId) setBtnMode("START");
      if (findTasks.status === "INPROGRESS") {
        setBtnMode("INPROGRESS");
        setStartGettingCoins(true);
      }
      if (tasksLength <= completedTasks || findTasks.status === "DONE") {
        setBtnMode("DONE");
        changeTaskStatusHandler(currentTasks, "DONE");
      }
      if (userId === null) setBtnMode("AUTH");
    }
    //TODO: do firebase zliczać completed tasts
  }, [tasks, completedTasks]);

  if (redirectDoneTasks || !findCurrentTasks()) return <Redirect to="/" />;
  return (
    <div className={styles.CurrentTasks}>
      <CurrentTasksList
        newTasksList={findCurrentTasks().data}
        onActiveDataList={setActiveDataList}
        startGettingCoins={startGettingCoins}
        completedTasks={completedTasks}
        onTasksHandler={tasksHandler}
      >
        {/* {button} */}
        {btnMode === "START" ? (
          <button className={styles.SaveBtn} onClick={() => getCoinsHandler()}>
            Start to get Coins !!!
          </button>
        ) : btnMode === "DONE" ? (
          <button className={styles.DoneBtn} onClick={() => doneHandler()}>
            Wait for confirmation !!!
          </button>
        ) : btnMode === "INPROGRESS" ? null : btnMode === "AUTH" ? null : null}
      </CurrentTasksList>
      <CurrentTasksMaps
        tasks={findCurrentTasks()}
        activeDataList={activeDataList}
      />
    </div>
  );
};

export default CurrentTasks;
