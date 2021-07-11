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

  useEffect(() => {
    const load = async () => {
      onTasksList();
      await onAuthCheckState();
      await checkStatusHandler(userId);
    };
    load();
  }, []);

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
