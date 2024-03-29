import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import authReducer from "./store/reducers/auth";
import accountReducer from "./store/reducers/accounts";
import tasksReducer from "./store/reducers/tasks";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = {
  account: accountReducer,
  auth: authReducer,
  tasks: tasksReducer,
};

const store = createStore(
  combineReducers(rootReducer),
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
