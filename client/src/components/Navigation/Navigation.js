import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = (props) => {
  return (
    <header className={styles.Navigation}>
      <div className={styles.Logo}>
        <NavLink to="/" exact>
          Locked in the House
        </NavLink>
      </div>
      <nav className={styles.DeskopOnly}>
        <ul className={styles.NavigationItems}>
          <NavigationItem link="/login" exact>
            Login
          </NavigationItem>
          <NavigationItem link="/ranking">Ranking</NavigationItem>
          <NavigationItem link="/new-task">NEW Task</NavigationItem>
          <NavigationItem link="/account">My Account</NavigationItem>
        </ul>
        {/* <NavigationItems isAuth={props.isAuth} /> */}
      </nav>
    </header>
  );
};

export default Navigation;
