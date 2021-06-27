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
  // TODO: przekierowanie na Comp. pokazujący to zadanie
  // TODO: zmiana stanów zadania, jak ktoś zacznie
  // TODO: >> zadanie może wykonać ktoś inny i odznaczać

  useEffect(() => {
    onTasksList();
    onAuthCheckState();
  }, []);

  if (loadingTasks || tasks.length === 0) return <Spinner />;
  console.log(tasks);
  return (
    <div className={styles.TasksMap}>
      <TasksList tasks={tasks} onActiveDataList={setActiveDataList} />
      <Maps tasks={tasks} activeDataList={activeDataList} />
    </div>
  );
};

export default TasksMap;
