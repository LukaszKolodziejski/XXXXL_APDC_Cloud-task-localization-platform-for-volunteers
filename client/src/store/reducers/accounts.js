import * as actionTypes from "../actions/actionTypes";

const initialState = {
  accounts: [],
  loadingAccounts: true,
};

const accounts = (state, action) => ({
  ...state,
  accounts: action.accounts,
  loadingAccounts: action.loadingAccounts,
});

const changeAccountsAttributes = (state, action) => ({
  ...state,
  accounts: action.accounts,
  loadingAccounts: action.loadingAccounts,
});

const deleteAccount = (state, action) => ({
  ...state,
  accounts: action.accounts,
  loadingAccounts: action.loadingAccounts,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACCOUNTS:
      return accounts(state, action);
    case actionTypes.DELETE_ACCOUNTS:
      return deleteAccount(state, action);
    case actionTypes.CHANGE_ACCOUNTS_ATTRIBUTES:
      return changeAccountsAttributes(state, action);
    default:
      return state;
  }
};

export default reducer;
