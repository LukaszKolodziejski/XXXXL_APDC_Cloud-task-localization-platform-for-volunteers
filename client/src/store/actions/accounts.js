import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import axios from "../../axios-data";
import axiosApi from "../../axios-api";

export const accounts = (token) => (dispatch) => {
  if (token) {
    axios.get(`/accounts.json?auth=${token}`).then((res) => {
      const accounts = [];
      for (let key in res.data) {
        accounts.push({ ...res.data[key], id: key });
      }
      dispatch({
        type: actionTypes.ACCOUNTS,
        accounts,
        loadingAccounts: false,
      });
    });
  } else {
    dispatch({
      type: actionTypes.ACCOUNTS,
      accounts: [],
      loadingAccounts: true,
    });
  }
};

export const changeAccountsAttributes =
  (accounts, id, state, role) => (dispatch) => {
    const convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };

    const newAccounts = convertArrayToObject(accounts, "id");

    const newAccountsData = {
      ...newAccounts,
      [id]: {
        ...newAccounts[id],
        state,
        role,
      },
    };

    // dispatch({
    //   type: actionTypes.CHANGE_ACCOUNTS_ATTRIBUTES,
    //   accounts,
    //   loadingAccounts: false,
    // });

    axios.put(`/accounts.json`, newAccountsData).then((res) => {
      const accounts = [];
      for (let key in res.data) {
        accounts.push({ ...res.data[key], id: key });
      }
      dispatch({
        type: actionTypes.CHANGE_ACCOUNTS_ATTRIBUTES,
        accounts,
        loadingAccounts: false,
      });
    });
  };

export const deleteAccount = (accounts, id) => (dispatch) => {
  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      // console.log(item);
      if (item.id !== id) {
        return {
          ...obj,
          [item[key]]: item,
        };
      }
    }, initialValue);
  };

  const newAccounts = convertArrayToObject(accounts, "id") || {};

  if (Object.keys(newAccounts).length === 0) {
    dispatch(actions.logout());
  }

  axios.put(`/accounts.json`, newAccounts).then((res) => {
    const accounts = [];
    for (let key in res.data) {
      accounts.push({ ...res.data[key], id: key });
    }
    dispatch({
      type: actionTypes.DELETE_ACCOUNTS,
      accounts,
      loadingAccounts: false,
    });
  });
};
