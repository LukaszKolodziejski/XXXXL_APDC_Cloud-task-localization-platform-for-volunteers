import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";

export const tasksList = () => (dispatch) => {
  dispatch({
    type: actionTypes.TASKS_LIST_START,
    loadingTasks: true,
  });
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

export const saveTasksList = (tasks) => async (dispatch) => {
  //   axios.put(`/tasks.json`, tasks).then((res) => {
  dispatch({
    type: actionTypes.TASKS_LIST_START,
    loadingTasks: true,
  });

  axios.post(`/tasks.json`, tasks).then((res) => {
    dispatch({
      type: actionTypes.SAVE_TASKS_LIST,
      currentTasks: res.data,
      loadingTasks: false,
    });
    dispatch(tasksList());
  });
};
