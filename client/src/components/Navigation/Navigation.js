import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useSelector } from "react-redux";

const Navigation = (props) => {
  const { idToken } = useSelector((state) => state.auth);

  return (
    <header className={styles.Navigation}>
      <div className={styles.Logo}>
        <NavLink to="/" exact>
          Locked in the House
        </NavLink>
      </div>
      <nav className={styles.DeskopOnly}>
        <ul className={styles.NavigationItems}>
          <NavigationItem link="/ranking" text="Ranking" />
          {idToken ? (
            <>
              <NavigationItem link="/new-task" text="NEW Task" />
              <NavigationItem link="/account" text="My Account" />
            </>
          ) : null}
          {!idToken ? (
            <NavigationItem link="/login" text="Login" />
          ) : (
            <NavigationItem link="/logout" text="Logout" />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
