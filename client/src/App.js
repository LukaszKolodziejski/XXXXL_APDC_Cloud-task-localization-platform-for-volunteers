import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import TasksMap from "./containers/TasksMap/TasksMap";
import Ranking from "./containers/Ranking/Ranking";
import NewTasksMap from "./containers/NewTasksMap/NewTasksMap";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={TasksMap} />
        <Route path="/ranking" exact component={Ranking} />
        <Route path="/new-task" exact component={NewTasksMap} />
      </Layout>
    </Router>
  );
};

export default App;
