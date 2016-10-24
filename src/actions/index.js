import firebase from 'firebase';
import * as types from './types';

export const emailChanged = (text) => {
  return {
    type: types.EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: types.PASSWORD_CHANGED,
    payload: text
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: types.LOGIN_USER_FAIL });
};

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: types.LOGOUT_USER_SUCCESS });
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    // notifies REDUX store that an ajax request is in progress
    dispatch({ type: types.LOGIN_USER_START });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => logoutUserSuccess(dispatch));
  };
};
