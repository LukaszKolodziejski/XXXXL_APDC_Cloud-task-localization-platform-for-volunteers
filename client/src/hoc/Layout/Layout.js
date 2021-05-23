import React, { Fragment } from "react";
import "./Layout.css";
import Navigation from "../../components/Navigation/Navigation";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main className="Content">{props.children}</main>
    </Fragment>
  );
};

export default Layout;
