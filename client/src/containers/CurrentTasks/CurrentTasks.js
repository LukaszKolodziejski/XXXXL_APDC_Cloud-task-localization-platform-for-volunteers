import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import styles from "./CurrentTasks.module.css";
import CurrentTasksMaps from "../../components/Maps/CurrentTasksMaps";
import CurrentTasksList from "../../components/CurrentTasksList/CurrentTasksList";
import Progress from "../../components/Status/Progress/Progress";

const CurrentTasks = (props) => {
  const [activeDataList, setActiveDataList] = useState(0);
  const [startGettingCoins, setStartGettingCoins] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const { accounts } = useSelector((state) => state.account);
  const { tasks, currentTasks } = useSelector((state) => state.tasks);

  const findCurrentTasks = () => tasks.find((task) => task.id === currentTasks);
  const [completedTasks, setCompletedTasks] = useState(
    findCurrentTasks() ? findCurrentTasks().completedTasks : 0
  );
  const [redirectDoneTasks, setRedirectDoneTasks] = useState(false);
  const [btnMode, setBtnMode] = useState("START");
  const [player, setPlayer] = useState("");

  const tasksHandler = () => setCompletedTasks((prev) => prev + 1);

  const dispatch = useDispatch();
  const onAuthCheckState = () => dispatch(actionCreators.authCheckState());
  const onTasksList = () => dispatch(actionCreators.tasksList());
  const onChangeAccountsStatus = (accounts, id, status) =>
    dispatch(actionCreators.changeAccountsStatus(accounts, id, status));
  const onTransferOfCoins = (accounts, creatorId, playerId, coins) =>
    dispatch(
      actionCreators.transferOfCoins(accounts, creatorId, playerId, coins)
    );

  const onChangeTaskData = (
    tasks,
    id,
    status,
    completedTasks,
    playerId,
    playerName
  ) =>
    dispatch(
      actionCreators.changeTaskData(
        tasks,
        id,
        status,
        completedTasks,
        playerId,
        playerName
      )
    );

  useEffect(() => {
    onAuthCheckState();
    onTasksList();
  }, []);

  const getPublicUserName = () => {
    if (accounts.length) {
      const name = accounts.find(
        (account) => account.userId === userId
      ).publicUserId;
      return name;
    }
  };

  useEffect(() => {
    const publicUserName = getPublicUserName();
    if (completedTasks) {
      if (completedTasks < findCurrentTasks().coins) {
        changeTaskDataHandler(
          currentTasks,
          "INPROGRESS",
          completedTasks,
          publicUserName
        );
      } else if (completedTasks === findCurrentTasks().coins) {
        changeTaskDataHandler(
          currentTasks,
          "DONE",
          completedTasks,
          publicUserName
        );
      }
    }
  }, [completedTasks]);

  const getCoinsHandler = () => {
    const publicUserName = getPublicUserName();
    setStartGettingCoins(true);
    changeAccountsStatusHandler(userId, "GETTING_COINS");
    changeTaskDataHandler(
      currentTasks,
      "INPROGRESS",
      completedTasks,
      publicUserName
    );
  };

  const doneHandler = () => {
    const publicUserName = getPublicUserName();
    setRedirectDoneTasks(true);
    setCompletedTasks(findCurrentTasks().coins);
    changeTaskDataHandler(currentTasks, "DONE", completedTasks, publicUserName);
  };

  const confirmHandler = () => {
    setRedirectDoneTasks(true);
    if (tasks) {
      const task = tasks.find((task) => task.id === currentTasks);
      onChangeTaskData(tasks, task.id, "CONFIRMED", completedTasks);
      const { creatorId, playerId, coins } = findCurrentTasks();
      onTransferOfCoins(accounts, creatorId, playerId, coins);
    }
  };

  const changeAccountsStatusHandler = (userId, status) => {
    const user = accounts.find((account) => account.userId === userId);
    if (user && user.status !== status)
      onChangeAccountsStatus(accounts, user.id, status);
  };

  const changeTaskDataHandler = (
    currentTasks,
    status,
    completedTasks,
    playerName
  ) => {
    if (tasks) {
      const task = tasks.find((task) => task.id === currentTasks);
      if (task.playerId === "") {
        onChangeTaskData(
          tasks,
          task.id,
          status,
          completedTasks,
          userId,
          playerName
        );
      } else if (task.playerId === userId) {
        onChangeTaskData(tasks, task.id, status, completedTasks);
      }
    }
  };

  useEffect(() => {
    const findTasks = findCurrentTasks();
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
      }
      if (userId === null || findTasks.creatorId === userId) setBtnMode("AUTH");

      if (tasks) {
        const { creatorId, playerName } = findCurrentTasks();
        if (userId === creatorId) {
          setBtnMode("CREATOR_INPROGRESS");
          setPlayer(playerName);
        }
        if (findTasks.creatorId === userId && findTasks.status === "DONE")
          setBtnMode("CONFIRM");
      }
    }
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
        player={player}
        userId={userId}
      >
        {btnMode === "START" ? (
          <button className={styles.SaveBtn} onClick={getCoinsHandler}>
            Start to get Coins !!!
          </button>
        ) : btnMode === "CREATOR_INPROGRESS" ? (
          <span className={styles.Progress}>
            {player ? <Progress status={`${player} is getting coins`} /> : null}
          </span>
        ) : btnMode === "DONE" ? (
          <button className={styles.DoneBtn} onClick={doneHandler}>
            Finish work & Wait for confirmation !!!
          </button>
        ) : btnMode === "INPROGRESS" ? null : btnMode ===
          "AUTH" ? null : btnMode === "CONFIRM" ? (
          <button className={styles.ConfirmBtn} onClick={confirmHandler}>
            {`Confirm that ${player} has completed the tasks :)`}
          </button>
        ) : null}
      </CurrentTasksList>
      <CurrentTasksMaps
        tasks={findCurrentTasks()}
        activeDataList={activeDataList}
        completedTasks={completedTasks}
      />
    </div>
  );
};

export default CurrentTasks;
