import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import styles from "./TasksMap.module.css";
import Maps from "../../components/Maps/Maps";
import TasksList from "../../components/TasksList/TasksList";
import Spinner from "../../components/UI/Spinner/Spinner";

const TasksMap = (props) => {
  const [activeDataList, setActiveDataList] = useState(0);
  const { tasks, loadingTasks } = useSelector((state) => state.tasks);
  const { userId } = useSelector((state) => state.auth);
  const { accounts } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const onAuthCheckState = () => dispatch(actionCreators.authCheckState());
  const onTasksList = () => dispatch(actionCreators.tasksList());
  const onSetCurrentTasks = (currentTasks) =>
    dispatch(actionCreators.setCurrentTasks(currentTasks));

  const checkStatusHandler = (userId) => {
    const user = accounts.find((account) => account.userId === userId);
    if (user) {
      user.status === "GETTING_COINS"
        ? changeAccountsStatusHandler(userId, "GETTING_COINS")
        : changeAccountsStatusHandler(userId, "ONLINE");
    }
  };

  const changeAccountsStatusHandler = (userId, status) => {
    const user = accounts.find((account) => account.userId === userId);
    if (user) {
      if (user.status !== status)
        dispatch(
          actionCreators.changeAccountsStatus(accounts, user.id, status)
        );
    }
  };

  // TODO: >> Start do Task: Task have PLAYER
  // TODO: >> Start do Task:  {PLAYER} is getting coins...

  // TODO: >> End do Task: Owner must confirm
  // TODO: >> End do Task: Online + Coiny + Complited Tasks

  // TODO: >> zadanie może wykonać ktoś inny

  // TODO: TODO: BACKEND !!!!!!!

  // TODO: >> Jak ktoś się zaloguje: Offline > Online
  // TODO: >> Jak ktoś się wyloguje: Online > Offline

  useEffect(() => {
    const load = async () => {
      onTasksList();
      await onAuthCheckState();
      await checkStatusHandler(userId);
    };
    load();
  }, []);

  // const tasksHandler = (currentTasks) => onSetCurrentTasks(currentTasks);

  if (loadingTasks || tasks.length === 0) return <Spinner />;
  return (
    <div className={styles.TasksMap}>
      <TasksList
        tasks={tasks}
        onTasksHandler={onSetCurrentTasks}
        onActiveDataList={setActiveDataList}
      />
      <Maps tasks={tasks} activeDataList={activeDataList} />
    </div>
  );
};

export default TasksMap;
