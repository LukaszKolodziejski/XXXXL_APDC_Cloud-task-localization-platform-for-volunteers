import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import axios from "../../axios-data";

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  dispatch(actions.accounts(null));
  dispatch({ type: actionTypes.AUTH_LOGOUT });
};

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("expirationDate");
//   localStorage.removeItem("userId");
//   return { type: actionTypes.AUTH_LOGOUT };
// };

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });
export const authSuccess = (idToken, userId, email, publicUserId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
  email,
  publicUserId,
});

const API_KEY = "AIzaSyD77f9kLXIJoWYeOlgrkH7s9QXf9r9JxdE";
const REST_API = "https://identitytoolkit.googleapis.com/v1/accounts:";
const SIGN_UP = `${REST_API}signUp?key=${API_KEY}`;
const SIGN_IN = `${REST_API}signInWithPassword?key=${API_KEY}`;

/* >>> Redux-Thunk <<< */
export const auth = (email, password, isSignup, publicUserId) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let URL;
  isSignup ? (URL = SIGN_UP) : (URL = SIGN_IN);

  axios
    .post(URL, authData)
    .then((res) => {
      const { idToken, localId, expiresIn } = res.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem("token", idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", localId);
      dispatch(authSuccess(idToken, localId, email, publicUserId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((err) => dispatch(authFail(err.response.data.error)));
};

/* >>> Redux-Thunk <<< */
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const expirationDateInMiliseconds =
    (expirationDate.getTime() - new Date().getTime()) / 1000;

  if (!token) {
    dispatch(logout());
    dispatch(actions.accounts(null));
  } else {
    if (expirationDate > new Date()) {
      dispatch(authStart());
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(expirationDateInMiliseconds));
      dispatch(actions.accounts(token));
    } else {
      dispatch(logout());
      dispatch(actions.accounts(null));
    }
  }
};
