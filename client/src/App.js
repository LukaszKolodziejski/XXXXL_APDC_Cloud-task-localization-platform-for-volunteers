import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import TasksMap from "./containers/TasksMap/TasksMap";
import Ranking from "./containers/Ranking/Ranking";
import NewTasksMap from "./containers/NewTasksMap/NewTasksMap";
import CurrentTasks from "./containers/CurrentTasks/CurrentTasks";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Logout/Logout";
import User from "./containers/User/User";
import BackOffice from "./containers/BackOffice/BackOffice";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={TasksMap} />
        <Route path="/map" exact component={TasksMap} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/new-task" component={NewTasksMap} />
        <Route path="/login" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/user" component={User} />
        <Route path="/current-tasks" component={CurrentTasks} />
        <Route path="/back-office" component={BackOffice} />
        {/* <Route path="/account" component={Accounts} /> */}
      </Layout>
    </Router>
  );
};

export default App;
