import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionCreators.logout());

  useEffect(() => {
    onLogout();
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
