import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasks: [],
  currentTasks: {},
  loadingTasks: true,
};

const tasksListStart = (state, action) => ({
  ...state,
  loadingTasks: action.loadingTasks,
});

const tasksList = (state, action) => ({
  ...state,
  tasks: action.tasks,
  loadingTasks: action.loadingTasks,
});

const saveTasksList = (state, action) => ({
  ...state,
  currentTasks: action.currentTasks,
  loadingTasks: action.loadingTasks,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TASKS_LIST:
      return tasksList(state, action);
    case actionTypes.TASKS_LIST_START:
      return tasksListStart(state, action);
    case actionTypes.SAVE_TASKS_LIST:
      return saveTasksList(state, action);
    default:
      return state;
  }
};

export default reducer;
