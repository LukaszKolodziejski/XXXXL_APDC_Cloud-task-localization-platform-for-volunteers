import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useSelector } from "react-redux";

const Navigation = (props) => {
  const { idToken, userId } = useSelector((state) => state.auth);
  const { accounts } = useSelector((state) => state.account);
  const [backOffice, setBackOffice] = useState(null);

  useEffect(() => {
    const user = accounts.find((account) => account.userId === userId);
    if (user) {
      const { role } = user;
      setBackOffice(
        role === "GBO" || role === "GA" || role === "SU" ? (
          <NavigationItem link="/back-office" text="Back Office" />
        ) : null
      );
    }
  }, [userId, accounts]);

  return (
    <header className={styles.Navigation}>
      <div className={styles.Logo}>
        <NavLink to="/" exact>
          Locked in the House
        </NavLink>
      </div>
      <nav className={styles.DeskopOnly}>
        <ul className={styles.NavigationItems}>
          <NavigationItem link="/map" text="List of Tasks" />
          <NavigationItem link="/ranking" text="Ranking" />
          {idToken ? (
            <>
              <NavigationItem link="/new-task" text="NEW Task" />
              {/* <NavigationItem link="/account" text="My Account" /> */}
              {backOffice}
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
