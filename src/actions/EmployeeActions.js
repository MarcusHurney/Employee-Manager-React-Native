import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as types from './types';

export const employeeUpdate = ({ prop, value }) => {
  // prop references the input field on the form associated with
  // a prop of an employee, for instance "name"
  return {
    type: types.EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: types.EMPLOYEE_CREATE });
        Actions.main();
      });
      // having a type of reset pushes the view back to employeeList
      // but removes the back arrow so that it does not appear as a view that
      // the user "advanced" to, it resets the view stack
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // our datasource of employees will automatically call this .on fat arrow
    // function whenever the data changes, so if we add a new employee
    // it will automatically run
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        // snapshot is not the actual data, it describes the returned data
        // to obtain the data we must call snapshot.val()
        dispatch({ type: types.EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
