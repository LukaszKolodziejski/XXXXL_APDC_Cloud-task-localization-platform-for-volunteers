import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import Navigation from "../../components/Navigation/Navigation";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
