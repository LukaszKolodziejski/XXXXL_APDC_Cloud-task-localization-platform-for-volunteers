import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import TasksMap from "./containers/TasksMap/TasksMap";
// import Auth from "./containers/Auth/Auth";
// import User from "./containers/User/User";
// import Accounts from "./containers/Accounts/Accounts";
// import Logout from "./containers/Auth/Logout/Logout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={TasksMap} />
        {/* <Route path="/user" component={User} /> */}
        {/* <Route path="/accounts" component={Accounts} /> */}
      </Layout>
    </Router>
  );
};

export default App;
