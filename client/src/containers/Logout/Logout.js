import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { accounts } = useSelector((state) => state.account);
  const onLogout = () => dispatch(actionCreators.logout());

  const changeAccountsStatusHandler = (userId, status) => {
    const user = accounts.find((account) => account.userId === userId);
    if (user.status !== status)
      dispatch(actionCreators.changeAccountsStatus(accounts, user.id, status));
  };

  useEffect(() => {
    changeAccountsStatusHandler(userId, "OFFLINE");
    onLogout();
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
