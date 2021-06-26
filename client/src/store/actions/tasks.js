import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";

export const tasksList = () => (dispatch) => {
  axios.get(`/tasks.json`).then((res) => {
    const tasks = [];
    for (let key in res.data) {
      tasks.push({ ...res.data[key], id: key });
    }
    dispatch({
      type: actionTypes.TASKS_LIST,
      tasks,
      loadingTasks: false,
    });
  });
};

export const saveTasksList = (tasks) => (dispatch) => {
  //   axios.put(`/tasks.json`, tasks).then((res) => {
  axios.post(`/tasks.json`, tasks).then((res) => {
    const newTasks = [];
    for (let key in res.data) {
      newTasks.push({ ...res.data[key], id: key });
    }
    console.log("redux savedTasksList");
    console.log(newTasks);
    dispatch({
      type: actionTypes.SAVE_TASKS_LIST,
      tasks: newTasks,
      loadingTasks: false,
    });
  });
};
