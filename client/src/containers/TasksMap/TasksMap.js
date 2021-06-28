import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import styles from "./TasksMap.module.css";
import Maps from "../../components/Maps/Maps";
import TasksList from "../../components/TasksList/TasksList";
import Spinner from "../../components/UI/Spinner/Spinner";

// import tasks from "../../components/TasksList/tasks.json";

const TasksMap = (props) => {
  const [activeDataList, setActiveDataList] = useState(0);
  const { tasks, loadingTasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const onAuthCheckState = () => dispatch(actionCreators.authCheckState());
  const onTasksList = () => dispatch(actionCreators.tasksList());
  const onSetCurrentTasks = (currentTasks) =>
    dispatch(actionCreators.setCurrentTasks(currentTasks));

  // TODO: >> Jak ktoś się zaloguje: Offline > Online
  // TODO: >> Jak ktoś się wyloguje: Online > Offline
  // TODO: >> zadanie może wykonać ktoś inny

  // TODO: >> Start do Task: Getting Coins
  // TODO: >> Start do Task: Task have PLAYER

  // TODO: >> End do Task: Owner must confirm
  // TODO: >> End do Task: Online + Coiny + Complited Tasks

  // TODO: >> Start do Task: Task in Progress
  // TODO: >> End do Task: Task in Done / to confirm

  useEffect(() => {
    onTasksList();
    onAuthCheckState();
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
