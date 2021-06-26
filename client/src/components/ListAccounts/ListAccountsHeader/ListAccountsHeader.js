import React from "react";
import styles from "./ListAccountsHeader.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

const ListAccountsHeader = (props) => {
  const showSection = props.role === "USER";
  return (
    <p className={styles.ListAccountsHeader}>
      <span>User ID</span>
      <span>E-mail</span>
      <span>Profile</span>
      {!showSection && <span>State</span>}
      {!showSection && <span>Role</span>}
      <button className={styles.Logout} onClick={() => props.onLogout()}>
        Logout
      </button>
    </p>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actionCreators.logout()),
});

export default connect(null, mapDispatchToProps)(ListAccountsHeader);
