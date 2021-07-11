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

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const changeAccountsAttributes =
  (accounts, id, state, role) => (dispatch) => {
    const newAccounts = convertArrayToObject(accounts, "id");

    const newAccountsData = {
      ...newAccounts,
      [id]: {
        ...newAccounts[id],
        state,
        role,
      },
    };

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

export const changeAccountsStatus = (accounts, id, status) => (dispatch) => {
  const newAccounts = convertArrayToObject(accounts, "id");

  const newAccountsData = {
    ...newAccounts,
    [id]: {
      ...newAccounts[id],
      status,
    },
  };

  axios.put(`/accounts.json`, newAccountsData).then((res) => {
    const accounts = [];
    for (let key in res.data) {
      accounts.push({ ...res.data[key], id: key });
    }
    dispatch({
      type: actionTypes.CHANGE_ACCOUNTS_STATUS,
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

export const transferOfCoins =
  (accounts, creatorId, playerId, coins) => (dispatch) => {
    const newAccounts = convertArrayToObject(accounts, "id");

    const creator = accounts.find((account) => account.userId === creatorId);
    const player = accounts.find((account) => account.userId === playerId);

    const newAccountsData = {
      ...newAccounts,
      [creator.id]: {
        ...newAccounts[creator.id],
        coins: creator.coins - coins,
      },
      [player.id]: {
        ...newAccounts[player.id],
        coins: player.coins + coins,
        tasks: player.tasks + 1,
      },
    };

    axios.put(`/accounts.json`, newAccountsData).then((res) => {
      const accounts = [];
      for (let key in res.data) {
        accounts.push({ ...res.data[key], id: key });
      }
      dispatch({
        type: actionTypes.TRANSFER_OF_COINS,
        accounts,
        loadingAccounts: false,
      });
    });
  };
