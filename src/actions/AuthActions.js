import { Actions } from 'react-native-router-flux';
import axios from 'axios';
// import Keychain from 'react-native-keychain';
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
       .catch((err) => {
         console.log(err.stack);
         loginUserFail(dispatch);
       });
   };
 };
// The following script contains REACT-NATIVE-KEYCHAIN
 // export const loginUser = ({ email, password }) => {
 //   const props = { email, password };
 //   return (dispatch) => {
 //     // notifies REDUX store that an ajax request is in progress
 //     dispatch({ type: types.LOGIN_USER_START });
 //
 //     axios.post('http://localhost:3000/signin', props)
 //       .then(response => {
 //         const { user_id, token } = response.data;
 //         console.log(user_id);
 //         Keychain.setGenericPassword(user_id, token)
 //          .then(() => {
 //            loginUserSuccess(dispatch, user_id);
 //          })
 //          .catch((err) => {
 //            console.log(err);
 //            loginUserFail(dispatch);
 //          });
 //       })
 //       .catch((error) => {
 //         console.log(error);
 //         loginUserFail(dispatch);
 //       });
 //   };
 // };

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
      .catch((error) => {
        console.log(error);
        signupUserFailed(dispatch);
      });
  };
};

// The following signup script contains REACT-NATIVE-KEYCHAIN
// export const signupUser = ({ email, password }) => {
//   const props = { email, password };
//   return (dispatch) => {
//     // notifies REDUX store that an ajax request is in progress
//     dispatch({ type: types.SIGNUP_USER_START });
//
//     axios.post('http://localhost:3000/signup', props)
//     .then(response => {
//       const { user_id, token } = response.data;
//       Keychain.setGenericPassword(user_id, token)
//        .then(() => {
//          signupUserSuccess(dispatch, user_id);
//        })
//        .catch((err) => {
//          console.log(err);
//          signupUserFailed(dispatch);
//        });
//     })
//     .catch((error) => {
//       console.log(error);
//       loginUserFail(dispatch);
//     });
//   };
// };

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
export const logoutUser = () => {
  return (dispatch) => {
    // clear token from storage
    logoutUserSuccess(dispatch);
  };
};

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: types.LOGOUT_USER_SUCCESS });
};


// end logout ---------------------------------------------->
