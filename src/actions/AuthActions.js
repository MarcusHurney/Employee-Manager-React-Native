import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import * as types from './types';

// signup & login FORM handlers ----------------->
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
 // end form handlers ---------------------------------------------->

 // login action creators ----------------->
 export const loginUser = ({ email, password }) => {
   const props = { email, password };
   return (dispatch) => {
     // notifies REDUX store that an ajax request is in progress
     dispatch({ type: types.LOGIN_USER_START });

     axios.post('http://localhost:3000/signin', props)
       .then(user => loginUserSuccess(dispatch, user))
       .catch(() => loginUserFail(dispatch));
   };
 };

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user });
  // this method Actions.main() is derived from the key prop on the Scene tag
  // in Router.js
  Actions.main();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: types.LOGIN_USER_FAIL });
};
// end login ---------------------------------------------->

 // signup action creators ----------------->
export const signupUser = ({ email, password }) => {
  const props = { email, password };
  return (dispatch) => {
    // notifies REDUX store that an ajax request is in progress
    dispatch({ type: types.SIGNUP_USER_START });

    axios.post('http://localhost:3000/signup', props)
      .then(user => signupUserSuccess(dispatch, user))
      .catch(() => {
        signupUserFailed(dispatch);
      });
  };
};

const signupUserSuccess = (dispatch, user) => {
  dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: user });
  // this method Actions.main() is derived from the key prop on the Scene tag
  // in Router.js
  Actions.main();
};

const signupUserFailed = (dispatch) => {
  dispatch({ type: types.SIGNUP_USER_FAIL });
};

// end signup ---------------------------------------------->

// logout action creators ----------------->
const logoutUserSuccess = (dispatch) => {
  dispatch({ type: types.LOGOUT_USER_SUCCESS });
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => logoutUserSuccess(dispatch));
  };
};
// end logout ---------------------------------------------->
